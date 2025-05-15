import React from 'react'
import SaveIcon from '@/assets/icons/saveIcon.svg?react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFavorite } from '@/hooks/useFavorite'

/**
 * @param {{ contentid: number|string }} props
 */
const HeartToggle = ({ contentid }) => {
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()
  const { isFavorited, toggle } = useFavorite(contentid)
  // 로그인 체크 포함 클릭 핸들러
  const handleClick = e => {
    if (!user) {
      e.stopPropagation()
      return navigate('/login', { state: { from: window.location.pathname } })
    }
    toggle(e) // useFavorite 훅의 토글 함수 호출
  }

  return (
    <SaveIcon
      onClick={handleClick} // 수정된 부분: 기존 onClickCapture/prop 제거
      style={{
        cursor: 'pointer',
        fill: isFavorited ? '#719EFF' : 'none', // isFavorited에 따라 색상 자동 반영
        stroke: '#719EFF',
        width: '24px',
        height: '24px',
        transition: 'fill 0.2s ease',
      }}
    />
  )
}

export default HeartToggle
