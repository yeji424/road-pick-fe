import React from 'react'
import css from './ListCard.module.css'
import HeartToggle from './HeartToggle'
import { useNavigate } from 'react-router-dom'

const ListCard = item => {
  const {
    firstimage,
    title,
    description,
    location,
    withPet,
    rating,
    reviewCnt,
    contentid,
    contenttypeid,
  } = item
  const navigate = useNavigate()
  const MoveDetail = () => {
    navigate(`/detail/${contentid}`, { state: { contentid, contenttypeid } })
  }
  return (
    <div className={css.card} onClick={MoveDetail}>
      <div className={css.thumbnail}>
        <img src={firstimage} alt={title} />
      </div>
      <div className={css.content}>
        <div className={css.title}>
          <strong>{title}</strong>
          <span className={css.rating}>
            <i className="bi bi-star-fill"></i>
            {rating} ({reviewCnt})
          </span>
        </div>
        <p className={css.desc}>{description}</p>
        <p className={css.location}>{location}</p>
        <p className={css.pet}>
          반려동물 출입 여부 : <span>{withPet ? '가능' : '불가능'}</span>
        </p>
      </div>
      <div className={css.heart}>
        <HeartToggle />
      </div>
    </div>
  )
}

export default ListCard
