import React, { useEffect, useState } from 'react'
import { useSpring } from 'react-spring'
import Header from '@/components/common/Header/Header'
import css from './PlanPage.module.css'
import UserIcon from '@/assets/icons/userIcon.svg?react'
import BottomSheet from '@/components/common/BottomSheet/BottomSheet'
import BottomSheetPlan from '@/components/common/BottomSheet/BottomSheetPlan'
import { useLocation, useParams } from 'react-router-dom'
import Spinner from '@/components/loading/Spinner'
import { useScheduleDetail } from '@/hooks/useScheduleDetail'
import MultiPlaceMap from '@/components/common/Map/PlanMap'
import { formatDateToLocalString } from '@/components/common/Calendar/CalendarLogic'
import { deleteScheduleDetail, getScheduleDetailList } from '@/apis/schedulsDetailApi'



const PlanPage = () => {
  // 현재 화면 높이 기준으로 snap 위치 계산
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const { tripId } = useParams()
  const location = useLocation()
  const { title } = location.state
  const { data: schedule, loading, error } = useScheduleDetail(tripId)
  const [activitiesByDate, setActivitiesByDate] = useState({})

  const snapPoints = {
    full: 0, // 최상단
    mid: screenHeight * 0.6, // 중간
    min: screenHeight * 0.4, // 초기 위치 (60%)
  }

  const [{ y }, api] = useSpring(() => ({
    y: snapPoints.mid, // 초기 바텀시트 위치
    config: { tension: 300, friction: 30 },
  }))

  // 날짜별로 그룹화하는 유틸 함수
  const groupActivitiesByDate = activities => {
    if (!Array.isArray(activities)) return {}
    return activities.reduce((acc, activity) => {
      const date = formatDateToLocalString(activity.visitDate)
      if (!acc[date]) acc[date] = []
      acc[date].push(activity)
      return acc
    }, {})
  }

  // 전체 일정 한번에 불러오기
  const fetchAllDetailPlans = async () => {
    if (!schedule?.tripId) return
    try {
      const allActivities = await getScheduleDetailList(schedule.tripId)
      const grouped = groupActivitiesByDate(allActivities)
      setActivitiesByDate(grouped)
    } catch (err) {
      console.error('일정 전체 조회 실패:', err)
    }
  }

  const handleDeleteActivity = async (detailId, date) => {
    try {
      const formattedDate = formatDateToLocalString(date)
      await deleteScheduleDetail(detailId, schedule.tripId, formattedDate)

      setActivitiesByDate(prev => ({
        ...prev,
        [formattedDate]: prev[formattedDate].filter(activity => activity._id !== detailId),
      }))
    } catch (error) {
      console.error('삭제 실패:', error)
    }
  }
  const allActivities = Object.values(activitiesByDate).flat()
  const placeList = allActivities.map(activity => {
    if (!activity || !activity.destination || !activity._id) return null

    const rawLat = activity.destination.mapy
    const rawLng = activity.destination.mapx

    const lat = parseFloat((rawLat / 10000000000).toFixed(7)) // 위도
    const lng = parseFloat((rawLng / 10000000000).toFixed(7)) // 경도
    if (isNaN(lat) || isNaN(lng)) return null

    return {
      id: activity._id,
      name: activity.destination.title,
      lat,
      lng,
    }
  })
  useEffect(() => {
    if (schedule && schedule.tripId) {
      fetchAllDetailPlans()
    }
  }, [schedule])

  if (loading || !schedule || !tripId) return <Spinner />
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
        {allActivities.length > 0 ? (
          <MultiPlaceMap places={placeList} />
        ) : (
          <div className={css.planPrompt}>
            <h3 className={css.planTitle}>하루하루 구체적인 </h3>
            <h3 className={css.planTitle}>여행 일정을 추가해 보세요!</h3>
          </div>
        )}
      </section>
      <BottomSheet className={css.planPageBottomSheet} snapPoints={snapPoints} y={y} api={api}>
        <BottomSheetPlan
          schedule={schedule}
          activitiesByDate={activitiesByDate}
          fetchDetailPlan={fetchAllDetailPlans}
          handleDeleteActivity={handleDeleteActivity}
          title={title}
        />
      </BottomSheet>
    </main>
  )
}

export default PlanPage
