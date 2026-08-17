export const GRID = 48
export const PIXEL = 128 / GRID
export const OUTLINE = "#2e2015"

export function pointInEllipse(px, py, cx, cy, rx, ry) {
  const dx = (px - cx) / rx
  const dy = (py - cy) / ry
  return dx * dx + dy * dy <= 1
}

export function pointInCircle(px, py, cx, cy, r) {
  const dx = px - cx
  const dy = py - cy
  return dx * dx + dy * dy <= r * r
}

export function pointInPolygon(px, py, pts) {
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

export function pointInCapsule(px, py, x1, y1, x2, y2, r) {
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

export function pointInShape(shape, px, py) {
  switch (shape.type) {
    case "ellipse":
      return pointInEllipse(px, py, shape.cx, shape.cy, shape.rx, shape.ry)
    case "circle":
      return pointInCircle(px, py, shape.cx, shape.cy, shape.r)
    case "polygon":
      return pointInPolygon(px, py, shape.points)
    case "capsule":
      return pointInCapsule(px, py, shape.x1, shape.y1, shape.x2, shape.y2, shape.r)
    default:
      return false
  }
}

export function rasterizeLayer(shapes, outlineWidth = 2) {
  if (!shapes || shapes.length === 0) return []
  const grid = Array.from({ length: GRID }, () => Array(GRID).fill(null))
  for (const shape of shapes) {
    for (let gy = 0; gy < GRID; gy++) {
      for (let gx = 0; gx < GRID; gx++) {
        const px = gx * PIXEL + PIXEL / 2
        const py = gy * PIXEL + PIXEL / 2
        if (pointInShape(shape, px, py)) grid[gy][gx] = shape.fill
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
