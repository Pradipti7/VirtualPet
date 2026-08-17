import { useMemo } from "react"
import { rasterizeLayer } from "../utils/pixelRenderer"

const HEART_SHAPES = [
  { type: "circle", cx: 42, cy: 44, r: 18, fill: "#FF1744" },
  { type: "circle", cx: 86, cy: 44, r: 18, fill: "#FF1744" },
  { type: "polygon", points: [[24, 50], [64, 100], [104, 50]], fill: "#FF1744" },
  { type: "circle", cx: 42, cy: 44, r: 12, fill: "#FF6B6B" },
  { type: "circle", cx: 86, cy: 44, r: 12, fill: "#FF6B6B" },
  { type: "polygon", points: [[30, 50], [64, 92], [98, 50]], fill: "#FF6B6B" },
  { type: "circle", cx: 48, cy: 38, r: 5, fill: "#FF8A80" },
]

const STAR_SHAPES = [
  { type: "polygon", points: [[64, 16], [74, 48], [108, 48], [80, 70], [90, 104], [64, 82], [38, 104], [48, 70], [20, 48], [54, 48]], fill: "#FFD600" },
  { type: "polygon", points: [[64, 28], [72, 48], [96, 48], [76, 64], [84, 88], [64, 74], [44, 88], [52, 64], [32, 48], [56, 48]], fill: "#FFEB3B" },
  { type: "circle", cx: 52, cy: 44, r: 5, fill: "#FFF9C4" },
]

const SMILEY_SHAPES = [
  { type: "circle", cx: 64, cy: 64, r: 36, fill: "#FFD600" },
  { type: "circle", cx: 64, cy: 64, r: 30, fill: "#FFEB3B" },
  { type: "circle", cx: 48, cy: 54, r: 5, fill: "#5D4037" },
  { type: "circle", cx: 80, cy: 54, r: 5, fill: "#5D4037" },
  { type: "polygon", points: [[44, 72], [64, 88], [84, 72]], fill: "#5D4037" },
  { type: "polygon", points: [[48, 72], [64, 84], [80, 72]], fill: "#8D6E63" },
]

const SPARKLE_SHAPES = [
  { type: "polygon", points: [[64, 12], [68, 52], [108, 64], [68, 76], [64, 116], [60, 76], [20, 64], [60, 52]], fill: "#E040FB" },
  { type: "polygon", points: [[64, 24], [67, 52], [96, 64], [67, 76], [64, 104], [61, 76], [32, 64], [61, 52]], fill: "#EA80FC" },
  { type: "circle", cx: 56, cy: 52, r: 4, fill: "#F8BBD0" },
]

const FOOD_SHAPES = [
  { type: "ellipse", cx: 64, cy: 70, rx: 28, ry: 20, fill: "#8B4513" },
  { type: "ellipse", cx: 64, cy: 74, rx: 20, ry: 14, fill: "#D2691E" },
  { type: "circle", cx: 48, cy: 62, r: 5, fill: "#FFF8E1" },
  { type: "circle", cx: 72, cy: 66, r: 4, fill: "#FFF8E1" },
  { type: "circle", cx: 58, cy: 78, r: 4.5, fill: "#FFF8E1" },
  { type: "ellipse", cx: 64, cy: 46, rx: 8, ry: 12, fill: "#A0522D" },
  { type: "ellipse", cx: 52, cy: 42, rx: 6, ry: 10, fill: "#A0522D" },
  { type: "ellipse", cx: 76, cy: 42, rx: 6, ry: 10, fill: "#A0522D" },
]

const CARROT_SHAPES = [
  { type: "polygon", points: [[64, 100], [50, 40], [78, 40]], fill: "#FF6D00" },
  { type: "polygon", points: [[64, 100], [54, 44], [74, 44]], fill: "#FF9100" },
  { type: "circle", cx: 58, cy: 56, r: 3, fill: "#FFF3E0" },
  { type: "circle", cx: 68, cy: 68, r: 2.5, fill: "#FFF3E0" },
  { type: "ellipse", cx: 64, cy: 32, rx: 6, ry: 12, fill: "#2E7D32" },
  { type: "ellipse", cx: 52, cy: 28, rx: 5, ry: 10, fill: "#388E3C" },
  { type: "ellipse", cx: 76, cy: 28, rx: 5, ry: 10, fill: "#388E3C" },
]

const BALL_SHAPES = [
  { type: "circle", cx: 64, cy: 64, r: 32, fill: "#FFFFFF" },
  { type: "circle", cx: 64, cy: 38, r: 9, fill: "#2C2C2C" },
  { type: "circle", cx: 40, cy: 54, r: 8, fill: "#2C2C2C" },
  { type: "circle", cx: 88, cy: 54, r: 8, fill: "#2C2C2C" },
  { type: "circle", cx: 48, cy: 82, r: 8, fill: "#2C2C2C" },
  { type: "circle", cx: 80, cy: 82, r: 8, fill: "#2C2C2C" },
]

const SLEEP_SHAPES = [
  { type: "polygon", points: [[20, 30], [50, 30], [50, 42], [34, 42], [54, 68], [24, 68], [24, 56], [40, 56], [20, 30]], fill: "#7C4DFF" },
  { type: "polygon", points: [[24, 34], [46, 34], [46, 44], [36, 44], [50, 64], [28, 64], [28, 54], [38, 54], [24, 34]], fill: "#B388FF" },
  { type: "polygon", points: [[64, 48], [82, 48], [82, 56], [72, 56], [86, 76], [66, 76], [66, 68], [76, 68], [64, 48]], fill: "#7C4DFF" },
  { type: "polygon", points: [[67, 50], [79, 50], [79, 56], [73, 56], [83, 72], [69, 72], [69, 66], [75, 66], [67, 50]], fill: "#B388FF" },
  { type: "circle", cx: 96, cy: 66, r: 4, fill: "#7C4DFF" },
  { type: "circle", cx: 96, cy: 66, r: 2.5, fill: "#B388FF" },
]

const EMOJI_SHAPES = {
  heart: HEART_SHAPES,
  star: STAR_SHAPES,
  smiley: SMILEY_SHAPES,
  sparkle: SPARKLE_SHAPES,
  food: FOOD_SHAPES,
  ball: BALL_SHAPES,
  sleep: SLEEP_SHAPES,
}

const EMOJI_TYPES = Object.keys(EMOJI_SHAPES)

function PixelEmoji({ type = "heart", petType, className }) {
  let shapes = EMOJI_SHAPES[type] || HEART_SHAPES
  if (type === "food" && petType === "bunny") shapes = CARROT_SHAPES
  const rects = useMemo(() => rasterizeLayer(shapes), [type, petType])
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <g>
        {rects.map((r, i) => (
          <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.fill} shapeRendering="crispEdges" />
        ))}
      </g>
    </svg>
  )
}

export { EMOJI_TYPES }
export default PixelEmoji
