// Free OSRM routing via OpenStreetMap
export async function fetchRoute(
  from: [number, number],
  to: [number, number]
): Promise<[number, number][]> {
  try {
    // OSRM expects lon,lat
    const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Routing failed");
    const data = await res.json();
    const coords: [number, number][] = data.routes?.[0]?.geometry?.coordinates?.map(
      (c: [number, number]) => [c[1], c[0]] as [number, number]
    ) ?? [];
    return coords;
  } catch {
    // Fallback: straight line
    return [from, to];
  }
}
