import { useMemo } from "react"
import { rasterizeLayer } from "../../utils/pixelRenderer"

export function PixelLayer({ shapes }) {
  const rects = useMemo(() => rasterizeLayer(shapes), [shapes])
  return (
    <g>
      {rects.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.fill} shapeRendering="crispEdges" />
      ))}
    </g>
  )
}

export function AnimatedLayer({ shapes, originX, originY, animationClass }) {
  if (!shapes || shapes.length === 0) return null
  return (
    <g className={animationClass} style={{ transformOrigin: `${originX}px ${originY}px` }}>
      <PixelLayer shapes={shapes} />
    </g>
  )
}
