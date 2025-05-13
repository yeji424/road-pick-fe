import React from 'react'
import css from './ListCard.module.css'
import HeartToggle from './HeartToggle'
import { useNavigate } from 'react-router-dom'

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
        <div className={css.title}>
          <strong>{title}</strong>
          {/* <span className={css.rating}>
            <i className="bi bi-star-fill"></i>
            {rating} ({reviewCnt})
          </span> */}
        </div>
        {/* <p className={css.desc}>{description}</p> */}
        <p className={css.location}>
          {addr1} {addr2}
        </p>

      </div>
      <div className={css.heart}>
        <HeartToggle />
      </div>
    </div>
  )
}

export default ListCard
