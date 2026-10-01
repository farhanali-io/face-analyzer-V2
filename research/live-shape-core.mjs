import { buildShapeMatches } from "./geometry-core.mjs";
export const LIVE_SCAN_VERSION = "arf-live-beta-1";
export const LIVE_MIN_FRAMES = 30;
export const LIVE_TARGET_FRAMES = 50;
export const LIVE_MIN_DURATION_MS = 1800;
export const LIVE_MAX_DURATION_MS = 10000;
export const FEATURE_KEYS = ["lengthRatio", "foreheadRatio", "jawRatio", "gonialAngle", "chinAngle"];
export const VARIATION_SCALES = { lengthRatio: 0.025, foreheadRatio: 0.025, jawRatio: 0.025, gonialAngle: 3, chinAngle: 3 };
export function quantile(values, p) {
    if (!values.length)
        throw new Error("At least one value is required.");
    const sorted = [...values].sort((a, b) => a - b);
    const position = (sorted.length - 1) * p;
    const lower = Math.floor(position), upper = Math.ceil(position);
    return sorted[lower] + (sorted[upper] - sorted[lower]) * (position - lower);
}
export function validLiveFeatures(features) {
    return FEATURE_KEYS.every((key) => Number.isFinite(features[key]) && features[key] > 0 && features[key] < (key.endsWith("Angle") ? 180 : 5));
}
export function aggregateFeatures(frames, method = "median") {
    if (!frames.length || frames.some((frame) => !validLiveFeatures(frame.features)))
        throw new Error("Valid frame features are required.");
    return Object.fromEntries(FEATURE_KEYS.map((key) => {
        const values = frames.map((frame) => frame.features[key]).sort((a, b) => a - b);
        const trim = Math.floor(values.length * 0.1);
        const kept = values.slice(trim, values.length - trim);
        return [key, method === "median" ? quantile(values, 0.5) : kept.reduce((sum, value) => sum + value, 0) / kept.length];
    }));
}
export function summarizeScan(frames) {
    if (frames.length < LIVE_MIN_FRAMES)
        throw new Error(`At least ${LIVE_MIN_FRAMES} usable frames are required.`);
    if (frames.some((frame, i) => !Number.isFinite(frame.timestamp) || (i > 0 && frame.timestamp <= frames[i - 1].timestamp)))
        throw new Error("Frame timestamps must increase.");
    if (frames.at(-1).timestamp - frames[0].timestamp < LIVE_MIN_DURATION_MS)
        throw new Error("Collect frames over a longer interval.");
    const features = aggregateFeatures(frames);
    const spread = Object.fromEntries(FEATURE_KEYS.map((key) => [key, quantile(frames.map((f) => f.features[key]), 0.75) - quantile(frames.map((f) => f.features[key]), 0.25)]));
    const maxScaledIqr = Math.max(...FEATURE_KEYS.map((key) => spread[key] / VARIATION_SCALES[key]));
    return {
        features, ranking: buildShapeMatches(features), spread,
        variation: maxScaledIqr <= 1 ? "Low" : maxScaledIqr <= 2 ? "Moderate" : "High",
        usableFrames: frames.length,
        durationMs: frames.at(-1).timestamp - frames[0].timestamp
    };
}
export function landmarkFrameGate(landmarks, width, height, matrix, expressions = {}) {
    if (landmarks.length < 468 || landmarks.some((p) => !Number.isFinite(p.x) || !Number.isFinite(p.y)))
        return "invalid";
    const left = landmarks[234], right = landmarks[454], top = landmarks[10], chin = landmarks[152];
    if (left.x < 0.03 || right.x > 0.97 || top.y < 0.03 || chin.y > 0.97 || chin.y - top.y < 0.3 || (right.x - left.x) * width < 120)
        return "framing";
    const dx = (landmarks[263].x - landmarks[33].x) * width;
    const dy = (landmarks[263].y - landmarks[33].y) * height;
    const roll = Math.atan2(dy, dx) * 180 / Math.PI;
    const eyeMidX = (landmarks[33].x + landmarks[263].x) / 2;
    const yawProxy = Math.abs(landmarks[1].x - eyeMidX) / Math.max(0.01, right.x - left.x);
    if (Math.abs(roll) > 10 || yawProxy > 0.12)
        return "pose";
    if (matrix?.length === 16) {
        const pitch = Math.atan2(matrix[9], matrix[10]) * 180 / Math.PI;
        const yaw = Math.atan2(-matrix[8], Math.hypot(matrix[0], matrix[4])) * 180 / Math.PI;
        if (!Number.isFinite(pitch) || !Number.isFinite(yaw) || Math.abs(pitch) > 18 || Math.abs(yaw) > 18)
            return "pose";
    }
    if ((expressions.eyeBlinkLeft ?? 0) > 0.65 || (expressions.eyeBlinkRight ?? 0) > 0.65 || (expressions.jawOpen ?? 0) > 0.3 || (expressions.mouthSmileLeft ?? 0) > 0.6 || (expressions.mouthSmileRight ?? 0) > 0.6)
        return "expression";
    return null;
}
/** A local research export. It contains measurements only after an explicit download. */
export function scanExport(frames, evaluatedFrames, rejections, startupMs) {
    const start = frames[0]?.timestamp ?? 0;
    return {
        version: LIVE_SCAN_VERSION,
        method: "Median of five features over accepted frames; 10% trimmed mean provided for comparison.",
        limitation: "Within-scan variability only. Consecutive video frames are correlated; no accuracy or population claim.",
        modelVersion: "mediapipe-0.10.35-float16-v1",
        classifierVersion: "arf-five-features-v1",
        evaluatedFrames, rejectedFrames: { ...rejections }, startupMs: Math.round(startupMs),
        summary: summarizeScan(frames), trimmedMean: aggregateFeatures(frames, "trimmed_mean"),
        frames: frames.map((frame) => ({ elapsedMs: Math.round(frame.timestamp - start), ...frame.features }))
    };
}
