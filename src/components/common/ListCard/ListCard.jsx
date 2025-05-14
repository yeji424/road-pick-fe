import React from 'react'
import css from './ListCard.module.css'
import HeartToggle from './HeartToggle'
import { useNavigate } from 'react-router-dom'
import StarIcon from '@/assets/icons/starIcon.svg?react'
import { useSelector } from 'react-redux'

const ListCard = ({ firstimage, title, addr1, addr2, contentid, contenttypeid }) => {
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()
  const MoveDetail = () => {
    navigate(`/detail/${contenttypeid}/${contentid}`)
  }

  const handleSaveClick = e => {
    e.preventDefault()

    if (!user) {
      navigate('/login', { state: { from: window.location.pathname } })
      return
    }
    // 로그인 된 경우만 아래 코드 실행(데이터베이스 저장)
    console.log('즐겨찾기 토글:', contentid)
  }

  return (
    <div className={css.card} onClick={MoveDetail}>
      <div className={css.thumbnail}>
        <img src={firstimage} alt={title} />
      </div>
      <div className={css.content}>
        <h3 className={css.title}>{title}</h3>
        <p className={css.rating}>
          <StarIcon /> 4.8 (24)
        </p>
        <p className={css.location}>
          {addr1} {addr2}
        </p>
      </div>
      <div className={css.saveBtn} onClickCapture={handleSaveClick}>
        <HeartToggle />
      </div>
    </div>
  )
}

export default ListCard
