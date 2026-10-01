const clamp = (value, min = 0, max = 100) => Math.min(max, Math.max(min, value));
const findMetric = (metrics, label) => metrics.find((metric) => metric.label === label);
/**
 * Turns the geometry/presentation gap into the plain sentence users actually
 * want: is a low score coming from the face, or from this particular photo?
 */
export function describeScoreSplit(split) {
    const gap = split.gap;
    if (gap >= 10) {
        return {
            headline: `Photo presentation is ${gap} points below the geometry index.`,
            detail: `Face geometry measured ${split.faceGeometry}/100 while photo presentation measured ${split.photoPresentation}/100. These are separate indices. The overall score weights presentation at 20%; this gap is not a deduction from your total.`
        };
    }
    if (gap <= -10) {
        return {
            headline: `Photo presentation is ${Math.abs(gap)} points above the geometry index.`,
            detail: `Photo presentation measured ${split.photoPresentation}/100 against a face-geometry score of ${split.faceGeometry}/100. Lighting, framing and pose are already working in this shot.`
        };
    }
    return {
        headline: "Face geometry and photo presentation are scoring closely.",
        detail: `Face geometry measured ${split.faceGeometry}/100 and photo presentation ${split.photoPresentation}/100, so neither side is dominating this result.`
    };
}
function qualityLabel(score) {
    if (score >= 85)
        return "Excellent";
    if (score >= 70)
        return "Good";
    if (score >= 50)
        return "Fair";
    return "Poor";
}
function scoreSummary(score, shape) {
    if (score >= 85) {
        return `Close alignment across the selected geometry references in this ${shape.toLowerCase()}-leaning photo.`;
    }
    if (score >= 75) {
        return `Generally balanced visible geometry with a ${shape.toLowerCase()}-leaning contour.`;
    }
    if (score >= 60) {
        return `A mixed geometry profile with a ${shape.toLowerCase()}-leaning contour and several measurable variations.`;
    }
    return `Several relationships differ from this tool's selected references; the closest contour match is ${shape}.`;
}
export function buildLocalOverallAnalysis(report) {
    const scores = {
        visibleSymmetry: report.split.symmetry,
        proportionBalance: report.split.proportion,
        featureBalance: report.split.feature,
        photoPresentation: report.split.photoPresentation
    };
    const overallScore = Math.round(scores.visibleSymmetry * 0.3 +
        scores.proportionBalance * 0.25 +
        scores.featureBalance * 0.25 +
        scores.photoPresentation * 0.2);
    const confidence = Math.round(clamp(report.quality.score * 0.78 + report.shape.confidence * 0.22));
    const dimensions = [
        {
            key: "visibleSymmetry",
            value: scores.visibleSymmetry,
            strength: "Visible left-right landmark agreement",
            variation: "Visible left-right geometry"
        },
        {
            key: "proportionBalance",
            value: scores.proportionBalance,
            strength: "Selected facial proportion references",
            variation: "Facial thirds, fifths and ratio references"
        },
        {
            key: "featureBalance",
            value: scores.featureBalance,
            strength: "Visible feature relationships",
            variation: "Eye, mouth, nose and jaw relationships"
        },
        {
            key: "photoPresentation",
            value: scores.photoPresentation,
            strength: "Photo setup and measurement conditions",
            variation: "Lighting, pose, framing or sharpness"
        }
    ].sort((a, b) => b.value - a.value);
    const suggestions = report.quality.notes
        .filter((note) => !note.includes("suitable for a stable"))
        .slice(0, 2);
    const weakest = dimensions.at(-1)?.key;
    const dimensionSuggestion = {
        visibleSymmetry: "Use a neutral expression and keep both sides of the face equally visible for a cleaner comparison.",
        proportionBalance: "Keep the camera at eye level and step back from wide-angle lenses before comparing proportions.",
        featureBalance: "Keep the eyes, mouth and jaw unobstructed so the visible feature relationships can be measured consistently.",
        photoPresentation: "Retake in soft, even front light with the camera steady and close to eye level."
    };
    if (weakest)
        suggestions.push(dimensionSuggestion[weakest]);
    const uniqueSuggestions = [...new Set(suggestions)].slice(0, 3);
    if (uniqueSuggestions.length < 2) {
        uniqueSuggestions.push("Use soft, even front lighting and keep the camera near eye level for a more repeatable result.", "Compare only similarly framed photos; lens distance and expression can move the score.");
    }
    const eyeGap = findMetric(report.ratios.metrics, "Eye gap / eye width")?.display ?? "—";
    const jawRatio = findMetric(report.jaw.metrics, "Jaw / cheek width")?.display ?? "—";
    return {
        status: "ok",
        message: "Analysis completed entirely on this device.",
        overallScore,
        confidence,
        photoQuality: qualityLabel(report.quality.score),
        summary: scoreSummary(overallScore, report.shape.primary.name),
        strength: `${dimensions[0].strength} · ${dimensions[0].value}/100`,
        variation: `${dimensions.at(-1).variation} · ${dimensions.at(-1).value}/100`,
        suggestions: uniqueSuggestions,
        scores,
        split: {
            faceGeometry: report.split.faceGeometry,
            photoPresentation: report.split.photoPresentation,
            gap: report.split.gap,
            ...describeScoreSplit(report.split)
        },
        improvements: report.split.drivers.slice(0, 3),
        faceShape: {
            primary: report.shape.primary.name,
            alternate: report.shape.alternate.name,
            confidence: report.shape.confidence
        },
        style: {
            hairstyles: report.recommendations.hairstyles.slice(0, 3),
            glasses: report.recommendations.glasses.slice(0, 3)
        },
        evidence: [
            {
                label: "Contour match",
                value: report.shape.primary.name,
                note: `Alternate: ${report.shape.alternate.name}`
            },
            {
                label: "Golden references",
                value: `${report.golden.score}/100`,
                note: "Mathematical proximity only"
            },
            {
                label: "Eye spacing",
                value: eyeGap,
                note: `Against average eye width · fifths balance ${report.fifths.score}/100`
            },
            {
                label: "Jaw / cheek width",
                value: jawRatio,
                note: "Visible 2D photo geometry"
            }
        ],
        modelVersion: "ARF Local Geometry v3.0"
    };
}
