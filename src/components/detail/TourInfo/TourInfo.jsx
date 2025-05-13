import css from './TourInfo.module.css'

const TourInfo = ({ intro }) => {
  return (
    <>
      <div className={css.usetime}>
        <h3>개장일</h3>
        <p>{intro.usetime ? intro.usetime.replace(/<br\s*\/?>/gi, '\n') : '상시개방'}</p>
      </div>
      <div>
        <h3>휴무일</h3>
        <p>{intro.restdate ? intro.restdate.replace(/<br\s*\/?>/gi, '\n') : '연중무휴'}</p>
      </div>
      <div>
        <h3>주차 안내</h3>
        <p>{intro.parking ? intro.parking.replace(/<br\s*\/?>/gi, '\n') : '없음'}</p>
      </div>
      <div>
        <h3>체험 안내</h3>
        <p>{intro.expquide ? intro.expquide.replace(/<br\s*\/?>/gi, '\n') : '없음'}</p>
      </div>
      <div>
        <h3>유모차 이용 가능 여부</h3>
        <p>{intro.chkbabycarriage}</p>
      </div>
      <div>
        <h3>반려동물 동반 가능 여부</h3>
        <p>{intro.chkpet ? intro.chkpet : '불가'}</p>
      </div>
    </>
  )
}

export default TourInfo
