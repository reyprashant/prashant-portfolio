/**
 * Analytics: loads Google Analytics 4 after hydration, only when a
 * measurement ID is configured. Disclosed in /privacy.
 */
import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";
import { publicEnv } from "@/lib/env";

export function GoogleAnalytics() {
  if (!publicEnv.gaMeasurementId) return null;
  return <NextGoogleAnalytics gaId={publicEnv.gaMeasurementId} />;
}
