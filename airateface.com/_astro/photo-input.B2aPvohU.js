export function isHeic(file) {
  if (!file) return false;
  const name = file.name || '';
  const type = file.type || '';
  return /\.(heic|heif)$/i.test(name) || /image\/hei/i.test(type);
}

export async function prepareImage(file, options = {}) {
  const maxBytes = options.maxBytes || 8 * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error(`The image file is too large (${Math.round(file.size / 1024 / 1024)} MB). Maximum size is 8 MB.`);
  }
  if (options.onStatus) {
    options.onStatus();
  }
  return {
    file,
    convertedFromHeic: false
  };
}

export function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function drawLine(ctx, x1, y1, x2, y2, color = '#f4b783', width = 2) {
  if (!ctx) return;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

export function drawLandmarksPath(ctx, points, color = '#f4b783', width = 2, close = false) {
  if (!ctx || !points || points.length < 2) return;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(points[0].x ?? points[0][0], points[0].y ?? points[0][1]);
  for (let i = 1; i < points.length; i++) {
    const pt = points[i];
    ctx.lineTo(pt.x ?? pt[0], pt.y ?? pt[1]);
  }
  if (close) ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

export function drawPoint(ctx, x, y, radius = 3, color = '#ce2c72') {
  if (!ctx) return;
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function round(val, digits = 1) {
  const factor = 10 ** digits;
  return Math.round(val * factor) / factor;
}

export {
  isHeic as a,
  prepareImage as s,
  prepareImage as o,
  round as c,
  drawLandmarksPath as i,
  drawPoint as l,
  drawPoint as n,
  escapeHtml as r,
  drawLine as t
};
