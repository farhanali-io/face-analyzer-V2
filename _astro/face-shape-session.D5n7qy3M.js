const SESSION_KEY = "arf:face-shape-session";
export const SESSION_TTL_MS = 30 * 60 * 1000;

export function getSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const createdAt = parsed.createdAt || parsed.timestamp || Date.now();
    if (Date.now() - createdAt > SESSION_TTL_MS) {
      clearSession();
      return null;
    }
    return {
      ...parsed,
      createdAt
    };
  } catch {
    return null;
  }
}

export function saveSession(session) {
  try {
    const payload = {
      ...session,
      createdAt: session?.createdAt || Date.now()
    };
    const serialized = JSON.stringify(payload);
    sessionStorage.setItem(SESSION_KEY, serialized);
    localStorage.setItem(SESSION_KEY, serialized);
    window.dispatchEvent(new CustomEvent("arf:shape-result", { detail: payload }));
    return true;
  } catch {
    return false;
  }
}

export function clearSession() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new CustomEvent("arf:shape-result", { detail: null }));
  } catch {}
}

export function buildSessionPayload(ranking, features, source = "photo") {
  return {
    ranking,
    features,
    ratios: features,
    source,
    createdAt: Date.now()
  };
}

export function extractSessionRatios(report) {
  if (!report) return {};
  return {
    faceRatio: report.ratios?.metrics?.find(m => m.label && m.label.includes("length"))?.display || "1.35",
    jawRatio: report.jaw?.metrics?.find(m => m.label && m.label.includes("Jaw"))?.display || "0.75",
    confidence: report.confidence || 85,
    shape: report.shape?.primary?.name || "Oval"
  };
}

export function getSourceLabel(source) {
  if (source === "camera" || source === "live") return "your live camera scan";
  if (source === "manual") return "your manual measurements";
  if (source === "example") return "an example portrait";
  return "your uploaded photo";
}

export {
  getSession as a,
  clearSession as n,
  getSourceLabel as s,
  SESSION_TTL_MS as t,
  saveSession as o,
  buildSessionPayload as r,
  extractSessionRatios as i
};
