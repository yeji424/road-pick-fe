import React, { Suspense, useEffect } from 'react'
import css from './BottomSheet.module.css'
import Spinner from '@/components/loading/Spinner'

const ListCard = React.lazy(() => import('@/components/common/ListCard/ListCard'))

const BottomSheetContent = ({ list, contentTypeId, setContentTypeId, onItemClick }) => {
  useEffect(() => {
    if (contentTypeId == 12) {
      setContentTypeId(12)
    }
    if (contentTypeId == 15) {
      setContentTypeId(15)
    }
  }, [])

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

      {list === undefined ? (
        <div className={css.loadingWrapper}>
          <Spinner />
        </div>
      ) : list.length === 0 ? (
        <p className={css.empty}>리스트가 없습니다.</p>
      ) : (
        <div className={css.listWrapper}>
          {list.map(item => (
            <Suspense key={item.contentid} fallback={<Spinner />}>
              <ListCard {...item} onClick={() => onItemClick(item)} />
            </Suspense>
          ))}
        </div>
      )}
    </div>
  )
}

export default BottomSheetContent
