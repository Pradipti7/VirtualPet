import React, { useMemo } from "react"

const GRID = 48
const PIXEL = 128 / GRID
const OUTLINE = "#2e2015"

function pointInCircle(px, py, cx, cy, r) {
  const dx = px - cx
  const dy = py - cy
  return dx * dx + dy * dy <= r * r
}

function pointInEllipse(px, py, cx, cy, rx, ry) {
  const dx = (px - cx) / rx
  const dy = (py - cy) / ry
  return dx * dx + dy * dy <= 1
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

function pointInCapsule(px, py, x1, y1, x2, y2, r) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len2 = dx * dx + dy * dy
  let t = len2 === 0 ? 0 : ((px - x1) * dx + (py - y1) * dy) / len2
  t = Math.max(0, Math.min(1, t))
  const cx = x1 + t * dx
  const cy = y1 + t * dy
  const ddx = px - cx
  const ddy = py - cy
  return ddx * ddx + ddy * ddy <= r * r
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
        else if (shape.type === "ellipse") hit = pointInEllipse(px, py, shape.cx, shape.cy, shape.rx, shape.ry)
        else if (shape.type === "polygon") hit = pointInPolygon(px, py, shape.points)
        else if (shape.type === "capsule") hit = pointInCapsule(px, py, shape.x1, shape.y1, shape.x2, shape.y2, shape.r)
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
          <rect
            key={i}
            x={r.x}
            y={r.y}
            width={r.w}
            height={r.h}
            fill={r.fill}
            shapeRendering="crispEdges"
          />
        ))}
      </g>
    </svg>
  )
}

export { FOOD_TYPES }
export default PixelFood
