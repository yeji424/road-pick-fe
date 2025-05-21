import React, { useRef, useEffect, useState } from 'react'

const DraggableScroll = ({ children, className = '' }) => {
  const scrollRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const [isGrabbing, setIsGrabbing] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleMouseDown = e => {
      isDragging.current = true
      startX.current = e.pageX - el.offsetLeft
      scrollLeft.current = el.scrollLeft
      setIsGrabbing(true)
    }

    const handleMouseMove = e => {
      if (!isDragging.current) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      const walk = x - startX.current
      el.scrollLeft = scrollLeft.current - walk
    }

    const handleMouseUp = () => {
      isDragging.current = false
      setIsGrabbing(false)
    }

    el.addEventListener('mousedown', handleMouseDown)
    el.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      el.removeEventListener('mousedown', handleMouseDown)
      el.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div
      ref={scrollRef}
      className={className}
      style={{
        overflowX: 'auto',
        cursor: isGrabbing ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
    >
      {children}
    </div>
  )
}

export default DraggableScroll
