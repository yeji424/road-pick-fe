import React from 'react'
import css from './Logo.module.css'
const Logo = () => {
  return (
    <div className={css.logo}>
      {/* 임시 SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 180 45"
        style={{ display: 'block', width: 'auto', height: 'auto' }}
      >
        <text
          x="50%"
          y="60%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontWeight="bold"
          fontSize="48"
          fill="#333333"
        >
          로드픽
        </text>
      </svg>
    </div>
  )
}

export default Logo
