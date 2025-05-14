import React, { useState } from 'react'
import css from './BottomSheet.module.css'
import ListCard from '@/components/common/ListCard/ListCard'
import SortDropdown from './SortDropdown'


const BottomSheetContent = ({ list,setContentTypeId }) => {
  const [sortBy, setSortBy] = useState('name')
  if (list.length === 0 || !list) return <div>데이터 불러오는중..</div>

  return (
    <div className={css.contentWrapper}>
      {/* 카테고리 탭 */}
      <div className={css.tabWrapper}>
        <button className={css.tabButton} onClick={() => setContentTypeId(12)}>
          관광지
        </button>
        <button className={css.tabButton} onClick={() => setContentTypeId(15)}>
          축제/행사
        </button>
      </div>

      {/* 타이틀 + 정렬 */}
      <div className={css.headerRow}>
        <h2 className={css.title}>서울 유명 관광지</h2>
        <SortDropdown sortBy={sortBy} onChange={setSortBy} />
      </div>

      {/* 리스트 영역 */}
      <div className={css.listWrapper}>
        {list?.map((item, idx) => (
          <div key={idx} className={css.listItemPlaceholder}>
            <ListCard key={idx} {...item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BottomSheetContent
