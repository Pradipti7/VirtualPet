import { useState, useRef, useEffect } from 'react'

function DraggableItem({ item, itemData, onMove }) {
  const [isDragging, setIsDragging] = useState(false)
  const [isRotating, setIsRotating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [position, setPosition] = useState({ x: item.x, y: item.y })
  const [rotation, setRotation] = useState(item.rotation || 0)
  const dragOffset = useRef({ x: 0, y: 0 })
  const rotateStartX = useRef(0)
  const rotateStartAngle = useRef(0)
  const elementRef = useRef(null)

  useEffect(() => {
    setPosition({ x: item.x, y: item.y })
    setRotation(item.rotation || 0)
  }, [item.x, item.y, item.rotation])

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
    onMove(item.itemId, { x: position.x, y: position.y, rotation })
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
    onMove(item.itemId, { x: position.x, y: position.y, rotation })
  }

  return (
    <div
      ref={elementRef}
      className="absolute z-30 select-none touch-none"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
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
        <div className="text-5xl drop-shadow-lg">{itemData.emoji}</div>
      </div>
      {isHovered && !isDragging && (
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
      )}
    </div>
  )
}

export default DraggableItem
