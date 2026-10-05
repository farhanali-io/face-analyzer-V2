export function safeGetDimensions(source) {
  if (!source) return { width: 640, height: 480 };
  if (source.dimensions) return { width: source.dimensions.width || 640, height: source.dimensions.height || 480 };
  if (source.naturalWidth && source.naturalHeight) return { width: source.naturalWidth, height: source.naturalHeight };
  if (source.width && source.height) return { width: source.width, height: source.height };
  return { width: 640, height: 480 };
}

export function extractPhotoSignals(canvas) {
  const dims = safeGetDimensions(canvas);
  const w = dims.width;
  const h = dims.height;
  const sampleW = 160;
  const sampleH = Math.max(80, Math.round(160 * h / (w || 1)));
  
  const offscreen = document.createElement('canvas');
  offscreen.width = sampleW;
  offscreen.height = sampleH;
  const ctx = offscreen.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    return { brightness: 55, contrast: 45, sharpness: 80, width: w, height: h };
  }
  try {
    ctx.drawImage(canvas, 0, 0, sampleW, sampleH);
  } catch (_) {
    return { brightness: 55, contrast: 45, sharpness: 80, width: w, height: h };
  }
  const data = ctx.getImageData(0, 0, sampleW, sampleH).data;
  const luma = new Float32Array(sampleW * sampleH);
  let totalLuma = 0;
  for (let i = 0, j = 0; i < data.length; i += 4, j++) {
    const l = data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722;
    luma[j] = l;
    totalLuma += l;
  }
  const meanLuma = totalLuma / luma.length;
  let variance = 0;
  for (let l of luma) {
    const diff = l - meanLuma;
    variance += diff * diff;
  }
  const contrast = Math.sqrt(variance / luma.length);
  
  let lapSum = 0;
  let lapSq = 0;
  let count = 0;
  for (let y = 1; y < sampleH - 1; y++) {
    for (let x = 1; x < sampleW - 1; x++) {
      const idx = y * sampleW + x;
      const lap = luma[idx - sampleW] + luma[idx + sampleW] + luma[idx - 1] + luma[idx + 1] - 4 * luma[idx];
      lapSum += lap;
      lapSq += lap * lap;
      count++;
    }
  }
  const lapMean = lapSum / Math.max(1, count);
  const lapVar = (lapSq / Math.max(1, count)) - lapMean * lapMean;
  const sharpness = Math.max(0, lapVar);

  return {
    brightness: Math.round(meanLuma),
    contrast: Math.round(contrast),
    sharpness: Math.round(sharpness),
    width: w,
    height: h
  };
}

export { extractPhotoSignals as t };
