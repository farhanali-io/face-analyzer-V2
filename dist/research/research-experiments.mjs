import { analyzeFaceGeometry, buildShapeMatches } from "./geometry-core.mjs";
import { buildLocalOverallAnalysis } from "./local-overall-analysis.mjs";
// A hand-authored numerical fixture. It is not a scanned person or a detected photo.
// Unused landmark positions sit at the centre; this fixture only tests formulas.
export function syntheticLandmarks() {
    const points = Array.from({ length: 478 }, () => ({ x: 0.5, y: 0.5 }));
    const set = (index, x, y) => {
        points[index] = { x, y, z: 0 };
    };
    [
        [10, .5, .12], [152, .5, .86], [234, .22, .48], [454, .78, .48],
        [54, .30, .25], [284, .70, .25], [172, .30, .70], [397, .70, .70],
        [33, .27, .40], [133, .43, .40], [362, .57, .40], [263, .73, .40],
        [160, .32, .38], [158, .38, .38], [153, .38, .42], [144, .32, .42],
        [385, .62, .38], [387, .68, .38], [373, .68, .42], [380, .62, .42],
        [159, .35, .38], [145, .35, .42], [386, .65, .38], [374, .65, .42],
        [70, .30, .32], [300, .70, .32], [105, .40, .31], [334, .60, .31],
        [107, .42, .34], [336, .58, .34], [98, .45, .58], [327, .55, .58],
        [49, .44, .55], [279, .56, .55], [1, .5, .54], [2, .5, .62],
        [61, .41, .69], [291, .59, .69], [40, .43, .67], [270, .57, .67],
        [91, .44, .71], [321, .56, .71], [13, .5, .66], [14, .5, .72],
        [136, .33, .72], [365, .67, .72], [168, .5, .36],
        [0, .5, .64], [17, .5, .745], [9, .5, .30], [6, .5, .46],
        [199, .5, .82], [200, .5, .78]
    ].forEach(([index, x, y]) => set(index, x, y));
    return points;
}
export const RESEARCH_VERSION = "ARF calculation experiments 1.0";
export const RESEARCH_DATE = "2026-09-08";
export const labPhoto = { width: 900, height: 900, brightness: 54, contrast: 72, sharpness: 78 };
/** Ideal pinhole projection: two width segments at different distances. */
export function cameraProjection(distanceCm, focalLengthMm = 50) {
    if (!Number.isFinite(distanceCm) || distanceCm < 10 || !Number.isFinite(focalLengthMm) || focalLengthMm <= 0)
        throw new Error("Invalid projection parameters");
    const nearWidthCm = 3.6;
    const farWidthCm = 14;
    const depthCm = 6;
    const nearImageMm = focalLengthMm * nearWidthCm / distanceCm;
    const farImageMm = focalLengthMm * farWidthCm / (distanceCm + depthCm);
    return {
        distanceCm, focalLengthMm,
        projectedRatio: Number((nearImageMm / farImageMm).toFixed(4)),
        relativeEnlargement: Number(((distanceCm + depthCm) / distanceCm * 100 - 100).toFixed(2))
    };
}
export function runDistanceExperiment() {
    return [30, 50, 100, 150, 200].map((distance) => cameraProjection(distance));
}
export function runLightingExperiment() {
    const points = syntheticLandmarks();
    return [15, 25, 35, 45, 55, 65, 75, 85, 95].map((brightness) => {
        const report = analyzeFaceGeometry(points, { ...labPhoto, brightness });
        const overall = buildLocalOverallAnalysis(report);
        return { brightness, symmetry: report.symmetry.score, geometry: report.split.faceGeometry, presentation: report.quality.score, overall: overall.overallScore };
    });
}
export function runRepeatabilityExperiment() {
    return [-12, -6, 0, 6, 12].flatMap((roll) => [0, .004, .008, .012, .016, .020].map((jawShift) => {
        const points = syntheticLandmarks();
        points[172] = { ...points[172], x: points[172].x - jawShift };
        const angle = roll * Math.PI / 180;
        const rotated = points.map((p) => ({ x: .5 + (p.x - .5) * Math.cos(angle) - (p.y - .5) * Math.sin(angle), y: .5 + (p.x - .5) * Math.sin(angle) + (p.y - .5) * Math.cos(angle), z: p.z }));
        const report = analyzeFaceGeometry(rotated, labPhoto);
        return { roll, jawShiftPixels: Number((jawShift * labPhoto.width).toFixed(1)), symmetry: report.symmetry.score, geometry: report.split.faceGeometry, presentation: report.quality.score, overall: buildLocalOverallAnalysis(report).overallScore };
    }));
}
export function runShapeExperiment() {
    return [132, 136, 140, 144, 148, 152, 156, 160].map((jawAngle) => {
        const ranking = buildShapeMatches({ lengthRatio: 1.26, foreheadRatio: .89, jawRatio: .91, gonialAngle: jawAngle, chinAngle: 116 });
        return { jawAngle, primary: ranking[0].name, primaryShare: ranking[0].score, alternate: ranking[1].name, alternateShare: ranking[1].score };
    });
}
export function runGoldenExperiment() {
    return [.7, .85, 1, 1.15, 1.3].map((mouthScale) => {
        const points = syntheticLandmarks();
        for (const index of [61, 291])
            points[index] = { ...points[index], x: .5 + (points[index].x - .5) * mouthScale };
        const report = analyzeFaceGeometry(points, labPhoto);
        return { mouthScale, mouthNose: Number(report.golden.metrics[1].value.toFixed(3)), mouthNoseScore: report.golden.metrics[1].score, cheekMouth: Number(report.golden.metrics[3].value.toFixed(3)), cheekMouthScore: report.golden.metrics[3].score, goldenScore: report.golden.score };
    });
}
export function allExperiments() {
    return {
        version: RESEARCH_VERSION,
        date: RESEARCH_DATE,
        engine: "ARF Local Geometry v3.0",
        scope: "Computational sensitivity tests using synthetic coordinates and chosen signals. No photographs, no participants and no landmark-model inference. Not a population or accuracy study.",
        assumptions: { photo: labPhoto, projection: { nearWidthCm: 3.6, farWidthCm: 14, depthCm: 6, focalLengthMm: 50 } },
        distance: runDistanceExperiment(), lighting: runLightingExperiment(), repeatability: runRepeatabilityExperiment(), shape: runShapeExperiment(), golden: runGoldenExperiment()
    };
}
