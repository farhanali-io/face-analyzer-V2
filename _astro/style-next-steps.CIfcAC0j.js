export function updateStyleNextSteps(search = window.location.search) {
  try {
    const params = new URLSearchParams(search);
    const style = params.get('style');
    if (!style) return;
    document.querySelectorAll('[data-next-tool]').forEach(el => {
      const nextTool = el.dataset.nextTool;
      if (nextTool === 'face-shape-detector' || nextTool === 'hairstyle-finder') {
        const href = el.getAttribute('href');
        if (href && !href.includes('style=')) {
          el.setAttribute('href', `${href}${href.includes('?') ? '&' : '?'}style=${encodeURIComponent(style)}`);
        }
      }
    });
  } catch {}
}

export { updateStyleNextSteps as t };
