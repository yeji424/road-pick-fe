import React, { useState } from 'react'
import css from './BottomSheet.module.css'
import ArrowUpIcon from '@/assets/icons/arrowUpIcon.svg?react'
import MoreIcon from '@/assets/icons/moreIcon.svg?react'

const BottomSheetPlan = () => {
  const plans = [
    {
      date: '2025.05.12',
      activities: [
        { name: '광화문 방문', memo: '사진 많이 찍기' },
        { name: '경복궁 관람', memo: '입장 시간 확인' },
        {
          name: '북촌 한옥마을 산책',
          memo: '두줄일 경우 보여주려고 길게게게ㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔ',
        },
      ],
    },
    {
      date: '2025.05.13',
      activities: [
        { name: '남산타워', memo: '야경 보기' },
        { name: '명동 쇼핑', memo: '화장품 할인 체크' },
        { name: '한강 공원', memo: '자전거 대여' },
      ],
    },
    {
      date: '2025.05.14',
      activities: [
        { name: '동대문 시장', memo: '도매 구역 보기' },
        { name: '홍대 거리', memo: '버스킹 공연 보기' },
        { name: '이태원 탐방', memo: '외국 음식 시도' },
      ],
    },
  ]

  return (
    <div className={css.contentWrapper}>
      {plans.map(({ date, activities }, index) => (
        <PlanDayBlock key={date} day={`Day ${index + 1}`} date={date} activities={activities} />
      ))}
    </div>
  )
}

const PlanDayBlock = ({ day, date, activities }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={css.planDaySection}>
      <div className={css.planDayHeader}>
        <button className={css.toggleButton} onClick={() => setIsOpen(prev => !prev)}>
          <ArrowUpIcon className={isOpen ? css.iconUp : css.iconDown} />
        </button>
        <h3 className={css.planDayTitle}>{day}</h3>
        <span className={css.planDayDate}>{date}</span>
      </div>

      {isOpen && (
        <ul className={css.planActivitiesList}>
          {activities.map(({ name, memo }, idx) => (
            <li key={idx} className={css.planActivityItem}>
              <div className={css.activityHeader}>
                <div className={css.activityName}>{name}</div>
                <MoreIcon className={css.moreIcon} />
              </div>
              <div className={css.activityMemo}>{memo}</div>
            </li>
          ))}
        </ul>
      )}

      <div className={css.plusButtons}>
        <button className={css.locationPlus}>장소 추가</button>
        <button className={css.memoPlus}>메모 추가</button>
      </div>
    </div>
  )
}

export default BottomSheetPlan
