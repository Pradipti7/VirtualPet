import { useMemo } from "react"
import { rasterizeLayer } from "../utils/pixelRenderer"

const FRAME_BROWN = "#8B4513"
const FRAME_DARK = "#5C2E0A"
const FRAME_LIGHT = "#A0522D"

const SUNSET_FRAME = [
  { type: "polygon", points: [[8, 8], [120, 8], [120, 120], [8, 120]], fill: FRAME_BROWN },
  { type: "polygon", points: [[14, 14], [114, 14], [114, 114], [14, 114]], fill: FRAME_DARK },
  { type: "polygon", points: [[18, 18], [110, 18], [110, 110], [18, 110]], fill: "#FF6B35" },
  { type: "polygon", points: [[18, 18], [110, 18], [110, 60], [18, 60]], fill: "#FF9F43" },
  { type: "polygon", points: [[18, 60], [110, 60], [110, 110], [18, 110]], fill: "#1B4332" },
  { type: "circle", cx: 64, cy: 55, r: 14, fill: "#FFD700" },
  { type: "polygon", points: [[22, 60], [40, 75], [28, 75]], fill: "#2D6A4F" },
  { type: "polygon", points: [[60, 60], [80, 80], [40, 80]], fill: "#40916C" },
  { type: "polygon", points: [[80, 60], [100, 78], [60, 78]], fill: "#52B788" },
  { type: "polygon", points: [[20, 100], [108, 100], [110, 110], [18, 110]], fill: "#5C2E0A" },
]

const MOUNTAIN_FRAME = [
  { type: "polygon", points: [[8, 8], [120, 8], [120, 120], [8, 120]], fill: FRAME_LIGHT },
  { type: "polygon", points: [[14, 14], [114, 14], [114, 114], [14, 114]], fill: FRAME_BROWN },
  { type: "polygon", points: [[18, 18], [110, 18], [110, 110], [18, 110]], fill: "#87CEEB" },
  { type: "polygon", points: [[18, 18], [110, 18], [110, 50], [18, 50]], fill: "#5DADE2" },
  { type: "polygon", points: [[18, 70], [110, 70], [110, 110], [18, 110]], fill: "#228B22" },
  { type: "polygon", points: [[30, 70], [55, 30], [80, 70]], fill: "#555555" },
  { type: "polygon", points: [[38, 70], [55, 40], [72, 70]], fill: "#777777" },
  { type: "polygon", points: [[50, 42], [55, 30], [60, 42]], fill: "#FFFFFF" },
  { type: "polygon", points: [[70, 70], [95, 35], [110, 70]], fill: "#444444" },
  { type: "polygon", points: [[78, 70], [95, 42], [106, 70]], fill: "#666666" },
  { type: "polygon", points: [[90, 44], [95, 35], [100, 44]], fill: "#FFFFFF" },
]

const FLOWER_FRAME = [
  { type: "polygon", points: [[8, 8], [120, 8], [120, 120], [8, 120]], fill: "#DEB887" },
  { type: "polygon", points: [[14, 14], [114, 14], [114, 114], [14, 114]], fill: "#D2B48C" },
  { type: "polygon", points: [[18, 18], [110, 18], [110, 110], [18, 110]], fill: "#FFF8DC" },
  { type: "polygon", points: [[18, 80], [110, 80], [110, 110], [18, 110]], fill: "#228B22" },
  { type: "circle", cx: 35, cy: 55, r: 8, fill: "#FF69B4" },
  { type: "circle", cx: 35, cy: 55, r: 3, fill: "#FFD700" },
  { type: "circle", cx: 64, cy: 50, r: 9, fill: "#FF4500" },
  { type: "circle", cx: 64, cy: 50, r: 3.5, fill: "#FFD700" },
  { type: "circle", cx: 90, cy: 58, r: 7, fill: "#DA70D6" },
  { type: "circle", cx: 90, cy: 58, r: 2.5, fill: "#FFD700" },
  { type: "capsule", x1: 35, y1: 62, x2: 35, y2: 82, r: 2, fill: "#228B22" },
  { type: "capsule", x1: 64, y1: 58, x2: 64, y2: 82, r: 2, fill: "#228B22" },
  { type: "capsule", x1: 90, y1: 64, x2: 90, y2: 82, r: 2, fill: "#228B22" },
  { type: "ellipse", cx: 30, cy: 90, rx: 16, ry: 8, fill: "#8B4513" },
  { type: "ellipse", cx: 30, cy: 88, rx: 12, ry: 5, fill: "#A0522D" },
]

