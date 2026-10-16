import React, { useEffect, useRef } from 'react';
import { VehicleShipment } from '../types';
import L from 'leaflet';

interface CorridorMapProps {
  shipments: VehicleShipment[];
  selectedShipmentId: string | null;
  onSelectShipment: (id: string) => void;
}

export const CorridorMap: React.FC<CorridorMapProps> = ({
  shipments,
  selectedShipmentId,
  onSelectShipment
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const polylineGroupRef = useRef<L.LayerGroup | null>(null);

  // Center around Southern Africa (Zambia / SADC region)
  const defaultCenter: [number, number] = [-18.0, 26.0];
  const defaultZoom = 5;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize map instance
      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: defaultZoom,
        zoomControl: false
      });

      // Add tile layer from OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      // Add zoom control at bottom-right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      polylineGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers and route lines when shipments or selectedShipmentId changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !polylineGroupRef.current) return;

    // Clear existing polylines
    polylineGroupRef.current.clearLayers();

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    shipments.forEach(shipment => {
      const isSelected = shipment.id === selectedShipmentId;

      // Draw corridor polyline route
      if (shipment.routeWaypoints && shipment.routeWaypoints.length > 0) {
        const polyline = L.polyline(shipment.routeWaypoints, {
          color: isSelected ? '#3B82F6' : '#64748B',
          weight: isSelected ? 4 : 2,
          dashArray: isSelected ? undefined : '6, 8',
          opacity: isSelected ? 0.9 : 0.5
        });
        polylineGroupRef.current?.addLayer(polyline);
      }

      // Create Custom DivIcon for vehicle pin
      const iconHtml = `
        <div class="relative group cursor-pointer flex items-center justify-center">
          <div class="absolute -inset-1 rounded-full ${isSelected ? 'bg-blue-500 animate-ping opacity-75' : 'bg-slate-600 opacity-30'}"></div>
          <div class="relative flex items-center justify-center w-9 h-9 rounded-full ${
            isSelected ? 'bg-gradient-to-tr from-blue-600 to-indigo-500 border-2 border-white shadow-lg scale-110' : 'bg-slate-800 border-2 border-slate-600'
          } text-white font-bold text-xs shadow-md">
            🚗
          </div>
          <div class="absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-white border border-slate-700 px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wide shadow-xl pointer-events-none">
            ${shipment.make} ${shipment.model}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-vehicle-marker',
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const marker = L.marker(shipment.currentCoordinates, { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        onSelectShipment(shipment.id);
      });

      markersRef.current[shipment.id] = marker;
    });

    // If selected shipment exists, fly to its coordinates
    const activeShipment = shipments.find(s => s.id === selectedShipmentId);
    if (activeShipment) {
      map.flyTo(activeShipment.currentCoordinates, 7, { duration: 1.2 });
    }
  }, [shipments, selectedShipmentId]);

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
      {/* Map Header Overlay */}
      <div className="absolute top-4 left-4 z-[400] bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3 rounded-xl shadow-xl max-w-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            SADC Trans-Corridor Satellite Map
          </span>
        </div>
        <p className="text-[11px] text-slate-400">
          Showing ocean ports (Durban, Walvis Bay, Dar, Beira) to Zambian import destinations.
        </p>
      </div>

      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Corridor Legend Footer Overlay */}
      <div className="absolute bottom-4 left-4 z-[400] bg-slate-900/90 backdrop-blur-md border border-slate-800 px-4 py-2 rounded-xl shadow-xl flex items-center gap-4 text-xs text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 bg-blue-500 rounded"></span>
          <span>Selected Active Route</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 bg-slate-500 rounded border border-dashed"></span>
          <span>Other Corridors</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm">🚗</span>
          <span>Live Vehicle Position</span>
        </div>
      </div>
    </div>
  );
};
