import React, { useMemo } from "react"

const GRID = 48
const PIXEL = 128 / GRID
const OUTLINE = "#2e2015"

function pointInCircle(px, py, cx, cy, r) {
  const dx = px - cx
  const dy = py - cy
  return dx * dx + dy * dy <= r * r
}

function pointInPolygon(px, py, pts) {
  let inside = false
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i]
    const [xj, yj] = pts[j]
    const intersect =
      yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }
  return inside
}

function rasterizeLayer(shapes, outlineWidth = 2) {
  if (!shapes || shapes.length === 0) return []
  const grid = Array.from({ length: GRID }, () => Array(GRID).fill(null))
  for (const shape of shapes) {
    for (let gy = 0; gy < GRID; gy++) {
      for (let gx = 0; gx < GRID; gx++) {
        const px = gx * PIXEL + PIXEL / 2
        const py = gy * PIXEL + PIXEL / 2
        let hit = false
        if (shape.type === "circle") hit = pointInCircle(px, py, shape.cx, shape.cy, shape.r)
        else if (shape.type === "polygon") hit = pointInPolygon(px, py, shape.points)
        if (hit) grid[gy][gx] = shape.fill
      }
    }
  }
  const out = grid.map((row) => row.slice())
  let solid = grid.map((row) => row.map((c) => c !== null))
  for (let ring = 0; ring < outlineWidth; ring++) {
    const next = solid.map((row) => row.slice())
    for (let gy = 0; gy < GRID; gy++) {
      for (let gx = 0; gx < GRID; gx++) {
        if (!solid[gy][gx]) {
          const neighbors = [
            [gy - 1, gx],
            [gy + 1, gx],
            [gy, gx - 1],
            [gy, gx + 1],
          ]
          for (const [ny, nx] of neighbors) {
            if (ny >= 0 && ny < GRID && nx >= 0 && nx < GRID && solid[ny][nx]) {
              out[gy][gx] = OUTLINE
              next[gy][gx] = true
              break
            }
          }
        }
      }
    }
    solid = next
  }
  const rects = []
  for (let gy = 0; gy < GRID; gy++) {
    let x = 0
    while (x < GRID) {
      const color = out[gy][x]
      if (!color) {
        x++
        continue
      }
      let x2 = x + 1
      while (x2 < GRID && out[gy][x2] === color) x2++
      rects.push({
        x: x * PIXEL,
        y: gy * PIXEL,
        w: (x2 - x) * PIXEL,
        h: PIXEL,
        fill: color,
      })
      x = x2
    }
  }
  return rects
}

const HEART_SHAPES = [
  { type: "circle", cx: 42, cy: 44, r: 18, fill: "#FF1744" },
  { type: "circle", cx: 86, cy: 44, r: 18, fill: "#FF1744" },
  { type: "polygon", points: [[24, 50], [64, 100], [104, 50]], fill: "#FF1744" },
  { type: "circle", cx: 42, cy: 44, r: 12, fill: "#FF6B6B" },
  { type: "circle", cx: 86, cy: 44, r: 12, fill: "#FF6B6B" },
  { type: "polygon", points: [[30, 50], [64, 92], [98, 50]], fill: "#FF6B6B" },
  { type: "circle", cx: 48, cy: 38, r: 5, fill: "#FF8A80" },
]

function PixelHeart({ className }) {
  const rects = useMemo(() => rasterizeLayer(HEART_SHAPES), [])
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

export default PixelHeart
