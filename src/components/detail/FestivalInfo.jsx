import css from './Detail.module.css'
const LabelRow = ({ label, children }) => (
  <div className={css.row}>
    <span className={css.label}>{label}</span>
    <span className={css.value}>{children}</span>
  </div>
)

const FestivalInfo = ({ intro }) => {
  return (
    <div>
      <h3>축제 정보</h3>
      <hr className={css.divider} />
      <LabelRow label="장소">{intro.eventplace}</LabelRow>
      <LabelRow label="대상 연령">{intro.agelimit ? intro.agelimit : '연령 무관'}</LabelRow>
      <LabelRow label="행사 시간">{intro.playtime}</LabelRow>
      <LabelRow label="이용료">
        {intro.usetimefestival ? intro.usetimefestival.replace(/<br\s*\/?>/gi, '\n') : '무료'}
      </LabelRow>
      <LabelRow label="주최/문의">
        <div className={css.notice}>
          <p>
            {intro.sponsor1} / {intro.sponsor1tel}
          </p>
        </div>
      </LabelRow>
    </div>
  )
}

export default FestivalInfo
