import Calendar from '@/components/common/Calendar/Calendar'
import css from './CalendarPage.module.css'
import React from 'react'

import { useScheduleList } from '@/hooks/useScheduleList'
import Spinner from '@/components/loading/Spinner'
import { useSelector } from 'react-redux'

const CalendarPage = () => {
  const user = useSelector(state => state.auth.user)

  const userId = user?._id
  const { data: schedules, loading, error } = useScheduleList(userId)
  if (!user || loading || !schedules) return <Spinner />
  if (error) return <div>error...</div>

  return (
    <main className={css.container}>
      <div className={`${css.title} fadeInText`}>
        <h2>여행 일정</h2>
        <p className={css.description}>여행 일정을 한눈에 확인하세요!</p>
      </div>
      <div className={css.calendarArea}>
        <Calendar schedules={schedules} enableHover={false} />
      </div>
    </main>
  )
}

export default CalendarPage
