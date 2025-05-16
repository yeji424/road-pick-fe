import React from 'react'
import { useSpring } from 'react-spring'
import Header from '@/components/common/Header/Header'
import css from './PlanPage.module.css'
import UserIcon from '@/assets/icons/userIcon.svg?react'
import BottomSheet from '@/components/common/BottomSheet/BottomSheet'
import BottomSheetPlan from '@/components/common/BottomSheet/BottomSheetPlan'
import { useParams } from 'react-router-dom'
import Spinner from '@/components/loading/Spinner'
import { useScheduleDetail } from '@/hooks/useScheduleDetail'
import MultiPlaceMap from '@/components/common/Map/PlanMap'

const PlanPage = () => {
  // 현재 화면 높이 기준으로 snap 위치 계산
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const { tripId } = useParams()
  const { schedule, loading, error } = useScheduleDetail(tripId)
  console.log(schedule)

  const snapPoints = {
    full: 100, // 최상단
    mid: screenHeight * 0.6, // 중간
    min: screenHeight * 0.4, // 초기 위치 (40%)
  }

  const [{ y }, api] = useSpring(() => ({
    y: snapPoints.min, // 초기 바텀시트 위치
    config: { tension: 300, friction: 30 },
  }))

  if (!tripId) return <div>일정 ID 없음</div>

  if (loading) return <Spinner />
  if (error) return <div>error...</div>
  return (
    <main>
      <Header />
      <section className={css.infoSection}>
        <p className={css.tripTitle}>{schedule.title}</p>
        <p className={css.tripDate}>
          {schedule.start}~{schedule.end}
        </p>
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
      <section>
        <MultiPlaceMap
          places={[
            { id: 1, name: '서울역', lat: 37.554722, lng: 126.970833 },
            { id: 2, name: '광화문', lat: 37.571389, lng: 126.976944 },
            { id: 3, name: '강남역', lat: 37.497942, lng: 127.027621 },
          ]}
        />
      </section>
      <BottomSheet className={css.planPageBottomSheet} snapPoints={snapPoints} y={y} api={api}>
        <BottomSheetPlan />
      </BottomSheet>
    </main>
  )
}

export default PlanPage
