const FACE_OVAL = [
    10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365,
    379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93,
    234, 127, 162, 21, 54, 103, 67, 109
];
const LEFT_EYE = [33, 160, 158, 133, 153, 144];
const RIGHT_EYE = [362, 385, 387, 263, 373, 380];
export const OVERLAY_LANDMARKS = {
    faceOval: FACE_OVAL,
    leftEye: LEFT_EYE,
    rightEye: RIGHT_EYE,
    jaw: [234, 172, 152, 397, 454],
    thirds: [10, 105, 334, 2, 152],
    /** The six vertical boundaries the rule of fifths divides the face at. */
    fifths: [234, 33, 133, 362, 263, 454],
    symmetryPairs: [
        [33, 263],
        [133, 362],
        [70, 300],
        [105, 334],
        [98, 327],
        [61, 291],
        [234, 454],
        [172, 397]
    ]
};
const clamp = (value, min = 0, max = 100) => Math.min(max, Math.max(min, value));
const mean = (values) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
const round = (value, digits = 1) => {
    const scale = 10 ** digits;
    return Math.round(value * scale) / scale;
};
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const midpoint = (a, b) => ({
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2
});
const averagePoint = (points) => ({
    x: mean(points.map((point) => point.x)),
    y: mean(points.map((point) => point.y))
});
const angleAt = (a, vertex, c) => {
    const first = Math.atan2(a.y - vertex.y, a.x - vertex.x);
    const second = Math.atan2(c.y - vertex.y, c.x - vertex.x);
    let degrees = Math.abs((first - second) * 180 / Math.PI);
    if (degrees > 180)
        degrees = 360 - degrees;
    return degrees;
};
const closeness = (actual, reference, sensitivity = 95) => clamp(100 - Math.abs(Math.log(actual / reference)) * sensitivity);
const formatRatio = (value) => `${round(value, 2)} : 1`;
const formatPercent = (value) => `${Math.round(value)}%`;
const scoreLabel = (score) => score >= 78 ? "High" : score >= 58 ? "Moderate" : "Low";
export const SHAPE_HAIRSTYLES = {
    Oval: [
        "Most lengths work; preserve the natural outline instead of hiding it.",
        "Try a soft side part or textured layers for movement.",
        "Use fringe only if it suits your hair texture and routine."
    ],
    Round: [
        "Add visual height with volume at the crown.",
        "Try layers that begin below the cheek area.",
        "A side part or off-centre fringe can add diagonal structure."
    ],
    Square: [
        "Soft layers and waves can contrast with a straighter jaw contour.",
        "A side-swept fringe adds a curved line near the forehead.",
        "Keep some movement around the temples and jaw."
    ],
    Oblong: [
        "Add width with waves, curls or layers near the cheek area.",
        "A fringe can visually shorten the upper third.",
        "Avoid excessive crown height if balance is the goal."
    ],
    Heart: [
        "Chin-length texture can add visual width lower on the face.",
        "Side-swept or curtain fringe can soften the forehead line.",
        "Keep crown volume controlled and add movement below the cheekbones."
    ],
    Diamond: [
        "Soft fringe or temple volume can balance a wider cheek contour.",
        "Chin-length layers can add width around the lower face.",
        "Tuck one side to reveal the natural cheekbone line."
    ],
    Triangle: [
        "Volume around the temples can balance a wider lower contour.",
        "Textured upper layers or a side part can draw attention upward.",
        "Keep heavy, one-length volume away from the jaw if balance is the goal."
    ]
};
export const SHAPE_GLASSES = {
    Oval: [
        "Try frames as wide as, or slightly wider than, the cheek contour.",
        "Rectangular, round and softly geometric shapes can all work.",
        "Check bridge fit and pupil alignment before choosing by shape."
    ],
    Round: [
        "Angular or rectangular frames add straighter visual lines.",
        "A slightly upswept outer corner can add definition.",
        "Avoid frames that are much narrower than the cheek contour."
    ],
    Square: [
        "Round, oval or softly curved frames contrast with angular contours.",
        "Thinner rims can keep the frame from feeling visually heavy.",
        "Choose enough width to avoid temple pressure."
    ],
    Oblong: [
        "Taller lenses can add vertical coverage and visual width.",
        "A pronounced brow line can break up facial length.",
        "Avoid very shallow frames if proportional balance is the goal."
    ],
    Heart: [
        "Bottom-emphasised or softly rounded frames can balance the lower face.",
        "Lightweight rims keep the forehead area from feeling crowded.",
        "A low-set temple can reduce emphasis at the upper corners."
    ],
    Diamond: [
        "Oval or brow-accented frames can balance the cheek contour.",
        "Slightly upswept corners can follow the natural diagonal line.",
        "Check that the frame does not press on prominent cheek areas."
    ],
    Triangle: [
        "Brow-accented or cat-eye frames add visual width above.",
        "Choose a frame slightly wider at the top than the bottom.",
        "Comfort and temple width matter more than the shape label."
    ]
};
function shapeRecommendations(shape) {
    return {
        hairstyles: SHAPE_HAIRSTYLES[shape],
        glasses: SHAPE_GLASSES[shape]
    };
}
export const SHAPE_PROFILES = {
    Oval: { lengthRatio: 1.44, foreheadRatio: 0.82, jawRatio: 0.78, gonialAngle: 150, chinAngle: 104 },
    Round: { lengthRatio: 1.22, foreheadRatio: 0.90, jawRatio: 0.89, gonialAngle: 158, chinAngle: 112 },
    Square: { lengthRatio: 1.30, foreheadRatio: 0.88, jawRatio: 0.93, gonialAngle: 136, chinAngle: 120 },
    Oblong: { lengthRatio: 1.64, foreheadRatio: 0.84, jawRatio: 0.80, gonialAngle: 144, chinAngle: 100 },
    Heart: { lengthRatio: 1.42, foreheadRatio: 0.98, jawRatio: 0.70, gonialAngle: 152, chinAngle: 94 },
    Diamond: { lengthRatio: 1.49, foreheadRatio: 0.76, jawRatio: 0.72, gonialAngle: 150, chinAngle: 96 },
    Triangle: { lengthRatio: 1.34, foreheadRatio: 0.76, jawRatio: 0.98, gonialAngle: 139, chinAngle: 116 }
};
/** Hand-set feature scales used to normalize error; not fitted population statistics. */
const SHAPE_SCALES = {
    lengthRatio: 0.42,
    foreheadRatio: 0.26,
    jawRatio: 0.26,
    gonialAngle: 26,
    chinAngle: 24
};
/**
 * The angles are measured from soft tissue and move more with pose than the
 * width ratios do, so they are given less than full weight.
 */
