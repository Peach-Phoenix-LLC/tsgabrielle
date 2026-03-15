import posthog from "posthog-js";

export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

export function initPostHog() {
  if (typeof window === "undefined" || !POSTHOG_KEY) return;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
    // Session replay
    disable_session_recording: false,
    session_recording: {
      maskAllInputs: false,
      maskInputFn: (text, element) => {
        // Mask password and payment fields, show everything else
        const type = (element as HTMLInputElement)?.type;
        if (type === "password" || element?.getAttribute("data-sensitive") === "true") {
          return "*".repeat(text.length);
        }
        return text;
      },
    },
    // Feature flags
    advanced_disable_feature_flags: false,
  });

  return posthog;
}

export { posthog };
