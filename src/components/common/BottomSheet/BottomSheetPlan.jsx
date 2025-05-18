import React, { useState } from 'react'
import css from './BottomSheet.module.css'
import ArrowUpIcon from '@/assets/icons/arrowUpIcon.svg?react'
import MoreIcon from '@/assets/icons/moreIcon.svg?react'
import { useNavigate } from 'react-router-dom'
import { formatDateToLocalString } from '../Calendar/CalendarLogic'
import { generateDateRange } from './generateDateRange'

const BottomSheetPlan = ({
  schedule,
  activitiesByDate,
  fetchDetailPlan,
  handleDeleteActivity,
  title,
}) => {
  const dateRange = generateDateRange(schedule.start, schedule.end)

  return (
    <div className={css.contentWrapper}>
      {dateRange.map((date, index) => {
        const formattedDate = formatDateToLocalString(date)
        const activities = activitiesByDate[formattedDate] || []

        return (
          <PlanDayBlock
            key={formattedDate}
            day={`Day ${index + 1}`}
            date={formattedDate}
            tripId={schedule.tripId}
            fetchDetailPlan={fetchDetailPlan}
            activities={activities}
            handleDeleteActivity={handleDeleteActivity}
            title={title}
          />
        )
      })}
    </div>
  )
}

const PlanDayBlock = ({ day, date, tripId, activities, handleDeleteActivity, title }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [openMenuId, setOpenMenuId] = useState(1)
  const navigate = useNavigate()

  const moveSaveListPage = () => {
    navigate('/saveList', {
      state: {
        date,
        tripId,
        day,
        title,
      },
    })
  }

  const handleToggleMenu = activityId => {
    setOpenMenuId(prev => (prev === activityId ? null : activityId))
  }

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
          {activities.map(activity => (
            <li key={activity._id} className={css.planActivityItem}>
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
