import Calendar from '@/components/common/Calendar/Calendar'
import css from './CalendarPage.module.css'
import React, { useEffect, useState } from 'react'

import { useScheduleList } from '@/hooks/useScheduleList'
import Spinner from '@/components/loading/Spinner'
import { useScheduleDetail } from '@/hooks/useScheduleDetail'

const CalendarPage = () => {
  const { schedules, loading, error } = useScheduleList()
  const [scheduleId, setScheduleId] = useState(null)
  const { schedule, loading: detailLoading, error: detailError } = useScheduleDetail(scheduleId)

  useEffect(() => {
    if (!loading && schedules.length >= 0) {
      setScheduleId(schedules[2]?.tripId)
    }
  }, [loading, schedules])

  console.log(schedule)
  if (!scheduleId) return <div>일정 ID 없음</div>
  if (loading || detailLoading) return <Spinner />
  if (error || detailError) return <div>error...</div>

  return (
    <main className={css.maincontainer}>
      <h2>여행일정</h2>
      <p>설레는 여행일정으로 달력을 채워보세요!</p>
      <Calendar schedules={schedules} />
    </main>
  )
}

export default CalendarPage
