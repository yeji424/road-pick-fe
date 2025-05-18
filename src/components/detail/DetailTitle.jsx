import css from './Detail.module.css'
import HeartToggle from '@/components/common/ListCard/HeartToggle'
const DetailTitle = ({ common }) => {
  return (
    <div className={css.titlewrap}>
      <h3>{common.title}</h3>
      <div className={css.saveBtn}>
        <HeartToggle
          contentid={common.contentid}
          contenttypeid={common.contenttypeid}
          firstimage={common.firstimage}
          title={common.title}
          addr1={common.addr1}
          addr2={common.addr2}
          mapx={common.mapx}
          mapy={common.mapy}
        />
      </div>
    </div>
  )
}

export default DetailTitle
