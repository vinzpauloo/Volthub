"use client";

import { useState, useCallback, useMemo } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel";
import {
  RiSearchLine,
  RiMapPinLine,
  RiChargingPile2Line,
  RiTimeLine,
  RiNavigationLine,
  RiFlashlightLine,
  RiFilterLine,
  RiCloseLine,
  RiPlugLine,
  RiTimerFlashLine,
  RiRocketLine,
} from "react-icons/ri";

import { StationMap, type MapStation } from "./StationMap";

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

interface ChargerStation {
  id: number;
  name: string;
  address: string;
  power: string;
  available: number;
  total: number;
  distance: string;
  openHours: string;
  connectorTypes: ConnectorType[];
  is24h: boolean;
  lat: number;
  lng: number;
}

type ConnectorType = "CCS" | "CHAdeMO" | "Type 2";

/* ──────────────────────────────────────────────
   Mock Data
   ────────────────────────────────────────────── */

const MOCK_STATIONS: ChargerStation[] = [
  {
    id: 1,
    name: "VoltHub SM Megamall",
    address: "EDSA corner Julia Vargas Ave, Mandaluyong",
    power: "120 kW DC",
    available: 2,
    total: 4,
    distance: "1.2 km",
    openHours: "10:00 AM – 10:00 PM",
    connectorTypes: ["CCS", "CHAdeMO"],
    is24h: false,
    lat: 14.5839,
    lng: 121.0575,
  },
  {
    id: 2,
    name: "VoltHub BGC High Street",
    address: "9th Ave, Bonifacio Global City, Taguig",
    power: "60 kW DC",
    available: 3,
    total: 6,
    distance: "3.5 km",
    openHours: "24 Hours",
    connectorTypes: ["CCS", "CHAdeMO", "Type 2"],
    is24h: true,
    lat: 14.5495,
    lng: 121.0498,
  },
  {
    id: 3,
    name: "VoltHub Makati CBD",
    address: "Ayala Ave, Makati Central Business District",
    power: "150 kW DC",
    available: 1,
    total: 3,
    distance: "5.8 km",
    openHours: "6:00 AM – 12:00 AM",
    connectorTypes: ["CCS", "Type 2"],
    is24h: false,
    lat: 14.5547,
    lng: 121.0244,
  },
  {
    id: 4,
    name: "VoltHub Alabang Town Center",
    address: "Alabang-Zapote Rd, Muntinlupa",
    power: "60 kW DC",
    available: 4,
    total: 4,
    distance: "8.3 km",
    openHours: "10:00 AM – 9:00 PM",
    connectorTypes: ["CHAdeMO", "Type 2"],
    is24h: false,
    lat: 14.4201,
    lng: 121.0398,
  },
  {
    id: 5,
    name: "VoltHub Quezon City",
    address: "North EDSA, Quezon City",
    power: "120 kW DC",
    available: 0,
    total: 4,
    distance: "10.1 km",
    openHours: "24 Hours",
    connectorTypes: ["CCS", "CHAdeMO", "Type 2"],
    is24h: true,
    lat: 14.676,
    lng: 121.0437,
  },
  {
    id: 6,
    name: "VoltHub Nuvali",
    address: "Santa Rosa-Tagaytay Rd, Santa Rosa, Laguna",
    power: "60 kW DC",
    available: 2,
    total: 2,
    distance: "15.4 km",
    openHours: "8:00 AM – 8:00 PM",
    connectorTypes: ["CCS"],
    is24h: false,
    lat: 14.2431,
    lng: 121.0584,
  },
];

/* ──────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────── */

const CONNECTOR_LABELS: Record<ConnectorType, string> = {
  CCS: "CCS (Combo)",
  CHAdeMO: "CHAdeMO",
  "Type 2": "Type 2 (Mennekes)",
};

function getAvailabilityColor(available: number, total: number): string {
  const ratio = available / total;
  if (ratio === 0) return "#ef4444";
  if (ratio <= 0.33) return "#f59e0b";
  return "#22c55e";
}

