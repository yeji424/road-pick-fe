import css from './mypageTaps.module.css'
import { useEffect, useState } from 'react'
import PlusBtnIcon from '@/assets/icons/PlusBtnIcon.svg?react'
import TripListImg from '@/assets/imgs/TripListImg.png'
import MypageListCard from './MypageListCard'
import { useScheduleList } from '@/hooks/useScheduleList'
import Spinner from '../loading/Spinner'
import { deleteSchedule } from '@/apis/scheduleApi'
import { useNavigate } from 'react-router-dom'

// 더미
const MyTrips = () => {
  const { schedules, loading, error } = useScheduleList()
  const [trips, setTrips] = useState([])
  const navitate = useNavigate()
  useEffect(() => {
    // schedules가 바뀔 때마다 로컬 상태에도 반영
    if (schedules) {
      setTrips(schedules)
    }
  }, [schedules])

  const handleDelete = async scheduleId => {
    if (!scheduleId) return
    try {
      console.log(scheduleId)
      const response = await deleteSchedule(scheduleId)
      setTrips(prevTrips => prevTrips.filter(trip => trip.tripId !== scheduleId))
      console.log('삭제 성공:', response.data)
    } catch (err) {
      console.error('삭제 실패:', err.response?.data || err.message)
    }
  }

  console.log(trips)
  if (loading) return <Spinner />
  if (error) return <div>error...</div>

  return (
    <div className={css.listContainer}>
      <div className={css.tripCreateCard} onClick={() => navitate('/SelectDate')}>
        <div className={css.plusIcon}>
          <PlusBtnIcon />
        </div>
        <div>
          <h4>여행 일정 만들기</h4>
          <p>새로운 여행을 떠나보세요.</p>
        </div>
      </div>

      <h3 className={css.title}>다가오는 여행</h3>
      <div className={css.tripList}>
        <div className={css.listTile}>
          {trips.map(trip => (
            <MypageListCard
              key={trip.tripId}
              thumbnail={<img src={TripListImg} alt="여행 이미지" />}
              info={
                <>
                  <h4>{trip.title}</h4>
                  <p>
                    {trip.start}~{trip.end}
                  </p>
                  <p>{trip.countryCnt}개 도시</p>
                </>
              }
              renderMoreMenu={() => (
                <button onClick={() => handleDelete(trip.tripId)}>일정 삭제</button>
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyTrips
