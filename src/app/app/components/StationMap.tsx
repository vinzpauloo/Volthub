"use client";

import { RiFlashlightLine } from "react-icons/ri";

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

export interface MapStation {
  id: number;
  name: string;
  address: string;
  power: string;
  available: number;
  total: number;
  lat: number;
  lng: number;
  is24h: boolean;
}

/* ──────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────── */

function getAvailabilityColor(available: number, total: number): string {
  const ratio = available / total;
  if (ratio === 0) return "#ef4444";
  if (ratio <= 0.33) return "#f59e0b";
  return "#22c55e";
}

function getAvailabilityBg(available: number, total: number): string {
  const ratio = available / total;
  if (ratio === 0) return "rgba(239,68,68,0.15)";
  if (ratio <= 0.33) return "rgba(245,158,11,0.15)";
  return "rgba(34,197,94,0.15)";
}

/**
 * Convert real Metro Manila lat/lng to approximate % positions
 * over the embed iframe when centered on Metro Manila (~14.58, 121.04)
 * at zoom level ~12.
 */
function latLngToPercent(lat: number, lng: number): { top: number; left: number } {
  // Metro Manila bounds approx: lat 14.35–14.75, lng 120.95–121.15
  const top = ((14.75 - lat) / 0.4) * 100;
  const left = ((lng - 120.95) / 0.2) * 100;
  return { top: Math.max(5, Math.min(90, top)), left: Math.max(8, Math.min(90, left)) };
}

/* ──────────────────────────────────────────────
   Sub-components
   ────────────────────────────────────────────── */

function StationMarker({
  station,
  isActive,
  onClick,
}: {
  station: MapStation;
  isActive: boolean;
  onClick: () => void;
}) {
  const ratio = station.available / station.total;
  const color =
    ratio === 0 ? "#ef4444" : ratio <= 0.33 ? "#f59e0b" : "#22c55e";
  const glowColor =
    ratio === 0
      ? "rgba(239,68,68,0.6)"
      : ratio <= 0.33
        ? "rgba(245,158,11,0.6)"
        : "rgba(34,197,94,0.6)";

  const pos = latLngToPercent(station.lat, station.lng);

  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10 transition-transform hover:scale-110"
      style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
      aria-label={`${station.name} — ${station.available}/${station.total} available`}
      title={`${station.name}: ${station.available}/${station.total} available`}
    >
      {/* Outer glow ring */}
      {isActive && (
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-30"
          style={{
            width: 42,
            height: 42,
            left: -13,
            top: -13,
            backgroundColor: glowColor,
          }}
        />
      )}
      {/* Pin body */}
      <span
        className="relative flex items-center justify-center rounded-full shadow-lg"
        style={{
          width: isActive ? 36 : 28,
          height: isActive ? 36 : 28,
          backgroundColor: isActive ? color : "rgba(0,0,0,0.8)",
          border: `2.5px solid ${color}`,
          boxShadow: isActive
            ? `0 0 18px ${glowColor}, 0 0 36px ${glowColor}`
            : `0 0 8px ${glowColor}`,
        }}
      >
        <RiFlashlightLine
          style={{
            color: isActive ? "#fff" : color,
            fontSize: isActive ? 16 : 12,
          }}
        />
      </span>
    </button>
  );
}

function MapPopup({ station }: { station: MapStation }) {
  const pct = (station.available / station.total) * 100;
  const barColor = getAvailabilityColor(station.available, station.total);
  const bgColor = getAvailabilityBg(station.available, station.total);

  return (
    <div className="absolute bottom-4 left-4 right-4 z-20 bg-white rounded-xl shadow-2xl p-4 border border-gray-100 animate-fade-in max-w-sm">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-bold text-gray-900 text-sm">{station.name}</h4>
          <p className="text-xs text-gray-500 mt-0.5">{station.power}</p>
        </div>
        <span
          className="flex-shrink-0 text-xs font-bold px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: bgColor, color: barColor }}
        >
          {station.is24h ? "24H" : "Limited"}
        </span>
      </div>

      {/* Availability row */}
      <div className="flex items-center gap-2 mb-2">
        <span className="font-bold text-sm" style={{ color: barColor }}>
          {station.available}/{station.total} available
        </span>
        {station.available === 0 && (
          <span className="text-xs font-medium text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
            Full
          </span>
        )}
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2.5">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        />
      </div>

      <p className="text-xs text-gray-500 flex items-center gap-1">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 flex-shrink-0">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {station.address}
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main Component
   ────────────────────────────────────────────── */

interface StationMapProps {
  stations: MapStation[];
  activeStationId: number;
  onStationSelect: (id: number) => void;
}

export function StationMap({
  stations,
  activeStationId,
  onStationSelect,
}: StationMapProps) {
  const activeStation = stations.find((s) => s.id === activeStationId);

  return (
    <div className="relative w-full h-full" style={{ minHeight: 460 }}>
      {/* Google Maps Embed iframe */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247135.81879325895!2d120.88522721207213!3d14.575462960096078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b60155260379%3A0x7b16373c6e7f6b27!2sMetro%20Manila!5e0!3m2!1sen!2sph!4v1765958400000!5m2!1sen!2sph"
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: 460 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="VoltHub Charging Stations Map"
        className="absolute inset-0 w-full h-full"
      />

      {/* Markers overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {stations.map((station) => (
          <div key={station.id} className="pointer-events-auto">
            <StationMarker
              station={station}
              isActive={station.id === activeStationId}
              onClick={() => onStationSelect(station.id)}
            />
          </div>
        ))}
      </div>

      {/* Active station popup */}
      {activeStation && <MapPopup station={activeStation} />}

      {/* Top center: Search this area */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
        <button
          type="button"
          className="flex items-center gap-2 bg-white/95 backdrop-blur text-gray-700 text-xs font-medium px-4 py-2 rounded-full shadow-lg border border-gray-200/80 hover:bg-white transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Search this area
        </button>
      </div>
    </div>
  );
}
