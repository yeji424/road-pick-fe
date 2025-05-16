import Calendar from '@/components/common/Calendar/Calendar'
import css from './CalendarPage.module.css'
import React from 'react'

import { useScheduleList } from '@/hooks/useScheduleList'
import Spinner from '@/components/loading/Spinner'

const CalendarPage = () => {
  const { schedules, loading, error } = useScheduleList()
  if (loading) return <Spinner />
  if (error) return <div>error...</div>

  return (
    <main className={css.container}>
      <h2>여행일정</h2>
      <p className={css.description}>여행일정을 한 눈에 확인하세요!</p>
      <Calendar schedules={schedules} />
    </main>
  )
}

export default CalendarPage