function getAvailabilityBg(available: number, total: number): string {
  const ratio = available / total;
  if (ratio === 0) return "rgba(239,68,68,0.12)";
  if (ratio <= 0.33) return "rgba(245,158,11,0.12)";
  return "rgba(34,197,94,0.12)";
}

function toggleArrayItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

/* ──────────────────────────────────────────────
   Sub-components
   ────────────────────────────────────────────── */

function AvailabilityBar({
  available,
  total,
  compact = false,
}: {
  available: number;
  total: number;
  compact?: boolean;
}) {
  const pct = (available / total) * 100;
  const barColor = getAvailabilityColor(available, total);

  return (
    <div className={compact ? "space-y-1" : "space-y-1.5"}>
      <div className="flex items-center gap-2">
        <span className="font-bold text-sm" style={{ color: barColor }}>
          {available}/{total} available
        </span>
        {available === 0 && (
          <span className="text-xs font-medium text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
            Full
          </span>
        )}
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  );
}

function StationCard({
  station,
  isActive,
  onSelect,
}: {
  station: ChargerStation;
  isActive: boolean;
  onSelect: () => void;
}) {
  const barColor = getAvailabilityColor(station.available, station.total);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left w-[300px] flex-shrink-0 bg-white rounded-2xl border p-5 transition-all duration-300 hover:shadow-lg ${
        isActive
          ? "border-primary/40 shadow-md ring-2 ring-primary/20"
          : "border-gray-200 shadow-sm"
      }`}
    >
      {/* Header: icon + name + power badge */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-start gap-2 min-w-0">
          <span
            className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center"
            style={{ backgroundColor: getAvailabilityBg(station.available, station.total) }}
          >
            <RiMapPinLine style={{ color: barColor }} size={14} />
          </span>
          <div className="min-w-0">
            <h4 className="font-bold text-gray-900 text-sm truncate">
              {station.name}
            </h4>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {station.address}
            </p>
          </div>
        </div>
        <span
          className="flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: getAvailabilityBg(station.available, station.total), color: barColor }}
        >
          <RiFlashlightLine className="inline mr-0.5" size={10} />
          {station.power}
        </span>
      </div>

      {/* Availability */}
      <AvailabilityBar available={station.available} total={station.total} compact />

      {/* Details */}
      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <RiTimeLine size={12} className="text-gray-400 flex-shrink-0" />
          {station.openHours}
        </span>
        <span className="flex items-center gap-1">
          <RiNavigationLine size={12} className="text-gray-400 flex-shrink-0" />
          {station.distance}
        </span>
      </div>

      {/* Connector tags */}
      <div className="flex flex-wrap gap-1.5 mt-2.5">
        {station.connectorTypes.map((ct) => (
          <span key={ct} className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
            {ct}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div
        className="mt-4 w-full text-center font-semibold text-sm py-2.5 rounded-xl transition-all duration-200 hover:brightness-110"
        style={{ backgroundColor: barColor, color: "#fff" }}
      >
        Get Directions
      </div>
    </button>
  );
}

/* ──────────────────────────────────────────────
   Filter Sidebar (always visible on desktop)
   ────────────────────────────────────────────── */

function FilterSidebar({
  connectorFilters,
  setConnectorFilters,
  availabilityFilters,
  setAvailabilityFilters,
  powerFilters,
  setPowerFilters,
  showMobile,
  onCloseMobile,
}: {
  connectorFilters: ConnectorType[];
  setConnectorFilters: (v: ConnectorType[]) => void;
  availabilityFilters: string[];
  setAvailabilityFilters: (v: string[]) => void;
  powerFilters: string[];
  setPowerFilters: (v: string[]) => void;
  showMobile?: boolean;
  onCloseMobile?: () => void;
}) {
  const content = (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
          <RiFilterLine className="text-primary" size={18} />
          Filters
        </h3>
        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close filters"
          >
            <RiCloseLine size={20} />
          </button>
        )}
      </div>

      {/* Filter groups */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-7">
        {/* Connector Type */}
        <fieldset>
          <legend className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-1.5">
            <RiPlugLine className="text-primary" size={14} />
            Connector Type
          </legend>
          <div className="space-y-2.5">
            {(Object.keys(CONNECTOR_LABELS) as ConnectorType[]).map((ct) => (
              <label key={ct} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={connectorFilters.includes(ct)}
                  onChange={() => setConnectorFilters(toggleArrayItem(connectorFilters, ct))}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/40"
                  style={{ accentColor: "#1a7c11" }}
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  {CONNECTOR_LABELS[ct]}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Availability */}
        <fieldset>
          <legend className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-1.5">
            <RiTimerFlashLine className="text-primary" size={14} />
            Availability
          </legend>
          <div className="space-y-2.5">
            {[
              { value: "has-available", label: "Has available ports" },
              { value: "24h", label: "24 Hr available" },
            ].map((opt) => (
              <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={availabilityFilters.includes(opt.value)}
                  onChange={() => setAvailabilityFilters(toggleArrayItem(availabilityFilters, opt.value))}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/40"
                  style={{ accentColor: "#1a7c11" }}
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Power Type */}
        <fieldset>
          <legend className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-1.5">
            <RiRocketLine className="text-primary" size={14} />
            Power Type
          </legend>
          <div className="space-y-2.5">
            {["150 kW", "120 kW", "60 kW"].map((pw) => (
              <label key={pw} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={powerFilters.includes(pw)}
                  onChange={() => setPowerFilters(toggleArrayItem(powerFilters, pw))}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/40"
                  style={{ accentColor: "#1a7c11" }}
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  {pw} DC
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Reset */}
      <div className="px-5 py-3 border-t border-gray-100">
        <button
          type="button"
          onClick={() => {
            setConnectorFilters([]);
            setAvailabilityFilters([]);
            setPowerFilters([]);
          }}
          className="w-full text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors py-2"
        >
          Reset all filters
        </button>
      </div>
    </div>
  );

  // Mobile overlay
  if (showMobile !== undefined) {
    return (
      <>
        {/* Backdrop */}
        {showMobile && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={onCloseMobile}
          />
        )}
        {/* Panel */}
        <div
          className={`fixed top-0 right-0 h-full w-80 z-50 transition-transform duration-300 lg:hidden ${
            showMobile ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {content}
        </div>
      </>
    );
  }

  // Desktop: always visible
  return content;
}

