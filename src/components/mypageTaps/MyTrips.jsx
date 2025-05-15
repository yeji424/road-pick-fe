import css from './mypageTaps.module.css'
import PlusBtnIcon from '@/assets/icons/PlusBtnIcon.svg?react'
import TripListImg from '@/assets/imgs/TripListImg.png'
import MypageListCard from './MypageListCard'
import { useNavigate } from 'react-router-dom'

// 더미
const MyTrips = () => {
  const trips = [
    // { name: '강원도 여행', date: '2025.05.11 - 05.15', countryCnt: '2' },
    // { name: '서울 나들이', date: '2025.05.21', countryCnt: '1' },
    // { name: '부산 2박 3일', date: '2025.06.07 - 06.09', countryCnt: '1' },
    // { name: '강원도 여행', date: '2025.05.11 - 05.15', countryCnt: '2' },
    // { name: '서울 나들이', date: '2025.05.21', countryCnt: '1' },
    // { name: '부산 2박 3일', date: '2025.06.07 - 06.09', countryCnt: '1' },
  ]

  const navigate = useNavigate()

  const handleGoToCreateTrip = () => {
    navigate('/selectDate')
  }
  return (
    <div className={css.listContainer}>
      <div className={css.tripCreateCard} onClick={handleGoToCreateTrip}>
        <div className={css.plusIcon}>
          <PlusBtnIcon />
        </div>
        <div>
          <h4>여행 일정 만들기</h4>
          <p>새로운 여행을 떠나보세요.</p>
        </div>
      </div>
      {trips.length === 0 ? (
        <div className={css.empty} onClick={handleGoToCreateTrip}>
          <div className={css.emptyOverlay}>
            <PlusBtnIcon className={css.plusIcon} />
          </div>
          <p>다가오는 여행이 없습니다.</p>
          <p>여행 일정을 생성해보세요!</p>
        </div>
      ) : (
        <>
          <h3 className={css.title}>다가오는 여행</h3>
          <div className={css.tripList}>
            <div className={css.listTile}>
              {trips.map((trip, i) => (
                <MypageListCard
                  key={i}
                  thumbnail={<img src={TripListImg} alt="여행 이미지" />}
                  info={
                    <>
                      <h4>{trip.name}</h4>
                      <p>{trip.date}</p>
                      <p>{trip.countryCnt}개 도시</p>
                    </>
                  }
                  renderMoreMenu={() => (
                    <>
                      <button onClick={() => console.log(`${trip.name} 삭제`)}>일정 삭제</button>
                      <button onClick={() => console.log(`${trip.name} 순서 변경`)}>
                        순서 변경
                      </button>
                    </>
                  )}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MyTrips
