import { useState } from 'react'
import DetailBasicInfo from './DetailBasicInfo'
import FestivalInfo from './FestivalInfo'
import FestivalSlider from './FestivalSlider/FestivalSlider'
import css from './Detail.module.css'

const DetailContent = ({ common, contenttypeid, festivals, intro }) => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => setExpanded(prev => !prev)
  return (
    <div className={css.content}>
      <div className={css.descriptionCon}>
        <h3>상세 설명</h3>
        <hr className={css.divider} />
        <p className={`${!expanded ? css.clamped : ''}`}>{common.overview}</p>
        {common.overview.length > 0 && (
          <button className={css.toggleBtn} onClick={toggleExpanded}>
            {expanded ? '간단히' : '더보기'}
          </button>
        )}
      </div>
      <DetailBasicInfo common={common} intro={intro} />
      {contenttypeid !== '15' ? <></> : <FestivalInfo intro={intro} />}
      <FestivalSlider festivals={festivals} commonTitle={common.title} />
    </div>
  )
}

export default DetailContent