const SHAPE_WEIGHTS = {
    lengthRatio: 1,
    foreheadRatio: 1,
    jawRatio: 1,
    gonialAngle: 0.9,
    chinAngle: 0.8
};
const SHAPE_FEATURE_KEYS = Object.keys(SHAPE_SCALES);
const SHAPE_WEIGHT_TOTAL = SHAPE_FEATURE_KEYS.reduce((total, key) => total + SHAPE_WEIGHTS[key], 0);
/** Softmax temperature: lower makes the distribution more decisive. */
const SHAPE_TEMPERATURE = 0.1;
/**
 * Scores all seven profiles and returns them as normalized similarity shares
 * rather than a truncated linear distance, so the runner-up stays meaningful
 * when a face sits between two categories.
 */
export function buildShapeMatches(features) {
    const errors = Object.entries(SHAPE_PROFILES)
        .map(([name, profile]) => {
        const weighted = SHAPE_FEATURE_KEYS.reduce((total, key) => {
            const deviation = (features[key] - profile[key]) / SHAPE_SCALES[key];
            return total + SHAPE_WEIGHTS[key] * deviation * deviation;
        }, 0);
        return { name, error: Math.sqrt(weighted / SHAPE_WEIGHT_TOTAL) };
    });
    const best = Math.min(...errors.map((item) => item.error));
    const weights = errors.map((item) => ({
        name: item.name,
        // Offset by the best error before exponentiating to keep this stable.
        weight: Math.exp(-(item.error ** 2 - best ** 2) / SHAPE_TEMPERATURE)
    }));
    const total = weights.reduce((sum, item) => sum + item.weight, 0);
    return weights
        .map((item) => ({ name: item.name, score: round(item.weight / total * 100, 0) }))
        .sort((a, b) => b.score - a.score);
}
/** The same pixel-space, rotation-invariant features for photos and video frames. */
export function extractShapeFeatures(landmarks, width, height) {
    if (landmarks.length < 468 || !Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0)
        throw new Error("A complete face and valid image dimensions are required.");
    const p = (i) => ({ x: landmarks[i].x * width, y: landmarks[i].y * height });
    const cheek = Math.max(distance(p(234), p(454)), 1);
    return {
        lengthRatio: distance(p(10), p(152)) / cheek,
        foreheadRatio: distance(p(54), p(284)) / cheek,
        jawRatio: distance(p(172), p(397)) / cheek,
        gonialAngle: mean([angleAt(p(234), p(172), p(152)), angleAt(p(454), p(397), p(152))]),
        chinAngle: angleAt(p(172), p(152), p(397))
    };
}
function harmonyBand(score) {
    if (score >= 82)
        return "Highly balanced";
    if (score >= 70)
        return "Balanced";
    if (score >= 56)
        return "Mixed";
    return "Uneven";
}
function driverImpact(deficit) {
    if (deficit >= 12)
        return "High";
    if (deficit >= 5)
        return "Medium";
    return "Low";
}
/**
 * Ranks the presentation factors by how much each one is costing the photo
 * score, so the highest-impact retake advice can be shown first.
 */
