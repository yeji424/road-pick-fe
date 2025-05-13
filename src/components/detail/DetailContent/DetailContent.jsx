import DetailBasicInfo from '../BasicInfo/DetailBasicInfo'
import FestivalInfo from '../FestivalInfo/FestivalInfo'
import FestivalSlider from '../FestivalSlider/FestivalSlider'
import TourInfo from '../TourInfo/TourInfo'
import css from './DetailContent.module.css'

const DetailContent = ({ common, contenttypeid, festivals, intro }) => {
  return (
    <div className={css.content}>
      <h3 className={css.infointro}>{common.title} 관련 정보</h3>
      <p>{common.overview}</p>
      <DetailBasicInfo common={common} intro={intro} />
      {contenttypeid !== '15' ? <TourInfo intro={intro} /> : <FestivalInfo intro={intro} />}
      <FestivalSlider festivals={festivals} commonTitle={common.title} />
    </div>
  )
}

export default DetailContent
