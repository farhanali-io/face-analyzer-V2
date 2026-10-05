export const DEFAULT_PREFERENCES = {
  length: "any",
  texture: "any",
  maintenance: "any"
};

export const STYLES = [
  {
    id: "italian-bob",
    name: "Italian Bob",
    length: "medium",
    textures: ["straight", "wavy", "curly"],
    maintenance: "medium",
    image: "/assets/hairstyles/italian-bob.svg",
    shapes: ["Oval", "Square", "Round", "Heart", "Diamond"],
    description: "A full bob around the jaw, with a substantial perimeter and softly curved ends.",
    why: "Places a clean, adjustable weight line near or just below the jaw.",
    upkeep: "A full perimeter needs regular trims. Air-drying works best when your natural texture already falls into the intended shape.",
    stylist: "Ask for a full-perimeter bob with softly curved ends rather than heavy internal thinning.",
    variations: {
      Oval: "Start around the jaw and adjust the part to your growth pattern; keep the perimeter full without adding unnecessary layers.",
      Round: "Try a perimeter below the chin and less volume at the cheeks. Keep the front slightly longer if you want a more vertical outline.",
      Square: "Let the front end a little below the jaw and soften the ends so the cut does not repeat the same horizontal jaw line.",
      Oblong: "Keep the length near the jaw and allow side fullness.",
      Heart: "Keep fullness near the chin to give the lower outline more width, while leaving the crown relatively flat.",
      Diamond: "Keep the perimeter full below the cheekbones and use a soft part so the widest section is not at the cheeks.",
      Triangle: "Avoid concentrating a blunt, heavy edge exactly on the jaw. Try a slightly longer front and lighter ends."
    }
  },
  {
    id: "curtain-bangs",
    name: "Curtain Bangs",
    length: "medium",
    textures: ["straight", "wavy", "curly"],
    maintenance: "medium",
    image: "/assets/hairstyles/curtain-bangs.svg",
    shapes: ["Round", "Square", "Oval", "Oblong", "Heart", "Diamond"],
    description: "A parted fringe that starts shorter near the center and lengthens toward the sides.",
    why: "Softens forehead and temple proportions while keeping the center of the face open.",
    upkeep: "A fringe often needs a daily reset and more frequent trims than the rest of the cut.",
    stylist: "Ask for a center-parted fringe graduated toward the cheekbones and connected smoothly to your side lengths.",
    variations: {
      Oval: "Choose the shortest point for your forehead height and routine; a light, cheekbone-length version is a less dramatic starting point.",
      Round: "Keep a visible central opening and longer side pieces.",
      Square: "Use soft, separated edges and a curve past the cheekbones rather than a blunt fringe line.",
      Oblong: "A slightly shorter, fuller curtain can cover more of the forehead; avoid pairing it with a very tall crown.",
      Heart: "Keep the center light and let the longer sides skim the temples; ask for an opening that follows your natural part.",
      Diamond: "Keep some softness beside the temples and let the longest pieces continue below the cheekbones.",
      Triangle: "A fuller upper fringe can add forehead width; keep the side pieces from forming a heavy block at the jaw."
    }
  },
  {
    id: "bell-bottom-bob",
    name: "Bell-Bottom Bob",
    length: "medium",
    textures: ["straight", "wavy"],
    maintenance: "high",
    image: "/assets/hairstyles/bell-bottom-bob.svg",
    shapes: ["Heart", "Diamond", "Oval", "Oblong"],
    description: "A bob with a relatively smooth upper section and ends styled to flare outward.",
    why: "Adds horizontal width at the lower perimeter where the ends flip outward.",
    upkeep: "The outward bend is a styling step, not just a cut. It may need a round brush or heat tool each time you reset the style.",
    stylist: "Ask for a clean bob cut to sit just around or below the jaw, with ends shaped to flip outward smoothly.",
    variations: {
      Oval: "Choose a small outward bend near the jaw or just below it; exaggerated flips need more daily styling.",
      Round: "Keep the upper section close and place a restrained flare below the chin if you want less side width.",
      Square: "Place the curved ends below the jaw corner and avoid a rigid horizontal shelf.",
      Oblong: "A shorter bob with some side fullness may reduce the impression of length; keep crown height modest.",
      Heart: "Let the ends flare near the narrower lower face while keeping the upper section smooth.",
      Diamond: "Put the outward bend below the cheekbones so it adds lower-face width rather than more cheek width.",
      Triangle: "Consider a small bend below the jaw or a softer layered bob; a large flare on the jaw can emphasize its width."
    }
  },
  {
    id: "textured-crop",
    name: "Textured Crop",
    length: "short",
    textures: ["straight", "wavy", "curly", "coily"],
    maintenance: "low",
    image: "/assets/hairstyles/italian-bob.svg",
    shapes: ["Oval", "Square", "Diamond", "Triangle"],
    description: "Short sides with natural movement and light texture across the top.",
    why: "Keeps the outline neat while allowing adjustable height at the crown or fringe.",
    upkeep: "Low daily styling effort; needs a perimeter tidy every 4–6 weeks.",
    stylist: "Ask for soft point-cut texture on top with a tapered, natural-looking temple and nape.",
    variations: {
      Oval: "Keep balanced proportions on top without excessive height.",
      Round: "Add slight lift through the top while keeping the sides close.",
      Square: "Soften the top perimeter to complement strong jaw angles.",
      Oblong: "Let the fringe sit forward slightly rather than building height.",
      Heart: "Keep the temples soft rather than clipped too tight.",
      Diamond: "Leave a little fullness around the upper temples.",
      Triangle: "Add slight volume at the temples and upper crown to balance the jaw."
    }
  },
  {
    id: "long-face-framing-layers",
    name: "Long Face-Framing Layers",
    length: "long",
    textures: ["straight", "wavy", "curly", "coily"],
    maintenance: "low",
    image: "/assets/hairstyles/curtain-bangs.svg",
    shapes: ["Round", "Square", "Oval", "Heart", "Triangle"],
    description: "Long length with graduated front pieces starting between the cheekbones and collarbone.",
    why: "Breaks up solid side weight and lets you choose where movement starts.",
    upkeep: "Grows out gracefully with trims every 8–12 weeks.",
    stylist: "Ask where the first front layer will land when dry, keeping the back perimeter full.",
    variations: {
      Oval: "Start face-framing pieces near the cheekbones or lips.",
      Round: "Begin the shortest front pieces below the chin to lengthen the outline.",
      Square: "Curve the front layers past the jaw corners for softness.",
      Oblong: "Add wider collarbone layers and optional soft fringe so length does not pull the outline down.",
      Heart: "Start layers around the chin to add fullness below the cheekbones.",
      Diamond: "Let soft layers open up the cheekbones and fall toward the collarbone.",
      Triangle: "Keep movement through the upper lengths and lighter ends below the jaw."
    }
  },
  {
    id: "collarbone-lob",
    name: "Collarbone Lob",
    length: "medium",
    textures: ["straight", "wavy", "curly", "coily"],
    maintenance: "low",
    image: "/assets/hairstyles/bell-bottom-bob.svg",
    shapes: ["Round", "Square", "Oval", "Heart", "Diamond", "Triangle"],
    description: "A versatile long bob resting between the chin and collarbone.",
    why: "Avoids stopping directly at the jaw while remaining easy to tie back.",
    upkeep: "Low-to-medium routine; works air-dried or lightly styled.",
    stylist: "Ask for a dry-checked collarbone grazing length with subtle internal movement.",
    variations: {
      Oval: "Works with a center or side part and minimal layering.",
      Round: "Keep the front slightly longer than the back to elongate the frame.",
      Square: "Ensure the hemline clears the jaw corner by at least a few centimetres.",
      Oblong: "Pair with waves or a soft fringe to add gentle horizontal balance.",
      Heart: "Keep fullness through the bottom third of the cut.",
      Diamond: "Use a side part or soft temple pieces with collarbone weight.",
      Triangle: "Keep the hemline below the jaw and add gentle crown lift."
    }
  }
];

