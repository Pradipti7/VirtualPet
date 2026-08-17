import React, { useMemo } from "react"

/* =========================================================================
   Pixel-art pet renderer
   -------------------------------------------------------------------------
   Each pet is described as a small set of "shapes" (ellipse / circle /
   polygon / capsule) using the SAME coordinate system as a normal 128x128
   viewBox SVG. Those shapes get rasterized onto a 32x32 pixel grid with a
   traced 2px outline, which is what gives the chunky pixel-art look.
   Shapes are grouped into layers ("base", "tail", "earL", "wing", ...) so
   individual parts can be animated independently with CSS transforms while
   everything else stays crisp and static.
   ========================================================================= */

const GRID = 48 // higher resolution = softer, less blocky pixel art
const PIXEL = 128 / GRID
const OUTLINE = "#2e2015"

function pointInEllipse(px, py, cx, cy, rx, ry) {
  const dx = (px - cx) / rx
  const dy = (py - cy) / ry
  return dx * dx + dy * dy <= 1
}
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
function pointInShape(shape, px, py) {
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

// Rasterize a list of shapes into merged (run-length encoded) <rect> data,
// including a traced outline around the layer's own silhouette.
function rasterizeLayer(shapes, outlineWidth = 2) {
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
  // run-length encode each row so we emit far fewer <rect> elements
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

function PixelLayer({ shapes }) {
  const rects = useMemo(() => rasterizeLayer(shapes), [shapes])
  return (
    <g>
      {rects.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.fill} shapeRendering="crispEdges" />
      ))}
    </g>
  )
}

// Animated wrapper: renders a layer inside a <g> with its own transform-origin
// so it can be nudged by a CSS keyframe animation without disturbing the rest.
function AnimatedLayer({ shapes, originX, originY, animationClass }) {
  if (!shapes || shapes.length === 0) return null
  return (
    <g className={animationClass} style={{ transformOrigin: `${originX}px ${originY}px` }}>
      <PixelLayer shapes={shapes} />
    </g>
  )
}

/* =========================================================================
   Shared idle-animation keyframes (rendered once by PetAvatar)
   ========================================================================= */
function PetStyles() {
  return (
    <style>{`
      @keyframes pet-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2.5px); } }
      @keyframes pet-blink { 0%, 92%, 100% { transform: scaleY(0.05); } 96% { transform: scaleY(1); } }
      @keyframes pet-tail-wag { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(10deg); } }
      @keyframes pet-tail-wag-fast { 0%,100% { transform: rotate(-14deg); } 50% { transform: rotate(14deg); } }
      @keyframes pet-ear-twitch { 0%,80%,100% { transform: rotate(0deg); } 90% { transform: rotate(-10deg); } }
      @keyframes pet-ear-flop { 0%,100% { transform: rotate(-4deg); } 50% { transform: rotate(6deg); } }
      @keyframes pet-wing-flap { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(24deg); } }
      @keyframes pet-tongue-flick { 0%, 65%, 100% { transform: scaleY(0); } 80% { transform: scaleY(1); } }
      .pet-tongue-flick { animation: pet-tongue-flick 3.5s ease-in-out infinite; }
      @keyframes pet-tongue-pulse { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(1.15); } }
      @keyframes pet-pouch-pulse { 0%,100% { transform: scaleX(1); } 50% { transform: scaleX(1.12); } }
      @keyframes pet-walk-paw { 0%,100% { transform: translateX(0); } 50% { transform: translateX(3px); } }
      .pet-bob { animation: pet-bob 2.4s ease-in-out infinite; transform-origin: 64px 96px; }
      .pet-blink-l { animation: pet-blink 4.5s ease-in-out infinite; }
      .pet-blink-r { animation: pet-blink 4.5s ease-in-out infinite; }
      .pet-tail-wag { animation: pet-tail-wag 1.4s ease-in-out infinite; }
      .pet-tail-wag-fast { animation: pet-tail-wag-fast 0.5s ease-in-out infinite; }
      .pet-ear-twitch-l { animation: pet-ear-twitch 3.6s ease-in-out infinite; }
      .pet-ear-twitch-r { animation: pet-ear-twitch 3.6s ease-in-out infinite 0.4s; }
      .pet-ear-flop-l { animation: pet-ear-flop 0.6s ease-in-out infinite; }
      .pet-ear-flop-r { animation: pet-ear-flop 0.6s ease-in-out infinite 0.3s; }      .pet-wing-flap { animation: pet-wing-flap 0.45s ease-in-out infinite; }
      .pet-tongue-pulse { animation: pet-tongue-pulse 0.7s ease-in-out infinite; }
      .pet-pouch-pulse-l { animation: pet-pouch-pulse 1.4s ease-in-out infinite; }
      .pet-pouch-pulse-r { animation: pet-pouch-pulse 1.4s ease-in-out infinite 0.3s; }
      .pet-walk-paw-a { animation: pet-walk-paw 0.4s ease-in-out infinite; }
      .pet-walk-paw-b { animation: pet-walk-paw 0.4s ease-in-out infinite 0.2s; }
    `}</style>
  )
}

