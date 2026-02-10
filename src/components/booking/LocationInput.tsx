import { useState, useRef, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Loader2 } from "lucide-react";
import { hyderabadLocations, type HydLocation } from "@/data/hyderabadLocations";

interface LocationResult {
  display_name: string;
  lat: string;
  lon: string;
}

interface LocationInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string, lat: number, lon: number) => void;
  icon?: "pickup" | "dropoff";
}

const LocationInput = ({ label, placeholder, value, onChange, icon = "pickup" }: LocationInputProps) => {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<LocationResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter local Hyderabad locations
  const localMatches = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return hyderabadLocations
      .filter(l => l.name.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query]);

  const searchLocations = async (q: string) => {
    if (q.length < 3) {
      setResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q + " Hyderabad")}&limit=5&countrycodes=in`
      );
      const data = await res.json();
      setResults(data);
      setShowDropdown(true);
    } catch {
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (val: string) => {
    setQuery(val);
    setShowSuggestions(val.length >= 2);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchLocations(val), 500);
  };

  const handleSelect = (result: LocationResult) => {
    const shortName = result.display_name.split(",").slice(0, 3).join(",");
    setQuery(shortName);
    setShowDropdown(false);
    setShowSuggestions(false);
    onChange(shortName, parseFloat(result.lat), parseFloat(result.lon));
  };

  const handleLocalSelect = (loc: HydLocation) => {
    setQuery(loc.name);
    setShowDropdown(false);
    setShowSuggestions(false);
    onChange(loc.name, loc.lat, loc.lon);
  };

  const handleFocus = () => {
    if (query.length >= 2) setShowSuggestions(true);
  };

  const showLocal = showSuggestions && localMatches.length > 0;
  const showRemote = showDropdown && results.length > 0;

  return (
    <div ref={wrapperRef} className="relative">
      <label className="text-sm font-medium text-foreground mb-1.5 block">{label}</label>
      <div className="relative">
        <MapPin
          className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
            icon === "pickup" ? "text-safe" : "text-primary"
          }`}
        />
        <Input
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="pl-10 pr-10 bg-muted/50 border-border"
        />
        {isSearching ? (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        )}
      </div>

      {(showLocal || showRemote) && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-card shadow-lg overflow-hidden max-h-64 overflow-y-auto">
          {showLocal && (
            <>
              <div className="px-3 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider bg-muted/50">
                Hyderabad Locations
              </div>
              {localMatches.map((loc, i) => (
                <button
                  key={`local-${i}`}
                  onClick={() => handleLocalSelect(loc)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted/60 transition-colors border-b border-border last:border-0 text-foreground flex items-center justify-between"
                >
                  <span className="line-clamp-1">{loc.name}</span>
                  <span className="text-[10px] text-muted-foreground ml-2 flex-shrink-0">{loc.category}</span>
                </button>
              ))}
            </>
          )}
          {showRemote && (
            <>
              <div className="px-3 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider bg-muted/50">
                Search Results
              </div>
              {results.map((r, i) => (
                <button
                  key={`remote-${i}`}
                  onClick={() => handleSelect(r)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted/60 transition-colors border-b border-border last:border-0 text-foreground"
                >
                  <span className="line-clamp-2">{r.display_name}</span>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
