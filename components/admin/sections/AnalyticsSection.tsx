"use client";

import { BarChart3 } from "lucide-react";

export default function AnalyticsSection() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "Not Set";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-light">Google Analytics</h3>
          <p className="text-sm text-gray-500">
            Measurement ID:{" "}
            <span className="font-mono bg-gray-100 p-1 rounded text-xs">
              {measurementId}
            </span>
          </p>
        </div>
        <a
          href={`https://analytics.google.com/analytics/web/#/report-home/G-${measurementId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[#a932bd] text-white text-xs uppercase tracking-widest rounded hover:bg-[#921fa6]"
        >
          <BarChart3 size={16} />
          View Analytics
        </a>
      </div>
      
      <div className="h-64 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">
          Analytics charts and data will be displayed here in a future update.
        </p>
      </div>
    </div>
  );
}
