import React from 'react'
import css from './mypageTaps.module.css'
import PlusBtnIcon from '@/assets/icons/PlusBtnIcon.svg?react'

const MyTrips = () => {
  const trips = []

  return (
    <>
      <div className={css.tripCreateCard}>
        <div className={css.plusIcon}>
          <PlusBtnIcon />
        </div>
        <div>
          <h4>여행 일정 만들기</h4>
          <p>새로운 여행을 떠나보세요.</p>
        </div>
      </div>

      <h3 className={css.title}>다가오는 여행</h3>
      <div className={css.tripList}>
        {trips.length === 0 ? (
          <div className={css.empty}>
            <div className={css.emptyOverlay}>
              <PlusBtnIcon className={css.plusIcon} />
            </div>
            <p>다가오는 여행이 없습니다.</p>
            <p>여행 일정을 생성해보세요!</p>
          </div>
        ) : // trips.map(...)
        null}
      </div>
    </>
  )
}

export default MyTrips
