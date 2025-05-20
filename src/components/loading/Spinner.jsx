import React, { useEffect, useState } from 'react'
import { useTrail, animated, useSpring } from 'react-spring'
import css from './Spinner.module.css'

const letters = 'RoadPick'.split('')

const RoadPickLoading = () => {
  const [loopActive, setLoopActive] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoopActive(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const trail = useTrail(letters.length, {
    from: { opacity: 0.1, transform: 'translateY(10px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { mass: 1, tension: 120, friction: 14 },
    loop: loopActive ? { reverse: true } : false,
  })

  const subtitle = useSpring({
    from: { opacity: 0.5 },
    to: { opacity: 1 },
    delay: 500,
    config: { duration: 1500 },
    loop: loopActive ? { reverse: true } : false,
  })

  return (
    <div className={css.wrapper}>
      <div className={css.text}>
        {trail.map((style, index) => (
          <animated.span key={index} style={style}>
            {letters[index]}
          </animated.span>
        ))}
      </div>
      <animated.div style={subtitle} className={css.subtitle}>
        당신의 여행을 준비 중입니다...
      </animated.div>
    </div>
  )
}

export default RoadPickLoading
