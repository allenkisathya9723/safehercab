import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface TrackingMapProps {
  pickup: [number, number];
  dropoff: [number, number];
  driverPosition: [number, number];
  progress: number; // 0-1
}

const TrackingMap = ({ pickup, dropoff, driverPosition, progress }: TrackingMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<L.LayerGroup | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fittedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    mapRef.current = L.map(containerRef.current, { zoomControl: false }).setView(pickup, 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://openstreetmap.org">OSM</a>',
    }).addTo(mapRef.current);
    L.control.zoom({ position: "bottomright" }).addTo(mapRef.current);
    layersRef.current = L.layerGroup().addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !layersRef.current) return;
    layersRef.current.clearLayers();

    // Route line
    L.polyline([pickup, dropoff], {
      color: "hsl(340, 82%, 52%)",
      weight: 4,
      opacity: 0.3,
    }).addTo(layersRef.current);

    // Traveled portion
    L.polyline([pickup, driverPosition], {
      color: "hsl(150, 60%, 40%)",
      weight: 5,
      opacity: 0.9,
    }).addTo(layersRef.current);

    // Pickup marker
    const pickupIcon = L.divIcon({
      html: '<div style="background:#22c55e;width:12px;height:12px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)"></div>',
      iconSize: [12, 12], iconAnchor: [6, 6], className: "",
    });
    L.marker(pickup, { icon: pickupIcon }).addTo(layersRef.current);

    // Dropoff marker
    const dropoffIcon = L.divIcon({
      html: '<div style="background:#e11d48;width:12px;height:12px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)"></div>',
      iconSize: [12, 12], iconAnchor: [6, 6], className: "",
    });
    L.marker(dropoff, { icon: dropoffIcon }).addTo(layersRef.current);

    // Driver marker
    const driverIcon = L.divIcon({
      html: `<div style="background:hsl(340,82%,52%);width:18px;height:18px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
      </div>`,
      iconSize: [18, 18], iconAnchor: [9, 9], className: "",
    });
    L.marker(driverPosition, { icon: driverIcon }).addTo(layersRef.current);

    // Fit bounds once
    if (!fittedRef.current) {
      mapRef.current.fitBounds(L.latLngBounds(pickup, dropoff).pad(0.3));
      fittedRef.current = true;
    }
  }, [pickup, dropoff, driverPosition, progress]);

  return (
    <div ref={containerRef} className="w-full h-full" style={{ minHeight: 300 }} />
  );
};

export default TrackingMap;
