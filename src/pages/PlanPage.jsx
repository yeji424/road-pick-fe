import React from 'react'
import { useSpring } from 'react-spring'
import Header from '@/components/common/Header/Header'
import css from './PlanPage.module.css'
import UserIcon from '@/assets/icons/userIcon.svg?react'
import BottomSheet from '@/components/common/BottomSheet/BottomSheet'
import BottomSheetPlan from '@/components/common/BottomSheet/BottomSheetPlan'

const PlanPage = () => {
  // 현재 화면 높이 기준으로 snap 위치 계산
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800

  const snapPoints = {
    full: 100, // 최상단
    mid: screenHeight * 0.6, // 중간
    min: screenHeight * 0.4, // 초기 위치 (40%)
  }

  const [{ y }, api] = useSpring(() => ({
    y: snapPoints.min, // 초기 바텀시트 위치
    config: { tension: 300, friction: 30 },
  }))

  return (
    <main>
      <Header />

      <section className={css.infoSection}>
        <p className={css.tripTitle}>어디로 여행</p>
        <p className={css.tripDate}>2025.05.11 - 05.15</p>
      </section>

      <h2 className={css.description}>하루하루 구체적인 계획을 세워보아요!</h2>

      <section className={css.friendSection}>
        {[...Array(3)].map((_, idx) => (
          <div
            className={`${css.friendIcon} ${css[`color${idx + 1}`]}`}
            key={idx}
            style={{ zIndex: idx + 1 }}
          >
            <UserIcon className={css.userIcon} />
          </div>
        ))}

        <button className={css.addButton} style={{ zIndex: 3 }}>
          + 인원추가
        </button>
      </section>

      <BottomSheet className={css.planPageBottomSheet} snapPoints={snapPoints} y={y} api={api}>
        <BottomSheetPlan />
      </BottomSheet>
    </main>
  )
}

export default PlanPage
