"use client";

import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

// Simplified TopoJSON for the world map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface ActiveUser {
  city: string;
  country: string;
  flag: string;
  coordinates: [number, number]; // [longitude, latitude]
}

export default function LiveMap() {
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [totalActive, setTotalActive] = useState(0);

  useEffect(() => {
    // Fetch real-time data from our new API route
    const fetchRealTimeData = async () => {
      try {
        const res = await fetch("/api/admin/analytics/realtime");
        if (res.ok) {
          const data = await res.json();
          setActiveUsers(data.users || []);
          setTotalActive(data.total || 0);
        }
      } catch (err) {
        console.error("Failed to fetch real-time analytics:", err);
      }
    };

    fetchRealTimeData();
    const interval = setInterval(fetchRealTimeData, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#a932bd]">
          Live Global Traffic (GA4)
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#a932bd] animate-ping" />
          <span className="text-[9px] uppercase tracking-widest text-[#a932bd] font-bold">
            {totalActive} Active Visitors
          </span>
        </div>
      </div>

      <div className="relative aspect-[21/9] w-full bg-[#fdfcf5] border border-black/5 rounded-2xl overflow-hidden shadow-inner group flex items-center justify-center">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 120,
          }}
          className="w-full h-full opacity-80"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#e5e5e5"
                  stroke="#ffffff"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#d4d4d4", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {activeUsers.map((user, i) => (
            <Marker key={i} coordinates={user.coordinates}>
              <g className="group/marker cursor-pointer">
                {/* Ping animation */}
                <circle r={8} fill="#a932bd" opacity={0.3} className="animate-ping" />
                <circle r={3} fill="#a932bd" />
                
                {/* Tooltip */}
                <g className="opacity-0 group-hover/marker:opacity-100 transition-opacity">
                  <rect
                    x={-40}
                    y={-30}
                    width={80}
                    height={20}
                    fill="white"
                    rx={4}
                    className="shadow-xl"
                    stroke="rgba(169, 50, 189, 0.2)"
                    strokeWidth={1}
                  />
                  <text
                    textAnchor="middle"
                    y={-16}
                    style={{ fontFamily: "system-ui", fill: "#111", fontSize: "8px", fontWeight: "bold" }}
                  >
                    {user.flag} {user.city}
                  </text>
                </g>
              </g>
            </Marker>
          ))}
        </ComposableMap>

        {/* Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none border-[0.5px] border-black/5 grid grid-cols-12 grid-rows-6" />
      </div>

      <div className="flex justify-center space-x-12 pt-4">
        <div className="text-center">
          <p className="text-[14px] font-serif text-[#a932bd]">2.4s</p>
          <p className="text-[7px] uppercase tracking-widest text-black/40 mt-1">Avg Load Time</p>
        </div>
        <div className="text-center">
          <p className="text-[14px] font-serif text-[#a932bd]">84%</p>
          <p className="text-[7px] uppercase tracking-widest text-black/40 mt-1">Mobile Traffic</p>
        </div>
        <div className="text-center">
          <p className="text-[14px] font-serif text-[#a932bd]">{totalActive}</p>
          <p className="text-[7px] uppercase tracking-widest text-black/40 mt-1">Open Sessions</p>
        </div>
      </div>
    </div>
  );
}
