import React, { useState } from 'react'

const HeartToggle = () => {
  const [liked, setLiked] = useState(false)

  const toggleLike = () => {
    setLiked(prev => !prev)
  }

  return (
    <i
      className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'}`}
      onClick={toggleLike}
      style={{ cursor: 'pointer', color: liked ? '353535' : '#353535' }}
    ></i>
  )
}

export default HeartToggle
