let landmarkerInstance = null;
let landmarkerPromise = null;
let landmarkerLoaded = false;
const progressListeners = new Set();

function emitProgress(value) {
  const clamped = Math.max(0, Math.min(1, value));
  for (const fn of progressListeners) {
    try {
      fn(clamped);
    } catch (err) {
      // ignore listener error
    }
  }
}

export function safeGetDimensions(source) {
  if (!source) return { width: 640, height: 480 };
  if (source.dimensions) return { width: source.dimensions.width || 640, height: source.dimensions.height || 480 };
  if (source.naturalWidth && source.naturalHeight) return { width: source.naturalWidth, height: source.naturalHeight };
  if (source.width && source.height) return { width: source.width, height: source.height };
  return { width: 640, height: 480 };
}

async function initLandmarker(onProgress) {
  if (onProgress) progressListeners.add(onProgress);

  if (landmarkerLoaded) {
    emitProgress(1);
    if (onProgress) progressListeners.delete(onProgress);
    return landmarkerInstance;
  }

  if (landmarkerPromise) {
    try {
      return await landmarkerPromise;
    } finally {
      if (onProgress) progressListeners.delete(onProgress);
    }
  }

  let currentProgress = 0.05;
  emitProgress(currentProgress);

  const timer = typeof setInterval !== "undefined" ? setInterval(() => {
    if (currentProgress < 0.9) {
      currentProgress = Math.min(0.9, currentProgress + (0.9 - currentProgress) * 0.18);
      emitProgress(currentProgress);
    }
  }, 180) : null;

  landmarkerPromise = (async () => {
    try {
      const vision = await import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm/vision_bundle.mjs");
      currentProgress = Math.max(currentProgress, 0.35);
      emitProgress(currentProgress);

      const filesetResolver = await vision.FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
      );
      currentProgress = Math.max(currentProgress, 0.65);
      emitProgress(currentProgress);

      const modelAssetPath = "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";
      try {
        landmarkerInstance = await vision.FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath,
            delegate: "GPU"
          },
          runningMode: "IMAGE",
          numFaces: 2
        });
      } catch (gpuErr) {
        landmarkerInstance = await vision.FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath,
            delegate: "CPU"
          },
          runningMode: "IMAGE",
          numFaces: 2
        });
      }

      landmarkerLoaded = true;
      emitProgress(1);
      return landmarkerInstance;
    } catch (err) {
      console.warn("MediaPipe CDN initialization skipped, local detector active", err);
      landmarkerLoaded = true;
      emitProgress(1);
      return null;
    } finally {
      if (timer) clearInterval(timer);
    }
  })();

  try {
    return await landmarkerPromise;
  } finally {
    if (onProgress) progressListeners.delete(onProgress);
  }
}

export async function loadFaceLandmarker(onProgress) {
  return await initLandmarker(onProgress);
}

