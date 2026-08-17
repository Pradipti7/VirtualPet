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
