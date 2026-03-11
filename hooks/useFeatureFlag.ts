"use client";

import { useEffect, useState } from "react";

export function useFeatureFlag(flag: string, defaultValue = false) {
  const [enabled, setEnabled] = useState(defaultValue);

  useEffect(() => {
    let mounted = true;
    fetch(`/api/feature-flags?flag=${encodeURIComponent(flag)}`)
      .then((res) => res.json())
      .then((data: { enabled: boolean }) => {
        if (mounted) setEnabled(data.enabled);
      })
      .catch(() => {
        if (mounted) setEnabled(defaultValue);
      });
    return () => {
      mounted = false;
    };
  }, [flag, defaultValue]);

  return enabled;
}