/* =========================================================================
   Per-animal shape data
   ========================================================================= */

const CAT = {
  base: [
    { type: "ellipse", cx: 66, cy: 68, rx: 26, ry: 15, fill: "#F4A460" }, // body
    { type: "ellipse", cx: 66, cy: 73, rx: 17, ry: 10, fill: "#FFE4B5" }, // belly
    { type: "circle", cx: 38, cy: 55, r: 22, fill: "#F4A460" }, // head
    { type: "polygon", points: [[22, 46], [16, 22], [35, 40]], fill: "#F4A460" },
    { type: "polygon", points: [[50, 40], [58, 22], [41, 38]], fill: "#F4A460" },
    { type: "polygon", points: [[25, 42], [21, 29], [33, 39]], fill: "#FFB6C1" },
    { type: "polygon", points: [[47, 39], [53, 28], [40, 37]], fill: "#FFB6C1" },
    { type: "circle", cx: 22, cy: 63, r: 4, fill: "#FFB6C1" },
    { type: "circle", cx: 50, cy: 61, r: 4, fill: "#FFB6C1" },
    { type: "circle", cx: 29, cy: 54, r: 4.5, fill: "#3a2a1a" }, // eyes
    { type: "circle", cx: 45, cy: 52, r: 4.5, fill: "#3a2a1a" },
    { type: "circle", cx: 30.5, cy: 52, r: 1.5, fill: "#ffffff" },
    { type: "circle", cx: 46.5, cy: 50, r: 1.5, fill: "#ffffff" },
    { type: "polygon", points: [[34, 60], [38, 65], [42, 60]], fill: "#FF69B4" }, // nose
  ],
  pawFL: [{ type: "ellipse", cx: 45, cy: 84, rx: 6, ry: 5, fill: "#F4A460" }],
  pawFR: [{ type: "ellipse", cx: 58, cy: 85, rx: 6, ry: 5, fill: "#F4A460" }],
  pawBL: [{ type: "ellipse", cx: 74, cy: 85, rx: 6, ry: 5, fill: "#F4A460" }],
  pawBR: [{ type: "ellipse", cx: 87, cy: 84, rx: 6, ry: 5, fill: "#F4A460" }],
  tail: [
    { type: "capsule", x1: 94, y1: 66, x2: 106, y2: 48, r: 6, fill: "#F4A460" },
    { type: "circle", cx: 108, cy: 40, r: 6, fill: "#F4A460" },
  ],
  earL: [{ type: "polygon", points: [[22, 46], [16, 22], [35, 40]], fill: "#F4A460" }, { type: "polygon", points: [[25, 42], [21, 29], [33, 39]], fill: "#FFB6C1" }],
  earR: [{ type: "polygon", points: [[50, 40], [58, 22], [41, 38]], fill: "#F4A460" }, { type: "polygon", points: [[47, 39], [53, 28], [40, 37]], fill: "#FFB6C1" }],
  eyelidL: [{ type: "ellipse", cx: 29, cy: 54, rx: 5.5, ry: 5.5, fill: "#F4A460" }],
  eyelidR: [{ type: "ellipse", cx: 45, cy: 52, rx: 5.5, ry: 5.5, fill: "#F4A460" }],
}


