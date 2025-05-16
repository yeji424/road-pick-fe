import React, { useState } from 'react'
import css from './BottomSheet.module.css'
import ListCard from '@/components/common/ListCard/ListCard'
import SortDropdown from './SortDropdown'

const BottomSheetContent = ({ list, contentTypeId, setContentTypeId, onItemClick }) => {
  const [sortBy, setSortBy] = useState('name')

  if (!list || list.length === 0) return <div>데이터 불러오는 중..</div>

  const titleText = contentTypeId === 12 ? ' 근처 유명 관광지' : ' 근처 유명 축제/행사'

  return (
    <div className={css.contentWrapper}>
      <div className={css.tabWrapper}>
        <button
          className={`${css.tabButton} ${contentTypeId === 15 ? '' : css.active}`}
          onClick={() => setContentTypeId(12)}
        >
          관광지
        </button>
        <button
          className={`${css.tabButton} ${contentTypeId === 15 ? css.active : ''}`}
          onClick={() => setContentTypeId(15)}
        >
          축제/행사
        </button>
      </div>

      <div className={css.headerRow}>
        <h2 className={css.title}>주변 검색</h2>
        <SortDropdown sortBy={sortBy} onChange={setSortBy} />
      </div>

      <div className={css.listWrapper}>
        {list.map(item => (
          <div key={item.contentid} className={css.listItemWrapper}>
            <ListCard {...item} />
            <div className={css.itemOverlay} onClick={() => onItemClick(item)} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BottomSheetContent
