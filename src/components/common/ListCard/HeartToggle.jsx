import React, { useState } from 'react'
import SaveIcon from '@/assets/icons/saveIcon.svg?react'

const HeartToggle = () => {
  const [save, setSave] = useState(false)

  const toggleSave = e => {
    e.stopPropagation() // 부모 클릭 막기
    setSave(prev => !prev)
  }

  return (
    <SaveIcon
      onClick={toggleSave}
      style={{
        cursor: 'pointer',
        fill: save ? '#719EFF' : 'none',
        stroke: '#719EFF',
        width: '24px',
        height: '24px',
        transition: 'fill 0.2s ease',
      }}
    />
  )
}

export default HeartToggle
