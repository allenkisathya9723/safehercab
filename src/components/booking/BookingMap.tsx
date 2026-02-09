import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface BookingMapProps {
  pickup: [number, number] | null;
  dropoff: [number, number] | null;
}

const BookingMap = ({ pickup, dropoff }: BookingMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const routeRef = useRef<L.Polyline | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    mapRef.current = L.map(containerRef.current).setView([20.5937, 78.9629], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://openstreetmap.org">OSM</a>',
    }).addTo(mapRef.current);
    markersRef.current = L.layerGroup().addTo(mapRef.current);
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return;
    markersRef.current.clearLayers();
    if (routeRef.current) {
      routeRef.current.remove();
      routeRef.current = null;
    }

    const pickupIcon = L.divIcon({
      html: '<div style="background:#22c55e;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)"></div>',
      iconSize: [14, 14],
      iconAnchor: [7, 7],
      className: "",
    });

    const dropoffIcon = L.divIcon({
      html: '<div style="background:#e11d48;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)"></div>',
      iconSize: [14, 14],
      iconAnchor: [7, 7],
      className: "",
    });

    if (pickup) {
      L.marker(pickup, { icon: pickupIcon }).addTo(markersRef.current);
    }
    if (dropoff) {
      L.marker(dropoff, { icon: dropoffIcon }).addTo(markersRef.current);
    }

    if (pickup && dropoff) {
      routeRef.current = L.polyline([pickup, dropoff], {
        color: "hsl(340, 82%, 52%)",
        weight: 4,
        opacity: 0.7,
        dashArray: "8, 8",
      }).addTo(mapRef.current);
      mapRef.current.fitBounds(L.latLngBounds(pickup, dropoff).pad(0.3));
    } else if (pickup) {
      mapRef.current.setView(pickup, 14);
    } else if (dropoff) {
      mapRef.current.setView(dropoff, 14);
    }
  }, [pickup, dropoff]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-xl overflow-hidden border border-border"
      style={{ minHeight: 400 }}
    />
  );
};

export default BookingMap;