const DOG = {
  base: [
    { type: "ellipse", cx: 68, cy: 68, rx: 28, ry: 15, fill: "#DEB887" }, // body
    { type: "ellipse", cx: 68, cy: 73, rx: 19, ry: 10, fill: "#FAEBD7" }, // belly
    { type: "circle", cx: 38, cy: 54, r: 23, fill: "#DEB887" }, // head
    { type: "circle", cx: 38, cy: 58, r: 15, fill: "#F5DEB3" }, // face patch
    { type: "circle", cx: 22, cy: 63, r: 4, fill: "#FFB6C1" }, // cheek blush
    { type: "circle", cx: 50, cy: 60, r: 4, fill: "#FFB6C1" },
    { type: "ellipse", cx: 30, cy: 65, rx: 11, ry: 9, fill: "#F5DEB3" }, // snout
    { type: "circle", cx: 30, cy: 52, r: 4.5, fill: "#3a2a1a" }, // eyes
    { type: "circle", cx: 45, cy: 50, r: 4.5, fill: "#3a2a1a" },
    { type: "circle", cx: 31.5, cy: 50, r: 1.5, fill: "#ffffff" }, // eye highlights
    { type: "circle", cx: 46.5, cy: 48, r: 1.5, fill: "#ffffff" },
    { type: "ellipse", cx: 26, cy: 60, rx: 5, ry: 4, fill: "#2C1810" }, // nose
    { type: "capsule", x1: 22, y1: 68, x2: 34, y2: 69, r: 1, fill: "#3a2416" }, // mouth line
  ],
  pawFL: [{ type: "ellipse", cx: 46, cy: 84, rx: 6.5, ry: 5, fill: "#DEB887" }],
  pawFR: [{ type: "ellipse", cx: 60, cy: 85, rx: 6.5, ry: 5, fill: "#DEB887" }],
  pawBL: [{ type: "ellipse", cx: 76, cy: 85, rx: 6.5, ry: 5, fill: "#DEB887" }],
  pawBR: [{ type: "ellipse", cx: 90, cy: 84, rx: 6.5, ry: 5, fill: "#DEB887" }],
  tail: [
    { type: "capsule", x1: 94, y1: 64, x2: 107, y2: 46, r: 6, fill: "#DEB887" },
    { type: "circle", cx: 109, cy: 40, r: 6, fill: "#DEB887" },
  ],
  // Left ear — narrow, hugs the side of the head, well clear of the eye (eye ends at x=34.5)
  earL: [
    { type: "polygon", points: [[24,33],[14,40],[10,55],[13,68],[19,64],[22,50],[23,38]], fill: "#8B4513" },
    { type: "polygon", points: [[23,37],[16,42],[13,55],[15,66],[19,63],[21,50],[22,40]], fill: "#FFB6C1" },
  ],
  // Right ear — narrow, hugs the side of the head, well clear of the eye (eye starts at x=40.5)
  earR: [
    { type: "polygon", points: [[52,33],[62,40],[66,55],[63,68],[57,64],[54,50],[53,38]], fill: "#8B4513" },
    { type: "polygon", points: [[53,37],[60,42],[63,55],[61,66],[57,63],[55,50],[54,40]], fill: "#FFB6C1" },
  ],
  // Tongue — hangs straight down from the mouth line, below the snout
 tongue: [
  { type: "polygon", points: [[25,70],[31,70],[31,75],[25,75]], fill: "#FF6B81" },
],
  eyelidL: [{ type: "ellipse", cx: 30, cy: 52, rx: 5.5, ry: 5.5, fill: "#F5DEB3" }],
  eyelidR: [{ type: "ellipse", cx: 45, cy: 50, rx: 5.5, ry: 5.5, fill: "#F5DEB3" }],
}

