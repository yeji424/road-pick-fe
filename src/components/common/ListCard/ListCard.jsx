import React from 'react'
import css from './ListCard.module.css'
import HeartToggle from './HeartToggle'
import { useNavigate } from 'react-router-dom'
import StarIcon from '@/assets/icons/starIcon.svg?react'

const ListCard = ({ firstimage, title, addr1, addr2, contentid, contenttypeid }) => {
  const navigate = useNavigate()
  const MoveDetail = () => {
    navigate(`/detail/${contenttypeid}/${contentid}`)
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
      <div className={css.saveBtn}>
        <HeartToggle />
      </div>
    </div>
  )
}

export default ListCard
