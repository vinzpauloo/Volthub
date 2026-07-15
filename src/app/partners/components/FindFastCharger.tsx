"use client";

import { useState } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import {
  RiSearchLine,
  RiMapPinLine,
  RiChargingPile2Line,
  RiTimeLine,
  RiNavigationLine,
  RiFlashlightLine,
} from "react-icons/ri";

interface ChargerStation {
  id: number;
  name: string;
  address: string;
  power: string;
  available: number;
  total: number;
  distance: string;
  openHours: string;
}

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
  },
];

export function FindFastCharger(): React.ReactElement {
  const [search, setSearch] = useState("");
  const [powerFilter, setPowerFilter] = useState("all");

  const filtered = MOCK_STATIONS.filter((station) => {
    const matchesSearch =
      station.name.toLowerCase().includes(search.toLowerCase()) ||
      station.address.toLowerCase().includes(search.toLowerCase());
    const matchesPower =
      powerFilter === "all" || station.power.includes(powerFilter);
    return matchesSearch && matchesPower;
  });

  return (
    <section className="section-spacing bg-white">
      <LayoutContainer className="flex-col space-y-12">
        <SectionHeading
          eyebrow="Find a Station"
          title="Find a Fast Charger Near You"
          description="Search for VoltHub fast charging stations across the Philippines by location or power type."
        />

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto w-full">
          <div className="flex-1 relative">
            <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by station name or address..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              aria-label="Search charging stations"
            />
          </div>
          <select
            value={powerFilter}
            onChange={(e) => setPowerFilter(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
            aria-label="Filter by power type"
          >
            <option value="all">All Power Types</option>
            <option value="150 kW">150 kW</option>
            <option value="120 kW">120 kW</option>
            <option value="60 kW">60 kW</option>
          </select>
        </div>

        {/* Results count */}
        <p className="text-center text-gray-500 text-sm">
          {filtered.length} station{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Station Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((station) => (
            <div
              key={station.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-2">
                  <RiMapPinLine className="text-primary text-xl flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900">{station.name}</h3>
                    <p className="text-sm text-gray-500">{station.address}</p>
                  </div>
                </div>
                <span className="flex-shrink-0 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                  <RiFlashlightLine className="inline mr-1" />
                  {station.power}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm text-gray-600 border-t border-gray-100 pt-3">
                <div className="flex items-center gap-2">
                  <RiChargingPile2Line className="text-gray-400" />
                  <span>
                    {station.available}/{station.total} available
                  </span>
                  {/* Availability bar */}
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-24">
                    <div
                      className="h-full bg-secondary rounded-full transition-all"
                      style={{
                        width: `${(station.available / station.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <RiTimeLine className="text-gray-400" />
                  <span>{station.openHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <RiNavigationLine className="text-gray-400" />
                  <span>{station.distance}</span>
                </div>
              </div>

              {/* Action */}
              <button
                type="button"
                className="mt-4 w-full bg-primary/10 text-primary font-semibold py-2.5 rounded-xl hover:bg-primary/20 transition-colors text-sm"
              >
                Get Directions
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-12">
            No stations found matching your criteria. Try a different search.
          </p>
        )}
      </LayoutContainer>
    </section>
  );
}
