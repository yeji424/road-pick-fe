import React from 'react'
import css from './ListCard.module.css'
import HeartToggle from './HeartToggle'

const ListCard = ({ title, description, location, withPet, rating, reviewCnt }) => {
  return (
    <div className={css.card}>
      <div className={css.thumbnail} />
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