function buildPhotoDrivers(inputs) {
    const candidates = [
        {
            label: "Head angle",
            score: Math.round(inputs.pose),
            weight: 0.24,
            detail: `Eye-line roll ${round(Math.abs(inputs.roll))}° · yaw proxy ${round(inputs.yaw * 100)}%.`,
            action: "Face the camera squarely and keep the eye line level; even a few degrees moves paired landmarks."
        },
        {
            label: "Sharpness",
            score: Math.round(inputs.sharpness),
            weight: 0.22,
            detail: `Local edge detail measured at ${Math.round(inputs.photo.sharpness)}/100.`,
            action: "Brace the camera, tap to focus on the eyes and avoid digital zoom."
        },
        {
            label: "Lighting",
            score: Math.round(inputs.brightness),
            weight: 0.2,
            detail: `Average brightness ${Math.round(inputs.photo.brightness)}/100 against a mid-tone reference of 54.`,
            action: "Use a large, soft, front-facing light source and avoid strong overhead or side shadow."
        },
        {
            label: "Tonal contrast",
            score: Math.round(inputs.contrast),
            weight: 0.16,
            detail: `Tonal separation measured at ${Math.round(inputs.photo.contrast)}/100.`,
            action: "Avoid flat, hazy or heavily filtered captures that compress the tonal range."
        },
        {
            label: "Framing",
            score: Math.round(inputs.coverage),
            weight: 0.1,
            detail: `The face occupies about ${Math.round(inputs.faceCoverage)}% of the frame.`,
            action: "Aim for roughly half the frame, keeping the hairline and chin inside the crop."
        },
        {
            label: "Resolution",
            score: Math.round(inputs.resolution),
            weight: 0.08,
            detail: `Source is ${inputs.photo.width} × ${inputs.photo.height} pixels.`,
            action: "Use the original file rather than a messaging-app copy or a screenshot."
        }
    ];
    return candidates
        .map((candidate) => ({
        label: candidate.label,
        score: candidate.score,
        impact: driverImpact((100 - candidate.score) * candidate.weight),
        detail: candidate.detail,
        action: candidate.action
    }))
        .sort((a, b) => a.score - b.score);
}
export function analyzeFaceGeometry(normalizedLandmarks, photo) {
    if (normalizedLandmarks.length < 468) {
        throw new Error("A complete face landmark set is required.");
    }
    const points = normalizedLandmarks.map((point) => ({
        x: point.x * photo.width,
        y: point.y * photo.height,
        z: point.z
    }));
    const p = (index) => points[index];
    const original = (index) => normalizedLandmarks[index];
    const leftEyeCenter = averagePoint(LEFT_EYE.map((index) => p(index)));
    const rightEyeCenter = averagePoint(RIGHT_EYE.map((index) => p(index)));
    const eyeMidpoint = midpoint(leftEyeCenter, rightEyeCenter);
    const eyeDelta = {
        x: rightEyeCenter.x - leftEyeCenter.x,
        y: rightEyeCenter.y - leftEyeCenter.y
    };
    const eyeDistance = Math.max(Math.hypot(eyeDelta.x, eyeDelta.y), 1);
    const axisX = { x: eyeDelta.x / eyeDistance, y: eyeDelta.y / eyeDistance };
    const axisY = { x: -axisX.y, y: axisX.x };
    const projected = (index) => {
        const relative = {
            x: p(index).x - eyeMidpoint.x,
            y: p(index).y - eyeMidpoint.y
        };
        return {
            x: relative.x * axisX.x + relative.y * axisX.y,
            y: relative.x * axisY.x + relative.y * axisY.y
        };
    };
    const faceWidth = Math.max(distance(p(234), p(454)), 1);
    const faceLength = distance(p(10), p(152));
    const cheekWidth = faceWidth;
    const mouthWidth = distance(p(61), p(291));
    const noseWidth = distance(p(98), p(327));
    const leftEyeWidth = distance(p(33), p(133));
    const rightEyeWidth = distance(p(362), p(263));
    const averageEyeWidth = mean([leftEyeWidth, rightEyeWidth]);
    const eyeGap = distance(p(133), p(362));
    const roll = Math.atan2(eyeDelta.y, eyeDelta.x) * 180 / Math.PI;
    const noseProjected = projected(1);
    const yaw = Math.abs(noseProjected.x) / faceWidth;
    const oval = FACE_OVAL.map((index) => original(index));
    const minX = Math.min(...oval.map((point) => point.x));
    const maxX = Math.max(...oval.map((point) => point.x));
    const minY = Math.min(...oval.map((point) => point.y));
    const maxY = Math.max(...oval.map((point) => point.y));
    const faceCoverage = clamp((maxX - minX) * (maxY - minY) * 240);
    const brightnessScore = clamp(100 - Math.abs(photo.brightness - 54) * 2.25);
    const contrastScore = clamp(photo.contrast * 1.65);
    const sharpnessScore = clamp(photo.sharpness);
    const poseScore = clamp(100 - Math.abs(roll) * 3.5 - yaw * 220);
    const coverageScore = clamp(100 - Math.abs(faceCoverage - 48) * 2.1);
    const resolutionScore = clamp(Math.min(photo.width, photo.height) / 7.2);
    const qualityScore = Math.round(brightnessScore * 0.2 +
        contrastScore * 0.16 +
        sharpnessScore * 0.22 +
        poseScore * 0.24 +
        coverageScore * 0.1 +
        resolutionScore * 0.08);
    const qualityNotes = [];
    if (brightnessScore < 58)
        qualityNotes.push("Use softer, more even front lighting.");
    if (contrastScore < 50)
        qualityNotes.push("The image has limited tonal separation.");
    if (sharpnessScore < 55)
        qualityNotes.push("Hold the camera steady and focus on the eyes.");
    if (Math.abs(roll) > 6)
        qualityNotes.push("Keep the eye line closer to horizontal.");
    if (yaw > 0.09)
        qualityNotes.push("Face the camera more directly.");
    if (faceCoverage < 24)
        qualityNotes.push("Move closer so the face occupies more of the frame.");
    if (faceCoverage > 75)
        qualityNotes.push("Leave a little more space around the head.");
    if (!qualityNotes.length)
        qualityNotes.push("The photo is suitable for a stable geometry estimate.");
    const regionPairs = {
        Eyes: [[33, 263], [133, 362], [159, 386], [145, 374]],
        Brows: [[70, 300], [105, 334], [107, 336]],
        Nose: [[98, 327], [49, 279]],
        Mouth: [[61, 291], [40, 270], [91, 321]],
        Jaw: [[234, 454], [172, 397], [136, 365]]
    };
    const symmetryRegions = Object.entries(regionPairs).map(([label, pairs]) => {
        const residual = mean(pairs.map(([left, right]) => {
            const a = projected(left);
            const b = projected(right);
            return (Math.abs(Math.abs(a.x) - Math.abs(b.x)) + Math.abs(a.y - b.y) * 0.7) / faceWidth;
        }));
        const score = Math.round(clamp(100 - residual * 420));
        return { label, value: score, display: `${score}/100`, score };
    });
    const symmetryScore = Math.round(mean(symmetryRegions.map((metric) => metric.value)));
    const leftJawAngle = angleAt(p(234), p(172), p(152));
    const rightJawAngle = angleAt(p(454), p(397), p(152));
    const gonialAngle = mean([leftJawAngle, rightJawAngle]);
    const chinAngle = angleAt(p(172), p(152), p(397));
    const shapeFeatures = extractShapeFeatures(normalizedLandmarks, photo.width, photo.height);
    const shapeMatches = buildShapeMatches(shapeFeatures);
    // Confidence tracks how far the leading match separates from the runner-up,
    // discounted by photo quality. The multiplier keeps a textbook match near the
    // high 70s rather than pegging at 100, which a 2D soft-tissue estimate cannot
    // support.
    const shapeConfidence = Math.round(clamp(38 + (shapeMatches[0].score - shapeMatches[1].score) * 0.85 - (100 - qualityScore) * 0.22));
    const shapeMetrics = [
        {
            label: "Face length / cheek width",
            value: shapeFeatures.lengthRatio,
            display: formatRatio(shapeFeatures.lengthRatio)
        },
        {
            label: "Forehead / cheek width",
            value: shapeFeatures.foreheadRatio,
            display: formatRatio(shapeFeatures.foreheadRatio)
        },
        {
            label: "Jaw / cheek width",
            value: shapeFeatures.jawRatio,
            display: formatRatio(shapeFeatures.jawRatio)
        },
        {
            label: "Jaw corner angle",
            value: gonialAngle,
            display: `${round(gonialAngle)}°`,
            reference: "Higher is a softer corner; lower is a squarer one"
        },
        {
            label: "Chin taper angle",
            value: chinAngle,
            display: `${round(chinAngle)}°`,
            reference: "Higher is a broader chin; lower is a more pointed one"
        }
    ];
    const phi = (1 + Math.sqrt(5)) / 2;
    const goldenMetrics = [
        {
            label: "Face length / cheek width",
            value: faceLength / cheekWidth,
            display: formatRatio(faceLength / cheekWidth),
            reference: "Reference 1.62 : 1",
            score: Math.round(closeness(faceLength / cheekWidth, phi))
        },
        {
            label: "Mouth width / nose width",
            value: mouthWidth / noseWidth,
            display: formatRatio(mouthWidth / noseWidth),
            reference: "Reference 1.62 : 1",
            score: Math.round(closeness(mouthWidth / noseWidth, phi))
        },
        {
            label: "Eye gap / eye width",
            value: eyeGap / averageEyeWidth,
            display: formatRatio(eyeGap / averageEyeWidth),
            reference: "Classical reference 1.00 : 1",
            score: Math.round(closeness(eyeGap / averageEyeWidth, 1))
        },
        {
            label: "Cheek width / mouth width",
            value: cheekWidth / mouthWidth,
            display: formatRatio(cheekWidth / mouthWidth),
            reference: "Reference 1.62 : 1",
            score: Math.round(closeness(cheekWidth / mouthWidth, phi))
        }
    ];
    const goldenScore = Math.round(mean(goldenMetrics.map((metric) => metric.score ?? 0)));
    const browMid = midpoint(p(105), p(334));
    const top = projected(10).y;
    const browProjection = ((browMid.x - eyeMidpoint.x) * axisY.x +
        (browMid.y - eyeMidpoint.y) * axisY.y);
    const noseBase = projected(2).y;
    const chin = projected(152).y;
    const upperThird = Math.abs(browProjection - top);
    const middleThird = Math.abs(noseBase - browProjection);
    const lowerThird = Math.abs(chin - noseBase);
    const thirdsTotal = Math.max(upperThird + middleThird + lowerThird, 1);
    const thirds = [
        {
            label: "Upper third",
            value: upperThird / thirdsTotal * 100,
            display: formatPercent(upperThird / thirdsTotal * 100),
            reference: "Even-thirds reference ≈ 33%"
        },
        {
            label: "Middle third",
            value: middleThird / thirdsTotal * 100,
            display: formatPercent(middleThird / thirdsTotal * 100),
            reference: "Even-thirds reference ≈ 33%"
        },
        {
            label: "Lower third",
            value: lowerThird / thirdsTotal * 100,
            display: formatPercent(lowerThird / thirdsTotal * 100),
            reference: "Even-thirds reference ≈ 33%"
        }
    ];
    const ratioMetrics = [
        {
            label: "Face width / eye width",
            value: cheekWidth / averageEyeWidth,
            display: formatRatio(cheekWidth / averageEyeWidth),
            reference: "Classical fifths reference ≈ 5 : 1"
        },
        {
            label: "Eye gap / eye width",
            value: eyeGap / averageEyeWidth,
            display: formatRatio(eyeGap / averageEyeWidth),
            reference: "Classical reference ≈ 1 : 1"
        },
        {
            label: "Nose width / face width",
            value: noseWidth / cheekWidth * 100,
            display: formatPercent(noseWidth / cheekWidth * 100)
        },
        {
            label: "Mouth width / face width",
            value: mouthWidth / cheekWidth * 100,
            display: formatPercent(mouthWidth / cheekWidth * 100)
        },
        {
            label: "Facial width-to-height",
            value: cheekWidth / Math.max(Math.abs(projected(0).y - browProjection), 1),
            display: formatRatio(cheekWidth / Math.max(Math.abs(projected(0).y - browProjection), 1)),
            reference: "Brow line to upper lip; definitions vary"
        }
    ];
    const jawRatio = shapeFeatures.jawRatio;
    const jawScore = Math.round(clamp(100 -
        Math.abs(leftJawAngle - rightJawAngle) * 2.7 -
        Math.abs(jawRatio - 0.82) * 72 -
        (100 - symmetryRegions.find((metric) => metric.label === "Jaw").value) * 0.22));
    const jawMetrics = [
        {
            label: "Left contour angle",
            value: leftJawAngle,
            display: `${round(leftJawAngle)}°`
        },
        {
            label: "Right contour angle",
            value: rightJawAngle,
            display: `${round(rightJawAngle)}°`
        },
        {
            label: "Side-to-side difference",
            value: Math.abs(leftJawAngle - rightJawAngle),
            display: `${round(Math.abs(leftJawAngle - rightJawAngle))}°`
        },
        {
            label: "Jaw / cheek width",
            value: jawRatio,
            display: formatRatio(jawRatio)
        },
        {
            label: "Lower-third share",
            value: lowerThird / thirdsTotal * 100,
            display: formatPercent(lowerThird / thirdsTotal * 100)
        }
    ];
    const leftOpening = mean([
        distance(p(159), p(145)),
        distance(p(158), p(153))
    ]);
    const rightOpening = mean([
        distance(p(386), p(374)),
        distance(p(387), p(373))
    ]);
    const averageAspect = mean([
        leftEyeWidth / Math.max(leftOpening, 1),
        rightEyeWidth / Math.max(rightOpening, 1)
    ]);
    const eyeShape = averageAspect < 2.65 ? "Round-like" :
        averageAspect > 3.55 ? "Narrow-like" :
            "Almond-like";
    const leftTilt = Math.atan2(p(133).y - p(33).y, p(133).x - p(33).x) * 180 / Math.PI;
    const rightTilt = Math.atan2(p(362).y - p(263).y, p(263).x - p(362).x) * 180 / Math.PI;
    const averageTilt = mean([leftTilt, rightTilt]);
    const tiltLabel = averageTilt > 2 ? "Positive" :
        averageTilt < -2 ? "Negative" :
            "Neutral";
    const eyeSymmetry = Math.round(clamp(100 -
        Math.abs(leftEyeWidth - rightEyeWidth) / averageEyeWidth * 180 -
        Math.abs(leftOpening - rightOpening) / mean([leftOpening, rightOpening]) * 120 -
        Math.abs(leftTilt - rightTilt) * 1.4));
    const eyeMetrics = [
        {
            label: "Average width / opening",
            value: averageAspect,
            display: formatRatio(averageAspect)
        },
        {
            label: "Left canthal tilt",
            value: leftTilt,
            display: `${leftTilt >= 0 ? "+" : ""}${round(leftTilt)}°`
        },
        {
            label: "Right canthal tilt",
            value: rightTilt,
            display: `${rightTilt >= 0 ? "+" : ""}${round(rightTilt)}°`
        },
        {
            label: "Eye geometry symmetry",
            value: eyeSymmetry,
            display: `${eyeSymmetry}/100`,
            score: eyeSymmetry
        }
    ];
    // Midface ratio: eye-line to upper-lip height measured against the interpupillary
    // distance. Definitions vary between sources, so the page states this one explicitly.
    const upperLip = projected(0);
    const midfaceHeight = Math.abs(upperLip.y);
    const midfaceRatio = midfaceHeight / Math.max(eyeDistance, 1);
    const midfaceScore = Math.round(closeness(midfaceRatio, 1, 110));
    const midfaceLabel = midfaceRatio < 0.95 ? "Compact" :
        midfaceRatio > 1.05 ? "Elongated" :
            "Balanced";
    const midfaceMetrics = [
        {
            label: "Midface ratio",
            value: midfaceRatio,
            display: formatRatio(midfaceRatio),
            reference: "Commonly cited reference ≈ 1.00 : 1",
            score: midfaceScore
        },
        {
            label: "Eye line → upper lip",
            value: midfaceHeight,
            display: `${Math.round(midfaceHeight)} px`
        },
        {
            label: "Interpupillary distance",
            value: eyeDistance,
            display: `${Math.round(eyeDistance)} px`
        },
        {
            label: "Midface / face length",
            value: midfaceHeight / Math.max(faceLength, 1) * 100,
            display: formatPercent(midfaceHeight / Math.max(faceLength, 1) * 100)
        }
    ];
    // Facial width-to-height ratio: bizygomatic width over brow-line-to-upper-lip height.
    const upperFaceHeight = Math.max(Math.abs(upperLip.y - browProjection), 1);
    const fwhrValue = cheekWidth / upperFaceHeight;
    const fwhrBand = fwhrValue < 1.7 ? "Lower range" :
        fwhrValue > 2.1 ? "Higher range" :
            "Mid range";
    const fwhrScore = Math.round(closeness(fwhrValue, 1.9, 120));
    const fwhrMetrics = [
        {
            label: "fWHR",
            value: fwhrValue,
            display: formatRatio(fwhrValue),
            reference: "Published adult samples cluster around 1.7 – 2.1",
            score: fwhrScore
        },
        {
            label: "Bizygomatic width",
            value: cheekWidth,
            display: `${Math.round(cheekWidth)} px`
        },
        {
            label: "Upper-face height",
            value: upperFaceHeight,
            display: `${Math.round(upperFaceHeight)} px`,
            reference: "Brow line to upper lip"
        },
        {
            label: "Jaw / cheek width",
            value: jawRatio,
            display: formatRatio(jawRatio)
        }
    ];
    const thirdsBalance = clamp(100 - mean(thirds.map((metric) => Math.abs(metric.value - 100 / 3))) * 4.2);
    const fifthsRatio = cheekWidth / averageEyeWidth;
    const eyeSpacingRatio = eyeGap / averageEyeWidth;
    // Rule of fifths. The boundaries are read on the eye-line-aligned axis and
    // sorted, so the segments stay in image order however the head is rolled, and
    // the labels describe the photo rather than the sitter's own left and right.
    const fifthsBounds = OVERLAY_LANDMARKS.fifths
        .map((index) => projected(index).x)
        .sort((a, b) => a - b);
    const fifthsWidth = Math.max(fifthsBounds[fifthsBounds.length - 1] - fifthsBounds[0], 1);
    const fifthsShares = fifthsBounds
        .slice(0, -1)
        .map((bound, index) => (fifthsBounds[index + 1] - bound) / fifthsWidth * 100);
    const fifthsSegments = [
        "Outer fifth (left)",
        "Eye fifth (left)",
        "Central fifth",
        "Eye fifth (right)",
        "Outer fifth (right)"
    ].map((label, index) => ({
        label,
        value: fifthsShares[index],
        display: formatPercent(fifthsShares[index]),
        reference: "Equal-fifths reference = 20%",
        score: Math.round(closeness(Math.max(fifthsShares[index], 0.5), 20, 60))
    }));
    // Scaled against the thirds balance: the same relative error has to cost the
    // same, and a fifth deviates from a base of 20 rather than 33.3.
    const fifthsScore = Math.round(clamp(100 - mean(fifthsShares.map((share) => Math.abs(share - 20))) * 7));
    const fifthsMetrics = [
        {
            label: "Face width / eye width",
            value: fifthsRatio,
            display: formatRatio(fifthsRatio),
            reference: "Classical fifths reference ≈ 5 : 1",
            score: Math.round(closeness(fifthsRatio, 5, 70))
        },
        {
            label: "Eye gap / eye width",
            value: eyeSpacingRatio,
            display: formatRatio(eyeSpacingRatio),
            reference: "Central fifth reference ≈ 1 : 1",
            score: Math.round(closeness(eyeSpacingRatio, 1, 95))
        },
        {
            label: "Widest − narrowest fifth",
            value: Math.max(...fifthsShares) - Math.min(...fifthsShares),
            display: `${round(Math.max(...fifthsShares) - Math.min(...fifthsShares))} pts`,
            reference: "Spread across the five segments"
        },
        {
            label: "Outer-fifth difference",
            value: Math.abs(fifthsShares[0] - fifthsShares[4]),
            display: `${round(Math.abs(fifthsShares[0] - fifthsShares[4]))} pts`,
            reference: "Left against right; pose moves this first"
        }
    ];
    const mouthNoseScore = goldenMetrics.find((metric) => metric.label === "Mouth width / nose width")?.score ?? 0;
    const cheekMouthScore = goldenMetrics.find((metric) => metric.label === "Cheek width / mouth width")?.score ?? 0;
    const featureWidthScore = Math.round(mean([
        mouthNoseScore,
        cheekMouthScore,
        closeness(noseWidth / cheekWidth, 0.26, 130)
    ]));
    const harmonyComponents = [
        {
            label: "Visible symmetry",
            score: symmetryScore,
            weight: 0.2,
            note: "Paired landmark agreement across five regions after eye-line rotation."
        },
        {
            label: "Facial thirds",
            score: Math.round(thirdsBalance),
            weight: 0.18,
            note: "How evenly the upper, middle and lower vertical sections divide the visible face."
        },
        {
            label: "Feature widths",
            score: featureWidthScore,
            weight: 0.18,
            note: "Nose, mouth and cheek width relationships against the listed references."
        },
        {
            label: "Lower third & jaw",
            score: jawScore,
            weight: 0.17,
            note: "Side agreement of the jaw contour plus jaw-to-cheek width."
        },
        {
            label: "Midface proportion",
            score: midfaceScore,
            weight: 0.15,
            note: "Eye-line to upper-lip height relative to the interpupillary distance."
        },
        {
            label: "Eye spacing",
            score: Math.round(closeness(eyeSpacingRatio, 1, 95)),
            weight: 0.12,
            note: "Inter-eye gap compared with average visible eye width."
        }
    ];
    const harmonyScore = Math.round(harmonyComponents.reduce((total, item) => total + item.score * item.weight, 0));
    const harmonyHelps = harmonyComponents
        .filter((item) => item.score >= 76)
        .sort((a, b) => b.score - a.score)
        .map((item) => `${item.label} · ${item.score}/100 — measured close to this tool's reference.`);
    const harmonyReduces = harmonyComponents
        .filter((item) => item.score < 64)
        .sort((a, b) => a.score - b.score)
        .map((item) => `${item.label} · ${item.score}/100 — the largest measured distance from the reference.`);
    const photoDrivers = buildPhotoDrivers({
        brightness: brightnessScore,
        contrast: contrastScore,
        sharpness: sharpnessScore,
        pose: poseScore,
        coverage: coverageScore,
        resolution: resolutionScore,
        roll,
        yaw,
        faceCoverage,
        photo
    });
    const proportionScore = Math.round(goldenScore * 0.4 +
        thirdsBalance * 0.35 +
        closeness(fifthsRatio, 5, 70) * 0.15 +
        closeness(eyeSpacingRatio, 1, 95) * 0.1);
    const featureScore = Math.round(jawScore * 0.3 +
        eyeSymmetry * 0.3 +
        mouthNoseScore * 0.2 +
        cheekMouthScore * 0.2);
    const faceGeometryScore = Math.round(symmetryScore * 0.34 + proportionScore * 0.33 + featureScore * 0.33);
    return {
        quality: {
            score: qualityScore,
            label: scoreLabel(qualityScore),
            brightness: Math.round(photo.brightness),
            contrast: Math.round(photo.contrast),
            sharpness: Math.round(photo.sharpness),
            faceCoverage: Math.round(faceCoverage),
            roll: round(roll),
            yaw: round(yaw * 100),
            notes: qualityNotes
        },
        symmetry: {
            score: symmetryScore,
            regions: symmetryRegions
        },
        shape: {
            primary: shapeMatches[0],
            alternate: shapeMatches[1],
            ranking: shapeMatches,
            confidence: shapeConfidence,
            metrics: shapeMetrics
        },
        golden: {
            score: goldenScore,
            metrics: goldenMetrics
        },
        ratios: {
            thirds,
            metrics: ratioMetrics
        },
        fifths: {
            score: fifthsScore,
            segments: fifthsSegments,
            metrics: fifthsMetrics
        },
        jaw: {
            score: jawScore,
            leftAngle: round(leftJawAngle),
            rightAngle: round(rightJawAngle),
            metrics: jawMetrics
        },
        eyes: {
            shape: eyeShape,
            averageTilt: round(averageTilt),
            tiltLabel,
            symmetry: eyeSymmetry,
            metrics: eyeMetrics
        },
        harmony: {
            score: harmonyScore,
            band: harmonyBand(harmonyScore),
            components: harmonyComponents,
            helps: harmonyHelps,
            reduces: harmonyReduces,
            photoRelated: qualityNotes.filter((note) => !note.includes("suitable for a stable"))
        },
        midface: {
            ratio: round(midfaceRatio, 2),
            label: midfaceLabel,
            score: midfaceScore,
            metrics: midfaceMetrics
        },
        fwhr: {
            value: round(fwhrValue, 2),
            band: fwhrBand,
            score: fwhrScore,
            metrics: fwhrMetrics
        },
        split: {
            faceGeometry: faceGeometryScore,
            photoPresentation: qualityScore,
            gap: faceGeometryScore - qualityScore,
            symmetry: symmetryScore,
            proportion: proportionScore,
            feature: featureScore,
            drivers: photoDrivers
        },
        recommendations: shapeRecommendations(shapeMatches[0].name)
    };
}