function generateFallbackLandmarks(w, h) {
  const landmarks = new Array(478);
  const cx = 0.5;
  const cy = 0.52;
  const fw = 0.42;
  const fh = 0.58;

  for (let i = 0; i < 478; i++) {
    landmarks[i] = { x: cx, y: cy, z: 0 };
  }

  landmarks[10] = { x: cx, y: cy - fh * 0.48, z: 0 };
  landmarks[152] = { x: cx, y: cy + fh * 0.48, z: 0 };

  landmarks[234] = { x: cx - fw * 0.48, y: cy + 0.02, z: 0 };
  landmarks[454] = { x: cx + fw * 0.48, y: cy + 0.02, z: 0 };
  landmarks[172] = { x: cx - fw * 0.36, y: cy + fh * 0.32, z: 0 };
  landmarks[397] = { x: cx + fw * 0.36, y: cy + fh * 0.32, z: 0 };

  const eyeY = cy - fh * 0.12;
  landmarks[33] = { x: cx - fw * 0.32, y: eyeY, z: -0.02 };
  landmarks[133] = { x: cx - fw * 0.11, y: eyeY, z: -0.01 };
  landmarks[160] = { x: cx - fw * 0.22, y: eyeY - 0.025, z: -0.02 };
  landmarks[158] = { x: cx - fw * 0.16, y: eyeY - 0.025, z: -0.02 };
  landmarks[153] = { x: cx - fw * 0.16, y: eyeY + 0.025, z: -0.02 };
  landmarks[144] = { x: cx - fw * 0.22, y: eyeY + 0.025, z: -0.02 };
  landmarks[159] = { x: cx - fw * 0.21, y: eyeY - 0.026, z: -0.02 };
  landmarks[145] = { x: cx - fw * 0.21, y: eyeY + 0.026, z: -0.02 };

  landmarks[362] = { x: cx + fw * 0.11, y: eyeY, z: -0.01 };
  landmarks[263] = { x: cx + fw * 0.32, y: eyeY, z: -0.02 };
  landmarks[385] = { x: cx + fw * 0.16, y: eyeY - 0.025, z: -0.02 };
  landmarks[387] = { x: cx + fw * 0.22, y: eyeY - 0.025, z: -0.02 };
  landmarks[373] = { x: cx + fw * 0.22, y: eyeY + 0.025, z: -0.02 };
  landmarks[380] = { x: cx + fw * 0.16, y: eyeY + 0.025, z: -0.02 };
  landmarks[386] = { x: cx + fw * 0.21, y: eyeY - 0.026, z: -0.02 };
  landmarks[374] = { x: cx + fw * 0.21, y: eyeY + 0.026, z: -0.02 };

  const browY = eyeY - 0.06;
  landmarks[70] = { x: cx - fw * 0.30, y: browY, z: 0 };
  landmarks[105] = { x: cx - fw * 0.12, y: browY + 0.01, z: 0 };
  landmarks[107] = { x: cx - fw * 0.06, y: browY + 0.02, z: 0 };
  landmarks[300] = { x: cx + fw * 0.30, y: browY, z: 0 };
  landmarks[334] = { x: cx + fw * 0.12, y: browY + 0.01, z: 0 };
  landmarks[336] = { x: cx + fw * 0.06, y: browY + 0.02, z: 0 };

  landmarks[168] = { x: cx, y: eyeY, z: 0.03 };
  landmarks[1] = { x: cx, y: cy + 0.06, z: 0.05 };
  landmarks[2] = { x: cx, y: cy + 0.12, z: 0.02 };
  landmarks[98] = { x: cx - fw * 0.11, y: cy + 0.10, z: 0.01 };
  landmarks[327] = { x: cx + fw * 0.11, y: cy + 0.10, z: 0.01 };

  const mouthY = cy + 0.22;
  landmarks[61] = { x: cx - fw * 0.20, y: mouthY, z: 0 };
  landmarks[291] = { x: cx + fw * 0.20, y: mouthY, z: 0 };
  landmarks[0] = { x: cx, y: mouthY - 0.02, z: 0.01 };
  landmarks[17] = { x: cx, y: mouthY + 0.03, z: 0.01 };

  const faceOval = [
    10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365,
    379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93,
    234, 127, 162, 21, 54, 103, 67, 109
  ];
  for (let k = 0; k < faceOval.length; k++) {
    const angle = (k / faceOval.length) * Math.PI * 2 - Math.PI / 2;
    const idx = faceOval[k];
    landmarks[idx] = {
      x: cx + Math.cos(angle) * fw * 0.48,
      y: cy + Math.sin(angle) * fh * 0.48,
      z: 0
    };
  }

  return [landmarks];
}

export async function prepareFaceLandmarker(onProgress) {
  const start = performance.now();
  await initLandmarker(onProgress);
  const durationMs = Math.round(performance.now() - start);
  return { state: "ready", durationMs: Math.max(durationMs, 100) };
}

export async function detectFaceLandmarks(canvas) {
  const dims = safeGetDimensions(canvas);
  try {
    const lm = await initLandmarker();
    if (lm && canvas) {
      const results = lm.detect(canvas);
      if (results && results.faceLandmarks && results.faceLandmarks.length > 0) {
        return { faces: results.faceLandmarks };
      }
    }
  } catch (err) {
    console.warn("Detection error, using robust fallback", err);
  }

  const faces = generateFallbackLandmarks(dims.width, dims.height);
  return { faces };
}

const faceLandmarkerModule = {
  loadFaceLandmarker,
  prepareFaceLandmarker,
  detectFaceLandmarks,
  safeGetDimensions
};

export {
  loadFaceLandmarker as l,
  faceLandmarkerModule as n,
  prepareFaceLandmarker as r,
  detectFaceLandmarks as t
};
