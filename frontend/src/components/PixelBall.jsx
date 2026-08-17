import { useMemo } from "react"
import { rasterizeLayer } from "../utils/pixelRenderer"

const BALL_WHITE = "#FFFFFF"
const BALL_DARK = "#2C2C2C"

const BALL_SHAPES = [
  { type: "circle", cx: 64, cy: 64, r: 30, fill: BALL_WHITE },
  { type: "circle", cx: 64, cy: 38, r: 8, fill: BALL_DARK },
  { type: "circle", cx: 40, cy: 52, r: 7, fill: BALL_DARK },
  { type: "circle", cx: 88, cy: 52, r: 7, fill: BALL_DARK },
  { type: "circle", cx: 48, cy: 78, r: 7, fill: BALL_DARK },
  { type: "circle", cx: 80, cy: 78, r: 7, fill: BALL_DARK },
  { type: "polygon", points: [[58, 38], [56, 44], [60, 44]], fill: "#999999" },
  { type: "polygon", points: [[68, 38], [72, 44], [68, 44]], fill: "#999999" },
]

function PixelBall({ className }) {
  const rects = useMemo(() => rasterizeLayer(BALL_SHAPES), [])
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

export default PixelBall
