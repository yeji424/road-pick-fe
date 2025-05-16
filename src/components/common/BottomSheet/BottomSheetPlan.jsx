import React, { useState } from 'react'
import css from './BottomSheet.module.css'
import ArrowUpIcon from '@/assets/icons/arrowUpIcon.svg?react'
import MoreIcon from '@/assets/icons/moreIcon.svg?react'
import { useNavigate } from 'react-router-dom'
import { formatDateToLocalString } from '../Calendar/CalendarLogic'
import { generateDateRange } from './generateDateRange'

const BottomSheetPlan = ({ schedule, activitiesByDate, fetchDetailPlan, handleDeleteActivity }) => {
  const dateRange = generateDateRange(schedule.start, schedule.end)

  return (
    <div className={css.contentWrapper}>
      {dateRange.map((date, index) => (
        <PlanDayBlock
          key={date}
          day={`Day ${index + 1}`}
          date={date}
          tripId={schedule.tripId}
          fetchDetailPlan={fetchDetailPlan}
          activities={activitiesByDate[formatDateToLocalString(date)] || []}
          handleDeleteActivity={handleDeleteActivity}
        />
      ))}
    </div>
  )
}

const PlanDayBlock = ({ day, date, tripId, fetchDetailPlan, activities, handleDeleteActivity }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [openMenuId, setOpenMenuId] = useState(null)
  const navigate = useNavigate()
  const moveSaveListPage = () => {
    navigate('/saveList', { state: { date: date, tripId: tripId, day: day } })
  }
  const handleToggleMenu = activityId => {
    setOpenMenuId(prev => (prev === activityId ? null : activityId))
  }
  return (
    <div className={css.planDaySection}>
      <div className={css.planDayHeader}>
        <button
          className={css.toggleButton}
          onClick={async () => {
            await fetchDetailPlan(date) // ✅ props로 받은 함수 실행
            setIsOpen(prev => !prev)
          }}
        >
          <ArrowUpIcon className={isOpen ? css.iconUp : css.iconDown} />
        </button>
        <h3 className={css.planDayTitle}>{day}</h3>
        <span className={css.planDayDate}>{date}</span>
      </div>

      {isOpen && (
        <ul className={css.planActivitiesList}>
          {activities.map((activity, idx) => (
            <li key={idx} className={css.planActivityItem}>
              <div className={css.activityHeader}>
                <div className={css.activityName}>{activity.destination.title}</div>
                <div className={css.more} onClick={() => handleToggleMenu(activity._id)}>
                  <MoreIcon className={css.more} />
                  {openMenuId === activity._id && (
                    <div className={css.moreMenu}>
                      <button onClick={() => handleDeleteActivity(activity._id, date)}>
                        일정 삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className={css.activityMemo}>{activity.destination.addr1}</div>
            </li>
          ))}
        </ul>
      )}

      <div className={css.plusButtons}>
        <button className={css.locationPlus} onClick={moveSaveListPage}>
          장소 추가
        </button>
        <button className={css.memoPlus}>메모 추가</button>
      </div>
    </div>
  )
}

export default BottomSheetPlan