const BUNNY = {
  base: [
    { type: "circle", cx: 90, cy: 70, r: 7, fill: "#ffffff" }, // tail (static puff)
    { type: "ellipse", cx: 63, cy: 68, rx: 24, ry: 15, fill: "#F5F0E6" },
    { type: "ellipse", cx: 63, cy: 73, rx: 16, ry: 10, fill: "#ffffff" },
    { type: "circle", cx: 36, cy: 56, r: 22, fill: "#F5F0E6" }, // head
    { type: "ellipse", cx: 26, cy: 22, rx: 7, ry: 21, fill: "#F5F0E6" },
    { type: "ellipse", cx: 44, cy: 20, rx: 7, ry: 21, fill: "#F5F0E6" },
    { type: "ellipse", cx: 26, cy: 23, rx: 3.6, ry: 15, fill: "#FFB6C1" },
    { type: "ellipse", cx: 44, cy: 21, rx: 3.6, ry: 15, fill: "#FFB6C1" },
    { type: "circle", cx: 20, cy: 62, r: 5, fill: "#FFB6C1" },
    { type: "circle", cx: 48, cy: 60, r: 5, fill: "#FFB6C1" },
    { type: "circle", cx: 28, cy: 53, r: 4.5, fill: "#1a1a1a" },
    { type: "circle", cx: 43, cy: 51, r: 4.5, fill: "#1a1a1a" },
    { type: "circle", cx: 29.5, cy: 51, r: 1.6, fill: "#ffffff" },
    { type: "circle", cx: 44.5, cy: 49, r: 1.6, fill: "#ffffff" },
    { type: "ellipse", cx: 34, cy: 62, rx: 4, ry: 3, fill: "#FF69B4" },
  ],
  pawFL: [{ type: "ellipse", cx: 44, cy: 84, rx: 6, ry: 4.5, fill: "#F5F0E6" }],
  pawFR: [{ type: "ellipse", cx: 57, cy: 85, rx: 6, ry: 4.5, fill: "#F5F0E6" }],
  pawBL: [{ type: "ellipse", cx: 70, cy: 85, rx: 6, ry: 4.5, fill: "#F5F0E6" }],
  pawBR: [{ type: "ellipse", cx: 83, cy: 84, rx: 6, ry: 4.5, fill: "#F5F0E6" }],
  earL: [
  { type: "polygon", points: [[22,30],[14,33],[11,48],[15,62],[21,58],[22,42]], fill: "#8B4513" },
  { type: "polygon", points: [[21,35],[16,37],[13,48],[16,58],[20,56],[21,44]], fill: "#FFB6C1" },
],
// Right ear — narrow, pinned to the side of the head, clear of the eye
earR: [
  { type: "polygon", points: [[50,30],[58,33],[61,48],[57,62],[51,58],[50,42]], fill: "#8B4513" },
  { type: "polygon", points: [[51,35],[56,37],[59,48],[56,58],[52,56],[51,44]], fill: "#FFB6C1" },
],
  eyelidL: [{ type: "ellipse", cx: 28, cy: 53, rx: 5.5, ry: 5.5, fill: "#F5F0E6" }],
  eyelidR: [{ type: "ellipse", cx: 43, cy: 51, rx: 5.5, ry: 5.5, fill: "#F5F0E6" }],
}

const HAMSTER = {
  base: [
    { type: "ellipse", cx: 66, cy: 70, rx: 25, ry: 15, fill: "#DEB887" },
    { type: "ellipse", cx: 66, cy: 75, rx: 16, ry: 10, fill: "#FAEBD7" },
    { type: "circle", cx: 38, cy: 55, r: 22, fill: "#DEB887" }, // head
    { type: "circle", cx: 19, cy: 40, r: 9, fill: "#C4A06A" },
    { type: "circle", cx: 53, cy: 38, r: 9, fill: "#C4A06A" },
    { type: "circle", cx: 19, cy: 40, r: 5, fill: "#FFB6C1" },
    { type: "circle", cx: 53, cy: 38, r: 5, fill: "#FFB6C1" },
    { type: "circle", cx: 20, cy: 62, r: 4, fill: "#FFB6C1" },
    { type: "circle", cx: 53, cy: 60, r: 4, fill: "#FFB6C1" },
    { type: "circle", cx: 30, cy: 53, r: 4.5, fill: "#1a1a1a" },
    { type: "circle", cx: 45, cy: 51, r: 4.5, fill: "#1a1a1a" },
    { type: "circle", cx: 31.5, cy: 51, r: 1.5, fill: "#ffffff" },
    { type: "circle", cx: 46.5, cy: 49, r: 1.5, fill: "#ffffff" },
    { type: "ellipse", cx: 36, cy: 62, rx: 4, ry: 3, fill: "#FF69B4" },
  ],
  pawFL: [{ type: "ellipse", cx: 46, cy: 86, rx: 6, ry: 4.5, fill: "#DEB887" }],
  pawFR: [{ type: "ellipse", cx: 59, cy: 87, rx: 6, ry: 4.5, fill: "#DEB887" }],
  pawBL: [{ type: "ellipse", cx: 74, cy: 87, rx: 6, ry: 4.5, fill: "#DEB887" }],
  pawBR: [{ type: "ellipse", cx: 88, cy: 86, rx: 6, ry: 4.5, fill: "#DEB887" }],
  pouchL: [{ type: "ellipse", cx: 21, cy: 65, rx: 12, ry: 9, fill: "#F5DEB3" }],
  pouchR: [{ type: "ellipse", cx: 53, cy: 63, rx: 12, ry: 9, fill: "#F5DEB3" }],
  eyelidL: [{ type: "ellipse", cx: 30, cy: 53, rx: 5.5, ry: 5.5, fill: "#DEB887" }],
  eyelidR: [{ type: "ellipse", cx: 45, cy: 51, rx: 5.5, ry: 5.5, fill: "#DEB887" }],
}