const OCEAN_FRAME = [
  { type: "polygon", points: [[8, 8], [120, 8], [120, 120], [8, 120]], fill: "#4682B4" },
  { type: "polygon", points: [[14, 14], [114, 14], [114, 114], [14, 114]], fill: "#36648B" },
  { type: "polygon", points: [[18, 18], [110, 18], [110, 110], [18, 110]], fill: "#1E90FF" },
  { type: "polygon", points: [[18, 18], [110, 18], [110, 45], [18, 45]], fill: "#87CEEB" },
  { type: "polygon", points: [[18, 65], [110, 65], [110, 110], [18, 110]], fill: "#F4A460" },
  { type: "circle", cx: 90, cy: 30, r: 10, fill: "#FFD700" },
  { type: "polygon", points: [[18, 45], [110, 45], [110, 52], [18, 52]], fill: "#4169E1" },
  { type: "polygon", points: [[18, 50], [110, 50], [110, 58], [18, 58]], fill: "#1C3A6E" },
  { type: "polygon", points: [[18, 56], [110, 56], [110, 65], [18, 65]], fill: "#4169E1" },
  { type: "polygon", points: [[60, 55], [70, 42], [80, 55]], fill: "#2E8B57" },
]

const STAR_FRAME = [
  { type: "polygon", points: [[8, 8], [120, 8], [120, 120], [8, 120]], fill: "#4A4A6A" },
  { type: "polygon", points: [[14, 14], [114, 14], [114, 114], [14, 114]], fill: "#2E2E4A" },
  { type: "polygon", points: [[18, 18], [110, 18], [110, 110], [18, 110]], fill: "#0C1445" },
  { type: "circle", cx: 40, cy: 35, r: 12, fill: "#FFFACD" },
  { type: "circle", cx: 43, cy: 33, r: 10, fill: "#0C1445" },
  { type: "circle", cx: 85, cy: 75, r: 4, fill: "#FFD700" },
  { type: "circle", cx: 30, cy: 80, r: 3, fill: "#FFD700" },
  { type: "circle", cx: 95, cy: 30, r: 2.5, fill: "#FFFACD" },
  { type: "circle", cx: 55, cy: 95, r: 2, fill: "#FFFACD" },
  { type: "circle", cx: 75, cy: 40, r: 3, fill: "#FFD700" },
  { type: "circle", cx: 25, cy: 55, r: 2, fill: "#FFFACD" },
  { type: "circle", cx: 100, cy: 55, r: 2.5, fill: "#FFD700" },
  { type: "polygon", points: [[82, 72], [85, 65], [88, 72], [95, 72], [90, 77], [92, 84], [85, 80], [78, 84], [80, 77], [75, 72]], fill: "#FFD700" },
]

const FRAME_TYPES = [
  { name: "sunset", shapes: SUNSET_FRAME, label: "Sunset Painting" },
  { name: "mountain", shapes: MOUNTAIN_FRAME, label: "Mountain Painting" },
  { name: "flower", shapes: FLOWER_FRAME, label: "Flower Painting" },
  { name: "ocean", shapes: OCEAN_FRAME, label: "Ocean Painting" },
  { name: "starry-night", shapes: STAR_FRAME, label: "Starry Night Painting" },
]

function PixelFrame({ type = "sunset", className }) {
  const frame = FRAME_TYPES.find((f) => f.name === type) || FRAME_TYPES[0]
  const rects = useMemo(() => rasterizeLayer(frame.shapes), [frame.name])
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

export { FRAME_TYPES }
export default PixelFrame