/* ──────────────────────────────────────────────
   Main Component
   ────────────────────────────────────────────── */

export function FindFastCharger(): React.ReactElement {
  const [search, setSearch] = useState("");
  const [activeStationId, setActiveStationId] = useState<number>(2);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [connectorFilters, setConnectorFilters] = useState<ConnectorType[]>([]);
  const [availabilityFilters, setAvailabilityFilters] = useState<string[]>([]);
  const [powerFilters, setPowerFilters] = useState<string[]>([]);

  const hasActiveFilters =
    connectorFilters.length > 0 ||
    availabilityFilters.length > 0 ||
    powerFilters.length > 0;

  const activeFilterCount =
    connectorFilters.length + availabilityFilters.length + powerFilters.length;

  // Filter stations
  const filtered = useMemo(
    () =>
      MOCK_STATIONS.filter((station) => {
        const matchesSearch =
          search.trim() === "" ||
          station.name.toLowerCase().includes(search.toLowerCase()) ||
          station.address.toLowerCase().includes(search.toLowerCase());

        const matchesConnector =
          connectorFilters.length === 0 ||
          connectorFilters.some((cf) => station.connectorTypes.includes(cf));

        const hasAvailable =
          !availabilityFilters.includes("has-available") || station.available > 0;
        const is24h =
          !availabilityFilters.includes("24h") || station.is24h;
        const matchesAvailability =
          availabilityFilters.length === 0 ||
          (availabilityFilters.includes("has-available") && hasAvailable) ||
          (availabilityFilters.includes("24h") && is24h);

        const matchesPower =
          powerFilters.length === 0 ||
          powerFilters.some((pf) => station.power.includes(pf));

        return matchesSearch && matchesConnector && matchesAvailability && matchesPower;
      }),
    [search, connectorFilters, availabilityFilters, powerFilters],
  );

  const mapStations: MapStation[] = useMemo(
    () =>
      filtered.map(({ id, name, address, power, available, total, lat, lng, is24h }) => ({
        id,
        name,
        address,
        power,
        available,
        total,
        lat,
        lng,
        is24h,
      })),
    [filtered],
  );

  const handleSelectStation = useCallback((id: number) => {
    setActiveStationId(id);
  }, []);

  const clearFilters = useCallback(() => {
    setConnectorFilters([]);
    setAvailabilityFilters([]);
    setPowerFilters([]);
  }, []);

  return (
    <section className="section-spacing bg-white">
      <LayoutContainer className="flex-col">
        {/* ── Section Header ── */}
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2 block">
            Find a Station
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Find a Fast Charger Near You
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Search for VoltHub fast charging stations across the Philippines by
            location, connector type, or power output.
          </p>
        </div>

        {/* ── Search + Mobile Filter Toggle ── */}
        <div className="flex items-center gap-3 max-w-3xl mx-auto w-full mb-8">
          <div className="flex-1 relative">
            <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for Volthub name or address..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm shadow-sm"
              aria-label="Search charging stations"
            />
          </div>

          {/* Mobile filter toggle */}
          <button
            type="button"
            onClick={() => setShowMobileFilters(true)}
            className={`lg:hidden flex items-center gap-2 px-5 py-3.5 rounded-xl border text-sm font-medium transition-all flex-shrink-0 ${
              hasActiveFilters
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
            }`}
          >
            <RiFilterLine />
            Filters
            {hasActiveFilters && (
              <span className="w-5 h-5 rounded-full bg-white text-primary text-xs font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* ── Map + Filter Sidebar ── */}
        <div className="flex rounded-2xl overflow-hidden border border-gray-200 shadow-sm mb-8 min-h-[460px]">
          {/* Map — takes remaining space */}
          <div className="flex-1 min-h-[460px]">
            <StationMap
              stations={mapStations}
              activeStationId={activeStationId}
              onStationSelect={handleSelectStation}
            />
          </div>

          {/* Filter sidebar — always visible on desktop */}
          <div className="hidden lg:block w-72 flex-shrink-0 border-l border-gray-200">
            <FilterSidebar
              connectorFilters={connectorFilters}
              setConnectorFilters={setConnectorFilters}
              availabilityFilters={availabilityFilters}
              setAvailabilityFilters={setAvailabilityFilters}
              powerFilters={powerFilters}
              setPowerFilters={setPowerFilters}
            />
          </div>
        </div>

        {/* Mobile filter overlay */}
        <FilterSidebar
          connectorFilters={connectorFilters}
          setConnectorFilters={setConnectorFilters}
          availabilityFilters={availabilityFilters}
          setAvailabilityFilters={setAvailabilityFilters}
          powerFilters={powerFilters}
          setPowerFilters={setPowerFilters}
          showMobile={showMobileFilters}
          onCloseMobile={() => setShowMobileFilters(false)}
        />

        {/* ── Results Count ── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700">{filtered.length}</span>{" "}
            station{filtered.length !== 1 ? "s" : ""} found
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs text-primary font-medium hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* ── Station Cards Carousel ── */}
        {filtered.length > 0 ? (
          <Carousel
            opts={{ align: "start", loop: false, dragFree: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {filtered.map((station) => (
                <CarouselItem key={station.id} className="pl-4 basis-auto">
                  <StationCard
                    station={station}
                    isActive={station.id === activeStationId}
                    onSelect={() => handleSelectStation(station.id)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-0 -translate-x-1/2 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-primary shadow-md size-10" />
            <CarouselNext className="right-0 translate-x-1/2 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-primary shadow-md size-10" />

            <CarouselDots className="mt-6" />
          </Carousel>
        ) : (
          <div className="text-center py-16">
            <RiChargingPile2Line className="mx-auto text-gray-300 mb-3" size={40} />
            <p className="text-gray-500 font-medium">
              No stations found matching your criteria.
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your filters or search term.
            </p>
          </div>
        )}
      </LayoutContainer>
    </section>
  );
}
