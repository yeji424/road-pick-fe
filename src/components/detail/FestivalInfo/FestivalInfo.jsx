import css from './FestivalInfo.module.css'

const FestivalInfo = ({ intro }) => {
  return (
    <>
      <div>
        <h3>장소</h3>
        <p>{intro.eventplace}</p>
      </div>
      <div>
        <h3>대상 연령</h3>
        <p>{intro.agelimit ? intro.agelimit : '연령 무관'}</p>
      </div>
      <div>
        <h3>행사 시간</h3>
        <p>{intro.playtime}</p>
      </div>
      <div>
        <h3>이용료</h3>
        <p>
          {intro.usetimefestival ? intro.usetimefestival.replace(/<br\s*\/?>/gi, '\n') : '무료'}
        </p>
      </div>
      <div>
        <h3>주최/문의</h3>
        <div className={css.notice}>
          <p>주최: {intro.sponsor1}</p>
          <p>문의: {intro.sponsor1tel}</p>
        </div>
      </div>
    </>
  )
}

export default FestivalInfo
