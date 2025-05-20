import React from 'react'
import { useNavigate } from 'react-router-dom'
import css from './ListCard.module.css'
import StarIcon from '@/assets/icons/starIcon.svg?react'
import HeartToggle from '@/components/common/ListCard/HeartToggle'

// contentid 해시로 3.5~5.0 별점 계산 함수
function getRatingFromId(id) {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % 1000
  }
  return (3.5 + (hash % 150) / 100).toFixed(1)
}

// contentid 해시로 1~99 리뷰 수 계산 함수
function getReviewCountFromId(id) {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 17 + id.charCodeAt(i)) % 100
  }
  return Math.max(1, hash) // 1 이상 99 이하
}

const ListCard = ({
  firstimage,
  title,
  addr1,
  addr2,
  contentid,
  contenttypeid,
  mapx,
  mapy,
  onClick,
  isFavorite = false,
  className = '',
}) => {
  const navigate = useNavigate()

  const handleClick = e => {
    e.stopPropagation()
    if (onClick) {
      onClick() // 바텀시트에서 받은 onItemClick 호출
    } else if (isFavorite) {
      return
    } else navigate(`/detail/${contenttypeid}/${contentid}`)
  }

  const randomRating = getRatingFromId(contentid)
  const randomReviewCount = getReviewCountFromId(contentid)

  return (
    <div className={`${css.card} ${className}`} onClick={handleClick}>
      <div className={css.thumbnail}>
        <img src={firstimage || '/noImageImg.png'} alt={title} />
      </div>
      <div className={css.content}>
        <h3 className={css.title}>{title}</h3>
        <p className={css.rating}>
          <span className={css.starIcon}>
            <StarIcon />
          </span>{' '}
          {randomRating} ({randomReviewCount})
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
