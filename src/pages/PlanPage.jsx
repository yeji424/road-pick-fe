import React, { useEffect, useState } from 'react'
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
import { formatDateToLocalString } from '@/components/common/Calendar/CalendarLogic'
import { deleteScheduleDetail, getScheduleDetailByDate } from '@/apis/schedulsDetailApi'
import { generateDateRange } from '@/components/common/BottomSheet/generateDateRange'
import { useTourDetailCommons } from '@/hooks/useDetailsCommon'

const PlanPage = () => {
  // 현재 화면 높이 기준으로 snap 위치 계산
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const { tripId } = useParams()
  const { schedule, loading, error } = useScheduleDetail(tripId)
  const [activitiesByDate, setActivitiesByDate] = useState({})

  const snapPoints = {
    full: 100, // 최상단
    mid: screenHeight * 0.6, // 중간
    min: screenHeight * 0.2, // 초기 위치 (40%)
  }

  const [{ y }, api] = useSpring(() => ({
    y: snapPoints.min, // 초기 바텀시트 위치
    config: { tension: 300, friction: 30 },
  }))

  const fetchDetailPlan = async date => {
    const formattedDate = formatDateToLocalString(date)
    const response = await getScheduleDetailByDate(schedule.tripId, formattedDate)

    setActivitiesByDate(prev => ({
      ...prev,
      [formattedDate]: response,
    }))
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
  const range = generateDateRange(schedule.start, schedule.end)
  const selectedDate = range[0] // 예: Day 1만 먼저 표시
  const selectedActivities = activitiesByDate[formatDateToLocalString(selectedDate)] || []
  const tourItems = selectedActivities
    .map(a => a.destination)
    .filter(d => d?.contentid && d?.contenttypeid)
    .map(d => ({
      contentId: d.contentid,
      contentTypeId: d.contenttypeid,
    }))

  const { data: commonDataList, isLoading } = useTourDetailCommons(tourItems)
  const placeList = commonDataList.map((data, index) => {
    const activity = selectedActivities[index]
    if (!data) return
    const dest = data[index]
    console.log(dest)
    if (!dest || !activity?._id) return null

    const lat = parseFloat(dest.mapy)
    const lng = parseFloat(dest.mapx)

    if (isNaN(lat) || isNaN(lng)) return null

    return {
      id: activity._id,
      name: dest.title,
      lat,
      lng,
    }
  })

  console.log(placeList)
  useEffect(() => {
    if (schedule && range.length > 0) {
      fetchDetailPlan(range[0])
    }
  }, [schedule])

  if (loading || isLoading) return <Spinner />
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
        <MultiPlaceMap places={placeList} />
      </section>
      <BottomSheet className={css.planPageBottomSheet} snapPoints={snapPoints} y={y} api={api}>
        <BottomSheetPlan
          schedule={schedule}
          activitiesByDate={activitiesByDate}
          fetchDetailPlan={fetchDetailPlan}
          handleDeleteActivity={handleDeleteActivity}
        />
      </BottomSheet>
    </main>
  )
}

export default PlanPage
