import DetailMap from '@/components/common/Map/DetailMap'
import css from './DetailBasicInfo.module.css'

const DetailBasicInfo = ({ common, intro }) => {
  return (
    <div className={css.basicinfo}>
      <h3>기본 정보</h3>
      {common && <DetailMap mapy={common.mapy} mapx={common.mapx} />}
      <p>주소 {common.addr1}</p>
      <p>전화 {intro.infocenter ? intro.infocenter : common.tel}</p>
      <div className={css.homepage}>
        <span>홈페이지 </span>
        <span dangerouslySetInnerHTML={{ __html: common.homepage }} />
      </div>
    </div>
  )
}

export default DetailBasicInfo
