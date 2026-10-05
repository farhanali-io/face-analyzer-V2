export function isHeic(file) {
  if (!file) return false;
  const name = file.name || '';
  const type = file.type || '';
  return /\.(heic|heif)$/i.test(name) || /image\/hei/i.test(type);
}

export function safeGetDimensions(source) {
  if (!source) return { width: 640, height: 480 };
  if (source.dimensions) {
    return {
      width: source.dimensions.width || 640,
      height: source.dimensions.height || 480
    };
  }
  if (source.naturalWidth && source.naturalHeight) {
    return { width: source.naturalWidth, height: source.naturalHeight };
  }
  if (source.width && source.height) {
    return { width: source.width, height: source.height };
  }
  return { width: 640, height: 480 };
}

export async function loadImageWithTimeout(file, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    let timedOut = false;
    
    const timer = setTimeout(() => {
      timedOut = true;
      try { URL.revokeObjectURL(url); } catch (_) {}
      reject(new Error("Image load timeout - file may be corrupted"));
    }, timeoutMs);

    img.onload = () => {
      if (timedOut) return;
      clearTimeout(timer);
      if (!img.complete || img.naturalWidth === 0 || img.naturalHeight === 0) {
        try { URL.revokeObjectURL(url); } catch (_) {}
        reject(new Error("Invalid image - no dimensions"));
        return;
      }
      if (img.naturalWidth < 50 || img.naturalHeight < 50) {
        try { URL.revokeObjectURL(url); } catch (_) {}
        reject(new Error("Image too small - minimum 100x100px"));
        return;
      }
      resolve({ img, url, width: img.naturalWidth, height: img.naturalHeight });
    };

    img.onerror = () => {
      clearTimeout(timer);
      try { URL.revokeObjectURL(url); } catch (_) {}
      reject(new Error("Failed to load image - file may be corrupted or unsupported"));
    };

    img.src = url;
  });
}

export async function prepareImage(file, options = {}) {
  // GUARD 1 - File validation BEFORE load
  const MAX_SIZE = 8 * 1024 * 1024;
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'image/jpg'];
  const ALLOWED_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'];

  if (!file || file.size === 0) {
    throw new Error("Empty file");
  }
  if (file.size > MAX_SIZE) {
    throw new Error(`File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max 8MB`);
  }
  if (file.size < 1024) {
    throw new Error("File too small or corrupted");
  }

  const fileType = (file.type || '').toLowerCase();
  const fileName = (file.name || '').toLowerCase();
  const hasAllowedType = ALLOWED_TYPES.some(t => fileType.includes(t.replace('image/', '')));
  const hasAllowedExt = ALLOWED_EXTS.some(ext => fileName.endsWith(ext));

  if (fileType && !hasAllowedType && !hasAllowedExt) {
    throw new Error("Unsupported image format. Please use JPG, PNG, WebP or HEIC.");
  }

  if (options.onStatus) {
    try {
      options.onStatus();
    } catch (_) {}
  }

  // GUARD 3 - HEIC/HEIF conversion with fallback
  let processedFile = file;
  let convertedFromHeic = false;
  if (isHeic(file)) {
    try {
      if (typeof window !== 'undefined' && window.heic2any) {
        const blob = await window.heic2any({ blob: file, toType: 'image/jpeg' });
        processedFile = new File([Array.isArray(blob) ? blob[0] : blob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), { type: 'image/jpeg' });
        convertedFromHeic = true;
      } else {
        try {
          await loadImageWithTimeout(file, 2000);
        } catch (_) {
          throw new Error("HEIC conversion failed - please convert to JPG first");
        }
      }
    } catch (e) {
      throw new Error(e.message && e.message.includes("HEIC") ? e.message : "HEIC conversion failed - please convert to JPG first");
    }
  }

  // GUARD 2 & GUARD 4 - Safe image loading with timeout and cleanup
  try {
    const { img, url, width, height } = await loadImageWithTimeout(processedFile);
    return {
      file: processedFile,
      originalFile: file,
      convertedFromHeic,
      image: img,
      objectUrl: url,
      dimensions: { width, height },
      revoke: () => {
        try { URL.revokeObjectURL(url); } catch (_) {}
      }
    };
  } catch (err) {
    throw new Error(err.message || "Failed to prepare image");
  }
}

export function revokeImageOrRound(arg, digits = 1) {
  if (arg && typeof arg === 'object') {
    if (typeof arg.revoke === 'function') {
      try { arg.revoke(); } catch (_) {}
    }
    if (arg.objectUrl && typeof arg.objectUrl === 'string') {
      try { URL.revokeObjectURL(arg.objectUrl); } catch (_) {}
    }
    if (arg.src && typeof arg.src === 'string' && arg.src.startsWith('blob:')) {
      try { URL.revokeObjectURL(arg.src); } catch (_) {}
    }
    return;
  }
  if (typeof arg === 'number') {
    const factor = 10 ** digits;
    return Math.round(arg * factor) / factor;
  }
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
  if (!ctx || !ctx.beginPath) return;
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
  if (!ctx || !points || points.length < 2 || !ctx.beginPath) return;
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

export function getImageDimensionsOrPath(arg1, arg2, arg3 = '#f4b783', arg4 = 2, arg5 = false) {
  if (arg1 && (arg1 instanceof HTMLImageElement || arg1 instanceof HTMLCanvasElement || arg1.naturalWidth !== undefined || arg1.width !== undefined || typeof arg1.src === 'string')) {
    return safeGetDimensions(arg1);
  }
  return drawLandmarksPath(arg1, arg2, arg3, arg4, arg5);
}

export function drawPoint(ctx, x, y, radius = 3, color = '#ce2c72') {
  if (!ctx || !ctx.beginPath) return;
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function copyImageToCanvas(canvas, img) {
  if (!canvas || !img) return;
  const dims = safeGetDimensions(img);
  canvas.width = dims.width;
  canvas.height = dims.height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(img, 0, 0, dims.width, dims.height);
  }
}

export function fitCanvasOrDrawLine(arg1, arg2, arg3, arg4, arg5) {
  if (arg1 && arg2 && (arg1.getContext || arg1.tagName === 'CANVAS') && (arg2.getContext || arg2.tagName === 'CANVAS' || arg2.tagName === 'IMG' || arg2.naturalWidth !== undefined || arg2.width !== undefined)) {
    const target = arg1;
    const source = arg2;
    const dims = safeGetDimensions(source);
    target.width = dims.width;
    target.height = dims.height;
    const ctx = target.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, dims.width, dims.height);
      ctx.drawImage(source, 0, 0, dims.width, dims.height);
    }
    return;
  }
  return drawLine(arg1, arg2, arg3, arg4, arg5);
}

export function round(val, digits = 1) {
  const factor = 10 ** digits;
  return Math.round(val * factor) / factor;
}

export {
  isHeic as a,
  prepareImage as s,
  prepareImage as o,
  revokeImageOrRound as c,
  getImageDimensionsOrPath as i,
  drawPoint as l,
  copyImageToCanvas as n,
  escapeHtml as r,
  fitCanvasOrDrawLine as t
};
