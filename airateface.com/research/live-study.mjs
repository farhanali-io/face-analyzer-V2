import { aggregateFeatures, FEATURE_KEYS, LIVE_SCAN_VERSION, LIVE_MIN_FRAMES, quantile, summarizeScan, validLiveFeatures } from "./live-shape-core.mjs";
import { buildShapeMatches } from "./geometry-core.mjs";
export function readScanExport(value) {
    if (!value || typeof value !== "object")
        throw new Error("Choose a live-scan JSON download.");
    const record = value;
    if (record.version !== LIVE_SCAN_VERSION || record.modelVersion !== "mediapipe-0.10.35-float16-v1" || record.classifierVersion !== "arf-five-features-v1" || !Array.isArray(record.frames) || record.frames.length < LIVE_MIN_FRAMES || record.frames.length > 100)
        throw new Error("This file uses an unsupported scan version or frame count.");
    const frames = record.frames.map((row) => {
        if (!row || typeof row !== "object")
            throw new Error("Invalid measurement row.");
        const input = row;
        const features = { lengthRatio: input.lengthRatio, foreheadRatio: input.foreheadRatio, jawRatio: input.jawRatio, gonialAngle: input.gonialAngle, chinAngle: input.chinAngle };
        if (!validLiveFeatures(features) || !Number.isFinite(input.elapsedMs) || input.elapsedMs < 0 || input.elapsedMs > 20000)
            throw new Error("Invalid frame measurements or timestamp.");
        return { timestamp: input.elapsedMs, features };
    });
    summarizeScan(frames);
    return frames;
}
export function compareScanExports(inputs) {
    if (inputs.length < 2 || inputs.length > 10)
        throw new Error("Choose between 2 and 10 scans of the same consenting adult under comparable conditions.");
    const scans = inputs.map(readScanExport);
    const medians = scans.map((frames) => aggregateFeatures(frames));
    const trimmed = scans.map((frames) => aggregateFeatures(frames, "trimmed_mean"));
    // Predefined midpoint baseline avoids selecting a particularly poor frame.
    const baselines = scans.map((frames) => frames[Math.floor(frames.length / 2)].features);
    const rows = FEATURE_KEYS.map((feature) => ({
        feature,
        medianRange: Math.max(...medians.map((f) => f[feature])) - Math.min(...medians.map((f) => f[feature])),
        trimmedMeanRange: Math.max(...trimmed.map((f) => f[feature])) - Math.min(...trimmed.map((f) => f[feature])),
        midpointFrameRange: Math.max(...baselines.map((f) => f[feature])) - Math.min(...baselines.map((f) => f[feature])),
        medianOfScanMedians: quantile(medians.map((f) => f[feature]), 0.5)
    }));
    return {
        scans: scans.length,
        method: "Across-scan ranges compared with the midpoint accepted frame from each scan; no identity check and no accuracy estimate.",
        rows,
        results: scans.map((frames, i) => ({ scan: i + 1, usableFrames: frames.length, medianLeadingShape: buildShapeMatches(medians[i])[0].name, trimmedLeadingShape: buildShapeMatches(trimmed[i])[0].name, midpointLeadingShape: buildShapeMatches(baselines[i])[0].name }))
    };
}
