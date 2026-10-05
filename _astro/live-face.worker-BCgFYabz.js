import { extractShapeFeatures } from "../research/geometry-core.mjs?v=2.0.1";
import { landmarkFrameGate } from "../research/live-shape-core.mjs?v=2.0.1";
import { detectFaceLandmarks, prepareFaceLandmarker } from "./face-landmarker.Oxpj_t18.js?v=2.0.1";

self.onmessage = async (event) => {
  const data = event.data;
  if (!data) return;

  if (data.type === "prepare") {
    try {
      await prepareFaceLandmarker();
      self.postMessage({ type: "ready" });
    } catch {
      self.postMessage({ type: "ready" });
    }
    return;
  }

  if (data.type === "frame") {
    const bitmap = data.bitmap;
    const timestamp = data.timestamp;
    try {
      const width = bitmap?.width || 640;
      const height = bitmap?.height || 480;
      let canvas = bitmap;
      if (typeof OffscreenCanvas !== "undefined" && bitmap) {
        const offscreen = new OffscreenCanvas(width, height);
        const ctx = offscreen.getContext("2d");
        if (ctx) {
          ctx.drawImage(bitmap, 0, 0);
          canvas = offscreen;
        }
      }
      const detected = await detectFaceLandmarks(canvas);
      if (bitmap?.close) bitmap.close();

      if (!detected?.faces || detected.faces.length === 0) {
        self.postMessage({
          type: "assessment",
          assessment: { timestamp, rejection: "no_face" }
        });
        return;
      }
      if (detected.faces.length > 1) {
        self.postMessage({
          type: "assessment",
          assessment: { timestamp, rejection: "multiple_faces" }
        });
        return;
      }

      const landmarks = detected.faces[0];
      const rejection = landmarkFrameGate(landmarks, width, height);
      if (rejection) {
        self.postMessage({
          type: "assessment",
          assessment: { timestamp, rejection }
        });
        return;
      }

      const scaled = landmarks.map((pt) => ({
        x: pt.x * width,
        y: pt.y * height,
        z: pt.z ?? 0
      }));
      const features = extractShapeFeatures(scaled);
      self.postMessage({
        type: "assessment",
        assessment: { timestamp, features, rejection: null }
      });
    } catch {
      if (bitmap?.close) {
        try { bitmap.close(); } catch {}
      }
      self.postMessage({
        type: "assessment",
        assessment: { timestamp, rejection: "invalid" }
      });
    }
  }
};
