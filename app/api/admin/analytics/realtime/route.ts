import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { requireAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

// List of cities to match coordinates if GA doesn't provide them easily
const cityCoordinates: Record<string, [number, number]> = {
  "New York": [-74.0060, 40.7128],
  "London": [-0.1276, 51.5074],
  "Paris": [2.3522, 48.8566],
  "Tokyo": [139.6917, 35.6895],
  "Sydney": [151.2093, -33.8688],
  "Dubai": [55.2708, 25.2048],
  "Sao Paulo": [-46.6333, -23.5505],
  "Los Angeles": [-118.2437, 34.0522],
  "Toronto": [-79.3832, 43.6532],
  "Berlin": [-13.4050, 52.5200]
};

const countryFlags: Record<string, string> = {
  "United States": "🇺🇸",
  "United Kingdom": "🇬🇧",
  "France": "🇫🇷",
  "Japan": "🇯🇵",
  "Australia": "🇦🇺",
  "United Arab Emirates": "🇦🇪",
  "Brazil": "🇧🇷",
  "Canada": "🇨🇦",
  "Germany": "🇩🇪"
};

export async function GET(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const propertyId = process.env.GA_PROPERTY_ID; // Must be the numeric property ID
  const clientEmail = process.env.GA_CLIENT_EMAIL;
  const privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n");

  try {
    // If GA is fully configured with a service account
    if (propertyId && clientEmail && privateKey) {
      const analyticsDataClient = new BetaAnalyticsDataClient({
        credentials: {
          client_email: clientEmail,
          private_key: privateKey,
        },
      });

      const [response] = await analyticsDataClient.runRealtimeReport({
        property: `properties/${propertyId}`,
        dimensions: [
          { name: "city" },
          { name: "country" }
        ],
        metrics: [
          { name: "activeUsers" }
        ],
      });

      const users: any[] = [];
      let total = 0;

      response.rows?.forEach(row => {
        const city = row.dimensionValues?.[0]?.value || "Unknown";
        const country = row.dimensionValues?.[1]?.value || "Unknown";
        const count = parseInt(row.metricValues?.[0]?.value || "0", 10);
        
        total += count;

        if (cityCoordinates[city] && count > 0) {
          for (let i = 0; i < count; i++) {
            users.push({
              city,
              country,
              flag: countryFlags[country] || "🌐",
              // Jitter the coordinates slightly so multiple users in same city don't stack perfectly
              coordinates: [
                cityCoordinates[city][0] + (Math.random() * 0.1 - 0.05),
                cityCoordinates[city][1] + (Math.random() * 0.1 - 0.05)
              ]
            });
          }
        }
      });

      return NextResponse.json({ users, total });
    }

    // Fallback: Return simulated realistic data if GA isn't fully configured yet 
    // (We will inform the user they need to set GA_PROPERTY_ID and GA_CLIENT_EMAIL)
    const mockActive = Math.floor(Math.random() * 5) + 5; // 5 to 10 active users
    const cities = Object.keys(cityCoordinates);
    const mockUsers = Array.from({ length: mockActive }).map(() => {
      const city = cities[Math.floor(Math.random() * cities.length)];
      return {
        city,
        country: "Simulated",
        flag: "📍",
        coordinates: [
          cityCoordinates[city][0] + (Math.random() * 0.5 - 0.25),
          cityCoordinates[city][1] + (Math.random() * 0.5 - 0.25)
        ]
      };
    });

    return NextResponse.json({ users: mockUsers, total: mockActive, simulated: true });
    
  } catch (error: any) {
    console.error("GA Data API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
