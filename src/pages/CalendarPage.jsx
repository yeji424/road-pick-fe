import Calendar from '@/components/common/Calendar/Calendar'
import css from './CalendarPage.module.css'
import React from 'react'
const schedules = [
  {
    title: '강원도 여행',
    start: '2025-05-02',
    end: '2025-05-04',
  },
  {
    title: '도쿄 여행',
    start: '2025-05-16',
    end: '2025-05-18',
  },
  {
    title: '제주도 여행',
    start: '2025-06-16',
    end: '2025-06-18',
  },
]
const CalendarPage = () => {
  return (
    <main className={css.maincontainer}>
      <h2>여행일정</h2>
      <p>설레는 여행일정으로 달력을 채워보세요!</p>
      <Calendar schedules={schedules} />
    </main>
  )
}

export default CalendarPage
