import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchRoute } from "@/lib/routing";

interface BookingMapProps {
  pickup: [number, number] | null;
  dropoff: [number, number] | null;
}

const TILE_URL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const TILE_ATTR = '&copy; <a href="https://carto.com">CARTO</a> &copy; <a href="https://openstreetmap.org">OSM</a>';

const BookingMap = ({ pickup, dropoff }: BookingMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const routeRef = useRef<L.Polyline | null>(null);
  const glowRef = useRef<L.Polyline | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    mapRef.current = L.map(containerRef.current, { zoomControl: false }).setView([17.385, 78.4867], 12);
    L.tileLayer(TILE_URL, { attribution: TILE_ATTR, maxZoom: 19 }).addTo(mapRef.current);
    L.control.zoom({ position: "bottomright" }).addTo(mapRef.current);
    markersRef.current = L.layerGroup().addTo(mapRef.current);
    return () => { mapRef.current?.remove(); mapRef.current = null; };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return;
    markersRef.current.clearLayers();
    routeRef.current?.remove(); routeRef.current = null;
    glowRef.current?.remove(); glowRef.current = null;

    const pickupIcon = L.divIcon({
      html: `<div style="width:16px;height:16px;border-radius:50%;background:#22c55e;border:3px solid #fff;box-shadow:0 0 12px rgba(34,197,94,.6),0 2px 6px rgba(0,0,0,.3)"></div>`,
      iconSize: [16, 16], iconAnchor: [8, 8], className: "",
    });
    const dropoffIcon = L.divIcon({
      html: `<div style="width:16px;height:16px;border-radius:50%;background:#e11d48;border:3px solid #fff;box-shadow:0 0 12px rgba(225,29,72,.6),0 2px 6px rgba(0,0,0,.3)"></div>`,
      iconSize: [16, 16], iconAnchor: [8, 8], className: "",
    });

    if (pickup) L.marker(pickup, { icon: pickupIcon }).addTo(markersRef.current);
    if (dropoff) L.marker(dropoff, { icon: dropoffIcon }).addTo(markersRef.current);

    if (pickup && dropoff) {
      fetchRoute(pickup, dropoff).then((coords) => {
        if (!mapRef.current) return;
        // Glow effect
        glowRef.current = L.polyline(coords, {
          color: "#e11d48", weight: 10, opacity: 0.2,
        }).addTo(mapRef.current);
        // Main route
        routeRef.current = L.polyline(coords, {
          color: "#e11d48", weight: 4, opacity: 0.85,
          lineCap: "round", lineJoin: "round",
        }).addTo(mapRef.current);
        mapRef.current.fitBounds(L.latLngBounds(coords).pad(0.15));
      });
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
