import { FEATURED_STYLES } from "./style-navigation.l4Qj8_dI.js?v=2.0.1";

export function updateStyleNextSteps(search = typeof window !== "undefined" ? window.location.search : "") {
  try {
    const params = new URLSearchParams(search);
    const style = params.get("style");
    if (typeof document !== "undefined" && style) {
      document.querySelectorAll("[data-next-tool]").forEach((el) => {
        const nextTool = el.dataset.nextTool;
        if (nextTool === "face-shape-detector" || nextTool === "hairstyle-finder") {
          const href = el.getAttribute("href");
          if (href && !href.includes("style=")) {
            el.setAttribute("href", `${href}${href.includes("?") ? "&" : "?"}style=${encodeURIComponent(style)}`);
          }
        }
      });
    }
    if (style && FEATURED_STYLES.includes(style)) {
      const styleLabel = style
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      return `<div class="mt-4 rounded-2xl border border-coral/25 bg-coral-soft/45 p-4"><p class="text-xs font-bold text-coral-dark">Continue your haircut check</p><a class="mt-1 inline-block text-sm font-bold text-ink underline decoration-coral/40 underline-offset-2" href="/hairstyles/${encodeURIComponent(style)}#your-match">Return to ${styleLabel} guide with this result →</a></div>`;
    }
  } catch {}
  return "";
}

export { updateStyleNextSteps as t };
