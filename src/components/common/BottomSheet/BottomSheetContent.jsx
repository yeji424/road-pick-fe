import React, { useEffect } from 'react'
import css from './BottomSheet.module.css'
import ListCard from '@/components/common/ListCard/ListCard'

const BottomSheetContent = ({ list, contentTypeId, setContentTypeId, onItemClick }) => {
  useEffect(() => {
    if (contentTypeId == 12) {
      setContentTypeId(12)
    }
    if (contentTypeId == 15) {
      setContentTypeId(15)
    }
  }, [])

  if (!list || list.length === 0) return <div>데이터 불러오는 중..</div>

  return (
    <div className={css.contentWrapper}>
      <div className={css.tabWrapper}>
        <button
          className={`${css.tabButton} ${contentTypeId === 12 ? css.active : ''}`}
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
