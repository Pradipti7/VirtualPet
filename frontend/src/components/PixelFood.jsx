import { useMemo } from "react"
import { rasterizeLayer } from "../utils/pixelRenderer"

const MEAT_SHAPES = [
  { type: "ellipse", cx: 64, cy: 68, rx: 28, ry: 22, fill: "#8B0000" },
  { type: "ellipse", cx: 64, cy: 72, rx: 20, ry: 14, fill: "#CD5C5C" },
  { type: "polygon", points: [[30, 50], [26, 38], [38, 42], [42, 54]], fill: "#F5F5DC" },
  { type: "polygon", points: [[86, 50], [90, 38], [78, 42], [74, 54]], fill: "#F5F5DC" },
  { type: "circle", cx: 50, cy: 65, r: 4, fill: "#FFFFFF" },
  { type: "circle", cx: 72, cy: 70, r: 3, fill: "#FFFFFF" },
  { type: "circle", cx: 60, cy: 78, r: 3.5, fill: "#FFFFFF" },
]

const FISH_SHAPES = [
  { type: "ellipse", cx: 64, cy: 64, rx: 30, ry: 16, fill: "#4682B4" },
  { type: "ellipse", cx: 64, cy: 68, rx: 22, ry: 10, fill: "#87CEEB" },
  { type: "polygon", points: [[100, 64], [118, 48], [118, 80]], fill: "#4682B4" },
  { type: "circle", cx: 44, cy: 58, r: 4, fill: "#1a1a1a" },
  { type: "circle", cx: 45, cy: 57, r: 1.5, fill: "#ffffff" },
  { type: "polygon", points: [[50, 64], [56, 60], [56, 68]], fill: "#4682B4" },
  { type: "polygon", points: [[60, 64], [66, 60], [66, 68]], fill: "#4682B4" },
  { type: "polygon", points: [[70, 64], [76, 60], [76, 68]], fill: "#4682B4" },
]

const APPLE_SHAPES = [
  { type: "circle", cx: 64, cy: 68, r: 24, fill: "#DC143C" },
  { type: "circle", cx: 50, cy: 60, r: 6, fill: "#FF6347" },
  { type: "circle", cx: 74, cy: 56, r: 5, fill: "#FF6347" },
  { type: "capsule", x1: 64, y1: 44, x2: 64, y2: 30, r: 3, fill: "#8B4513" },
  { type: "ellipse", cx: 72, cy: 36, rx: 10, ry: 6, fill: "#228B22" },
]

const FOOD_TYPES = [
  { name: "meat", shapes: MEAT_SHAPES, label: "Meat" },
  { name: "fish", shapes: FISH_SHAPES, label: "Fish" },
  { name: "apple", shapes: APPLE_SHAPES, label: "Apple" },
]

function PixelFood({ type = "meat", className }) {
  const food = FOOD_TYPES.find((f) => f.name === type) || FOOD_TYPES[0]
  const rects = useMemo(() => rasterizeLayer(food.shapes), [food.name])
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

export { FOOD_TYPES }
export default PixelFood
