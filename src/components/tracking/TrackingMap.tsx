import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchRoute } from "@/lib/routing";

interface TrackingMapProps {
  pickup: [number, number];
  dropoff: [number, number];
  driverPosition: [number, number];
  progress: number;
}

const TILE_URL = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
const TILE_ATTR = '&copy; <a href="https://carto.com">CARTO</a> &copy; <a href="https://openstreetmap.org">OSM</a>';

const TrackingMap = ({ pickup, dropoff, driverPosition, progress }: TrackingMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<L.LayerGroup | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fittedRef = useRef(false);
  const routeCoordsRef = useRef<[number, number][]>([]);

  // Fetch route once
  useEffect(() => {
    fetchRoute(pickup, dropoff).then((coords) => {
      routeCoordsRef.current = coords;
    });
  }, [pickup, dropoff]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    mapRef.current = L.map(containerRef.current, { zoomControl: false }).setView(pickup, 13);
    L.tileLayer(TILE_URL, { attribution: TILE_ATTR, maxZoom: 19 }).addTo(mapRef.current);
    L.control.zoom({ position: "bottomright" }).addTo(mapRef.current);
    layersRef.current = L.layerGroup().addTo(mapRef.current);
    return () => { mapRef.current?.remove(); mapRef.current = null; };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !layersRef.current) return;
    layersRef.current.clearLayers();

    const routeCoords = routeCoordsRef.current.length > 0
      ? routeCoordsRef.current
      : [pickup, dropoff];

    // Full route (dim)
    L.polyline(routeCoords, { color: "#e11d48", weight: 5, opacity: 0.15 }).addTo(layersRef.current);

    // Traveled portion
    const traveledIdx = Math.floor(progress * (routeCoords.length - 1));
    const traveled = routeCoords.slice(0, traveledIdx + 1);
    if (traveled.length > 1) {
      L.polyline(traveled, { color: "#22c55e", weight: 5, opacity: 0.8, lineCap: "round" }).addTo(layersRef.current);
    }

    // Remaining
    const remaining = routeCoords.slice(traveledIdx);
    if (remaining.length > 1) {
      L.polyline(remaining, { color: "#e11d48", weight: 4, opacity: 0.6, lineCap: "round" }).addTo(layersRef.current);
    }

    // Pickup
    L.marker(pickup, {
      icon: L.divIcon({
        html: `<div style="width:14px;height:14px;border-radius:50%;background:#22c55e;border:3px solid #fff;box-shadow:0 0 10px rgba(34,197,94,.5)"></div>`,
        iconSize: [14, 14], iconAnchor: [7, 7], className: "",
      }),
    }).addTo(layersRef.current);

    // Dropoff
    L.marker(dropoff, {
      icon: L.divIcon({
        html: `<div style="width:14px;height:14px;border-radius:50%;background:#e11d48;border:3px solid #fff;box-shadow:0 0 10px rgba(225,29,72,.5)"></div>`,
        iconSize: [14, 14], iconAnchor: [7, 7], className: "",
      }),
    }).addTo(layersRef.current);

    // Driver
    L.marker(driverPosition, {
      icon: L.divIcon({
        html: `<div style="width:22px;height:22px;border-radius:50%;background:#e11d48;border:3px solid #fff;box-shadow:0 0 14px rgba(225,29,72,.6);display:flex;align-items:center;justify-content:center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
        </div>`,
        iconSize: [22, 22], iconAnchor: [11, 11], className: "",
      }),
    }).addTo(layersRef.current);

    if (!fittedRef.current) {
      mapRef.current.fitBounds(L.latLngBounds(routeCoords).pad(0.2));
      fittedRef.current = true;
    }
  }, [pickup, dropoff, driverPosition, progress]);

  return <div ref={containerRef} className="w-full h-full" style={{ minHeight: 300 }} />;
};

export default TrackingMap;