const BIRD = {
  base: [
    { type: "capsule", x1: 78, y1: 80, x2: 78, y2: 96, r: 3, fill: "#87CEEB" }, // center tail feather
    { type: "circle", cx: 76, cy: 64, r: 22, fill: "#87CEEB" }, // body
    { type: "ellipse", cx: 74, cy: 71, rx: 13, ry: 14, fill: "#E8F4FD" }, // belly
    { type: "circle", cx: 76, cy: 36, r: 17, fill: "#87CEEB" }, // head
    { type: "circle", cx: 64, cy: 40, r: 3.5, fill: "#FFB6C1" },
    { type: "circle", cx: 88, cy: 40, r: 3.5, fill: "#FFB6C1" },
    { type: "circle", cx: 69, cy: 34, r: 4, fill: "#1a1a1a" },
    { type: "circle", cx: 83, cy: 34, r: 4, fill: "#1a1a1a" },
    { type: "circle", cx: 70.5, cy: 32.5, r: 1.4, fill: "#ffffff" },
    { type: "circle", cx: 84.5, cy: 32.5, r: 1.4, fill: "#ffffff" },
    { type: "polygon", points: [[76, 40], [71, 46], [81, 46]], fill: "#FFA500" },
  ],
  pawFL: [{ type: "circle", cx: 68, cy: 88, r: 4, fill: "#FFA500" }],
  pawFR: [{ type: "circle", cx: 82, cy: 88, r: 4, fill: "#FFA500" }],
  tailFeathers: [
    { type: "capsule", x1: 70, y1: 76, x2: 58, y2: 90, r: 3, fill: "#5FA8D3" },
    { type: "capsule", x1: 86, y1: 76, x2: 98, y2: 90, r: 3, fill: "#5FA8D3" },
  ],
  wing: [{ type: "ellipse", cx: 54, cy: 60, rx: 10, ry: 16, fill: "#5FA8D3" }],
  eyelidL: [{ type: "ellipse", cx: 69, cy: 34, rx: 5, ry: 5, fill: "#87CEEB" }],
  eyelidR: [{ type: "ellipse", cx: 83, cy: 34, rx: 5, ry: 5, fill: "#87CEEB" }],
}

/* =========================================================================
   Pet components
   ========================================================================= */

function CatPet({ className }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <PetStyles />
      <g className="pet-bob">
        <AnimatedLayer shapes={CAT.pawFL} originX={45} originY={84} animationClass="pet-walk-paw-a" />
        <AnimatedLayer shapes={CAT.pawBR} originX={87} originY={84} animationClass="pet-walk-paw-a" />
        <AnimatedLayer shapes={CAT.pawFR} originX={58} originY={85} animationClass="pet-walk-paw-b" />
        <AnimatedLayer shapes={CAT.pawBL} originX={74} originY={85} animationClass="pet-walk-paw-b" />
        <AnimatedLayer shapes={CAT.tail} originX={94} originY={66} animationClass="pet-tail-wag" />
        <PixelLayer shapes={CAT.base} />
        <AnimatedLayer shapes={CAT.earL} originX={25} originY={40} animationClass="pet-ear-twitch-l" />
        <AnimatedLayer shapes={CAT.earR} originX={47} originY={38} animationClass="pet-ear-twitch-r" />
        <AnimatedLayer shapes={CAT.eyelidL} originX={29} originY={49} animationClass="pet-blink-l" />
        <AnimatedLayer shapes={CAT.eyelidR} originX={45} originY={47} animationClass="pet-blink-r" />
      </g>
    </svg>
  )
}

function DogPet({ className }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <PetStyles />
      <g className="pet-bob">
        <AnimatedLayer shapes={DOG.pawFL} originX={46} originY={84} animationClass="pet-walk-paw-a" />
        <AnimatedLayer shapes={DOG.pawBR} originX={90} originY={84} animationClass="pet-walk-paw-a" />
        <AnimatedLayer shapes={DOG.pawFR} originX={60} originY={85} animationClass="pet-walk-paw-b" />
        <AnimatedLayer shapes={DOG.pawBL} originX={76} originY={85} animationClass="pet-walk-paw-b" />
        <AnimatedLayer shapes={DOG.tail} originX={94} originY={64} animationClass="pet-tail-wag-fast" />
        <PixelLayer shapes={DOG.base} />
       <AnimatedLayer shapes={DOG.earR} originX={55} originY={46} animationClass="pet-ear-flop-r" />
      <AnimatedLayer shapes={DOG.earL} originX={17} originY={46} animationClass="pet-ear-flop-l" />
        <AnimatedLayer shapes={DOG.tongue} originX={29} originY={68} animationClass="pet-tongue-pulse" />
        <AnimatedLayer shapes={DOG.eyelidL} originX={30} originY={52} animationClass="pet-blink-l" />
        <AnimatedLayer shapes={DOG.eyelidR} originX={45} originY={50} animationClass="pet-blink-r" />
      </g>
    </svg>
  )
}

