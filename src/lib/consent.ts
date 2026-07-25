export type ConsentStatus = "granted" | "denied";

const STORAGE_KEY = "cookie-consent";
export const CONSENT_EVENT = "consent-changed";

export function getStoredConsent(): ConsentStatus | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

export function setStoredConsent(status: ConsentStatus) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, status);
  window.dispatchEvent(
    new CustomEvent<ConsentStatus>(CONSENT_EVENT, { detail: status }),
  );

  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void })
    .gtag;
  if (typeof gtag === "function") {
    gtag("consent", "update", {
      ad_storage: status,
      analytics_storage: status,
      ad_user_data: status,
      ad_personalization: status,
    });
  }
}
