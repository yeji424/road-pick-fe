import React from 'react'
import { useNavigate } from 'react-router-dom'
import css from './ListCard.module.css'
import StarIcon from '@/assets/icons/starIcon.svg?react'
import HeartToggle from '@/components/common/ListCard/HeartToggle'

const ListCard = ({
  firstimage,
  title,
  addr1,
  addr2,
  contentid,
  contenttypeid,
  mapx,
  mapy,
  isFavorite = false,
}) => {
  const navigate = useNavigate()

  // 카드 클릭 시 상세 페이지로 이동
  const moveDetail = () => {
    if (isFavorite) {
      return
    }
    navigate(`/detail/${contenttypeid}/${contentid}`)
  }

  return (
    <div className={css.card} onClick={moveDetail}>
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

      {!isFavorite && (
        <div className={css.saveBtn}>
          <HeartToggle
            contentid={contentid}
            contenttypeid={contenttypeid}
            firstimage={firstimage}
            title={title}
            addr1={addr1}
            addr2={addr2}
            mapx={mapx}
            mapy={mapy}
          />
        </div>
      )}
    </div>
  )
}

export default ListCard
