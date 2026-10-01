export const STYLES = [
  {
    id: "bell-bottom-bob",
    name: "Bell-Bottom Bob",
    shapes: ["Oval", "Heart", "Diamond"],
    description: "Flared bob that balances the lower face and chin.",
    image: "assets/hairstyles/bell-bottom-bob.svg"
  },
  {
    id: "curtain-bangs",
    name: "Curtain Bangs",
    shapes: ["Round", "Square", "Oval", "Oblong"],
    description: "Soft center-parted fringe that frames the cheekbones.",
    image: "assets/hairstyles/curtain-bangs.svg"
  },
  {
    id: "italian-bob",
    name: "Italian Bob",
    shapes: ["Oval", "Square", "Round", "Triangle"],
    description: "Chunky, versatile neck-grazing bob with soft volume.",
    image: "assets/hairstyles/italian-bob.svg"
  }
];

export const styleMap = new Map(STYLES.map(s => [s.id, s]));

export function getStyleImage(style) {
  if (!style) return "assets/hairstyles/bell-bottom-bob.svg";
  if (typeof style === "string") return `assets/hairstyles/${style}.svg`;
  return style.image || `assets/hairstyles/${style.id}.svg`;
}

export function matchHairstyle(style, session) {
  const shape = session?.ranking?.[0]?.name || session?.shape || "Oval";
  const matched = style?.shapes ? style.shapes.includes(shape) : true;
  return {
    score: matched ? 92 : 75,
    matched,
    summary: matched ? `Well suited for ${shape} face contours.` : `A flexible option for ${shape} face contours.`
  };
}

export {
  styleMap as i,
  getStyleImage as a,
  matchHairstyle as n,
  matchHairstyle as o,
  STYLES as t,
  STYLES as s,
  getStyleImage as r
};
