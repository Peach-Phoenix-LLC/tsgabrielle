"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type LoyaltyTier = "Seedling" | "Blossom" | "Peach" | "Transcendent";

export function usePeaches() {
  const [points, setPoints] = useState(0);
  const [tier, setTier] = useState<LoyaltyTier>("Seedling");

  useEffect(() => {
    async function fetchPoints() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("loyalty_points")
        .select("points")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setPoints(data.points);
        calculateTier(data.points);
      }
    }
    fetchPoints();
  }, []);

  const calculateTier = (p: number) => {
    if (p >= 5000) setTier("Transcendent");
    else if (p >= 2000) setTier("Peach");
    else if (p >= 500) setTier("Blossom");
    else setTier("Seedling");
  };

  return { points, tier };
}
