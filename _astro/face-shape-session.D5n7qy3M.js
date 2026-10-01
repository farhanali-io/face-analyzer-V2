const SESSION_KEY = "arf_face_shape_session";

export function getSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession(session) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    window.dispatchEvent(new CustomEvent("arf_session_updated", { detail: session }));
  } catch {}
}

export function clearSession() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new CustomEvent("arf_session_updated", { detail: null }));
  } catch {}
}

export function buildSessionPayload(ranking, ratios, source = "photo") {
  return {
    ranking,
    ratios,
    source,
    timestamp: Date.now()
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
  if (source === "example") return "an example portrait";
  return "your uploaded photo";
}

export function onSessionChange(callback) {
  window.addEventListener("arf_session_updated", (e) => callback(e.detail));
}

export {
  getSession as a,
  clearSession as n,
  getSourceLabel as s,
  onSessionChange as t,
  saveSession as o,
  buildSessionPayload as r,
  extractSessionRatios as i
};