export const styleMap = new Map(STYLES.map((s) => [s.id, s]));

export function getStyleImage(style) {
  if (!style) return "/assets/hairstyles/bell-bottom-bob.svg";
  if (typeof style === "string") return `/assets/hairstyles/${style}.svg`;
  return style.image || `/assets/hairstyles/${style.id}.svg`;
}

export function matchSingleStyle(style, ranking = []) {
  const primary = ranking?.[0]?.name || "Oval";
  const alternate = ranking?.[1]?.name || "Round";
  const primaryScore = ranking?.[0]?.score ?? 30;
  const alternateScore = ranking?.[1]?.score ?? 20;
  const isPrimaryMatch = style?.shapes ? style.shapes.includes(primary) : true;
  const isAltMatch = style?.shapes ? style.shapes.includes(alternate) : false;

  const fit = isPrimaryMatch
    ? `Strong starting point for ${primary}`
    : isAltMatch
      ? `Matches your close alternate (${alternate})`
      : `Adaptable for ${primary} with custom placement`;

  const variation =
    style?.variations?.[primary] ||
    `Adjust the perimeter and part placement to suit your ${primary.toLowerCase()} contour.`;
  const alternateVariation =
    primaryScore - alternateScore <= 12 && style?.variations?.[alternate]
      ? `${alternate}: ${style.variations[alternate]}`
      : "";

  return {
    style,
    fit,
    variation,
    alternateVariation,
    score: (isPrimaryMatch ? 20 : 0) + (isAltMatch ? 10 : 0)
  };
}

export function rankHairstyles(ranking = [], preferences = DEFAULT_PREFERENCES) {
  const lenPref = preferences?.length || "any";
  const texPref = preferences?.texture || "any";
  const maintPref = preferences?.maintenance || "any";

  return STYLES.filter((style) => {
    if (lenPref !== "any" && style.length !== lenPref) return false;
    if (texPref !== "any" && Array.isArray(style.textures) && !style.textures.includes(texPref)) return false;
    if (maintPref === "low" && style.maintenance !== "low") return false;
    if (maintPref === "medium" && style.maintenance === "high") return false;
    return true;
  })
    .map((style) => matchSingleStyle(style, ranking))
    .sort((a, b) => b.score - a.score);
}

export {
  styleMap as i,
  getStyleImage as a,
  matchSingleStyle as n,
  rankHairstyles as r,
  DEFAULT_PREFERENCES as t
};
