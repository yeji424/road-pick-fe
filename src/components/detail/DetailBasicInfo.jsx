import DetailMap from '@/components/common/Map/DetailMap'
import css from './Detail.module.css'
import { useNavigate } from 'react-router-dom'

const LabelRow = ({ label, children }) => (
  <div className={css.row}>
    <span className={css.label}>{label}</span>
    <span className={css.value}>{children}</span>
  </div>
)

const DetailBasicInfo = ({ common, intro }) => {
  const navigate = useNavigate()

  // 지도 클릭 시 MapPage로 이동하면서 mapx/mapy 전달
  const handleMapClick = () => {
    navigate('/map', { state: { mapx: common.mapx, mapy: common.mapy } })
  }

  return (
    <>
      <div className={css.basicinfo}>
        <h3>기본 정보</h3>
        <hr className={css.divider} />
        <LabelRow label="주소">{common.addr1}</LabelRow>
        <LabelRow label="전화">{intro.infocenter ? intro.infocenter : common.tel}</LabelRow>
        <LabelRow label="홈페이지">
          <span dangerouslySetInnerHTML={{ __html: common.homepage }} />
        </LabelRow>
        <LabelRow label="지도" />
        <div onClick={handleMapClick}>
          {common && <DetailMap mapy={common.mapy} mapx={common.mapx} />}
        </div>
      </div>

      <div className={css.basicinfo}>
        <h3>부가 정보</h3>
        <hr className={css.divider} />
        <LabelRow label="개장일">
          {intro.usetime ? intro.usetime.replace(/<br\s*\/?>/gi, '\n') : '상시개방'}
        </LabelRow>
        <LabelRow label="휴무일">
          {intro.restdate ? intro.restdate.replace(/<br\s*\/?>/gi, '\n') : '연중무휴'}
        </LabelRow>
        <LabelRow label="주차">
          {intro.parking ? intro.parking.replace(/<br\s*\/?>/gi, '\n') : '제공된 정보가 없습니다.'}
        </LabelRow>
        <LabelRow label="체험">
          {intro.expquide ? intro.expquide.replace(/<br\s*\/?>/gi, '\n') : '제공된 정보가 없습니다'}
        </LabelRow>
        <LabelRow label="반려동물">{intro.chkpet ? intro.chkpet : '동반 불가'}</LabelRow>
      </div>
    </>
  )
}

export default DetailBasicInfo