function BunnyPet({ className }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <PetStyles />
      <g className="pet-bob">
        <AnimatedLayer shapes={BUNNY.pawFL} originX={44} originY={84} animationClass="pet-walk-paw-a" />
        <AnimatedLayer shapes={BUNNY.pawBR} originX={83} originY={84} animationClass="pet-walk-paw-a" />
        <AnimatedLayer shapes={BUNNY.pawFR} originX={57} originY={85} animationClass="pet-walk-paw-b" />
        <AnimatedLayer shapes={BUNNY.pawBL} originX={70} originY={85} animationClass="pet-walk-paw-b" />
        <PixelLayer shapes={BUNNY.base} />
        <AnimatedLayer shapes={BUNNY.earL} originX={26} originY={43} animationClass="pet-ear-twitch-l" />
        <AnimatedLayer shapes={BUNNY.earR} originX={44} originY={41} animationClass="pet-ear-twitch-r" />
        <AnimatedLayer shapes={BUNNY.eyelidL} originX={28} originY={48} animationClass="pet-blink-l" />
        <AnimatedLayer shapes={BUNNY.eyelidR} originX={43} originY={46} animationClass="pet-blink-r" />
      </g>
    </svg>
  )
}

function BirdPet({ className }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <PetStyles />
      <g className="pet-bob">
        <AnimatedLayer shapes={BIRD.pawFL} originX={68} originY={88} animationClass="pet-walk-paw-a" />
        <AnimatedLayer shapes={BIRD.pawFR} originX={82} originY={88} animationClass="pet-walk-paw-b" />
        <AnimatedLayer shapes={BIRD.tailFeathers} originX={78} originY={80} animationClass="pet-tail-wag" />
        <PixelLayer shapes={BIRD.base} />
        <AnimatedLayer shapes={BIRD.wing} originX={58} originY={50} animationClass="pet-wing-flap" />
        <AnimatedLayer shapes={BIRD.eyelidL} originX={69} originY={29} animationClass="pet-blink-l" />
        <AnimatedLayer shapes={BIRD.eyelidR} originX={83} originY={29} animationClass="pet-blink-r" />
      </g>
    </svg>
  )
}

function HamsterPet({ className }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <PetStyles />
      <g className="pet-bob">
        <AnimatedLayer shapes={HAMSTER.pawFL} originX={46} originY={86} animationClass="pet-walk-paw-a" />
        <AnimatedLayer shapes={HAMSTER.pawBR} originX={88} originY={86} animationClass="pet-walk-paw-a" />
        <AnimatedLayer shapes={HAMSTER.pawFR} originX={59} originY={87} animationClass="pet-walk-paw-b" />
        <AnimatedLayer shapes={HAMSTER.pawBL} originX={74} originY={87} animationClass="pet-walk-paw-b" />
        <PixelLayer shapes={HAMSTER.base} />
        <AnimatedLayer shapes={HAMSTER.pouchL} originX={21} originY={65} animationClass="pet-pouch-pulse-l" />
        <AnimatedLayer shapes={HAMSTER.pouchR} originX={53} originY={63} animationClass="pet-pouch-pulse-r" />
        <AnimatedLayer shapes={HAMSTER.eyelidL} originX={30} originY={48} animationClass="pet-blink-l" />
        <AnimatedLayer shapes={HAMSTER.eyelidR} originX={45} originY={46} animationClass="pet-blink-r" />
      </g>
    </svg>
  )
}

const PET_COMPONENTS = {
  cat: CatPet,
  dog: DogPet,
  bunny: BunnyPet,
  bird: BirdPet,
  hamster: HamsterPet,
}

function PetAvatar({ type, className }) {
  const Component = PET_COMPONENTS[type]
  if (!Component) return null
  return <Component className={className} />
}

export default PetAvatar