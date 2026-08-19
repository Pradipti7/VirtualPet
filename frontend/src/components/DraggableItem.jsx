import { useState, useRef, useEffect } from 'react'
import PixelFrame from './PixelFrame'

const MIN_SCALE = 0.5
const MAX_SCALE = 2.5

function DraggableItem({ item, itemData, onMove }) {
  const [isDragging, setIsDragging] = useState(false)
  const [isRotating, setIsRotating] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [position, setPosition] = useState({ x: item.x, y: item.y })
  const [rotation, setRotation] = useState(item.rotation || 0)
  const [scale, setScale] = useState(item.scale || 1)
  const dragOffset = useRef({ x: 0, y: 0 })
  const rotateStartX = useRef(0)
  const rotateStartAngle = useRef(0)
  const resizeStartX = useRef(0)
  const resizeStartScale = useRef(1)
  const elementRef = useRef(null)

  useEffect(() => {
    setPosition({ x: item.x, y: item.y })
    setRotation(item.rotation || 0)
    setScale(item.scale || 1)
  }, [item.x, item.y, item.rotation, item.scale])

  const handlePointerDown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    const rect = elementRef.current.getBoundingClientRect()
    dragOffset.current = {
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    }
    elementRef.current.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const parentRect = elementRef.current.parentElement.getBoundingClientRect()
    const newX = ((e.clientX - parentRect.left - dragOffset.current.x) / parentRect.width) * 100
    const newY = ((e.clientY - parentRect.top - dragOffset.current.y) / parentRect.height) * 100
    setPosition({
      x: `${Math.max(2, Math.min(95, newX))}%`,
      y: `${Math.max(20, Math.min(90, newY))}%`,
    })
  }

  const handlePointerUp = (e) => {
    if (!isDragging) return
    e.preventDefault()
    setIsDragging(false)
    onMove(item.itemId, { x: position.x, y: position.y, rotation, scale })
  }

  const handleRotateStart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsRotating(true)
    rotateStartX.current = e.clientX
    rotateStartAngle.current = rotation
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handleRotateMove = (e) => {
    if (!isRotating) return
    e.preventDefault()
    e.stopPropagation()
    const deltaX = e.clientX - rotateStartX.current
    setRotation(rotateStartAngle.current + deltaX)
  }

  const handleRotateEnd = (e) => {
    if (!isRotating) return
    e.preventDefault()
    e.stopPropagation()
    setIsRotating(false)
    onMove(item.itemId, { x: position.x, y: position.y, rotation, scale })
  }

  const handleResizeStart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    resizeStartX.current = e.clientX
    resizeStartScale.current = scale
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handleResizeMove = (e) => {
    if (!isResizing) return
    e.preventDefault()
    e.stopPropagation()
    const deltaX = e.clientX - resizeStartX.current
    const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, resizeStartScale.current + deltaX * 0.005))
    setScale(newScale)
  }

  const handleResizeEnd = (e) => {
    if (!isResizing) return
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(false)
    onMove(item.itemId, { x: position.x, y: position.y, rotation, scale })
  }

  return (
    <div
      ref={elementRef}
      className="absolute z-30 select-none touch-none"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex flex-col items-center transition-transform ${isDragging ? 'scale-125' : 'hover:scale-110'}`}>
        {itemData.frameType ? (
          <div className="relative">
            <PixelFrame type={itemData.frameType} className="w-16 h-16 drop-shadow-lg" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl drop-shadow-md select-none pointer-events-none">{itemData.petEmoji}</span>
          </div>
        ) : (
          <div className="text-5xl drop-shadow-lg">{itemData.emoji}</div>
        )}
      </div>
      {isHovered && !isDragging && (
        <>
          <button
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center text-sm hover:bg-blue-100 transition-colors z-10 cursor-grab active:cursor-grabbing"
            onPointerDown={handleRotateStart}
            onPointerMove={handleRotateMove}
            onPointerUp={handleRotateEnd}
            onPointerCancel={handleRotateEnd}
            title="Drag to rotate"
          >
            🔄
          </button>
          <button
            className="absolute -right-3 -bottom-3 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center text-sm hover:bg-green-100 transition-colors z-10 cursor-nwse-resize active:cursor-nwse-resize"
            onPointerDown={handleResizeStart}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeEnd}
            onPointerCancel={handleResizeEnd}
            title="Drag to resize"
          >
            ↕
          </button>
        </>
      )}
    </div>
  )
}

export default DraggableItem
