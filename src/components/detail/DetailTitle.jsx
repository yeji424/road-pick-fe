import css from './Detail.module.css'
import HeartToggle from '@/components/common/ListCard/HeartToggle'
const DetailTitle = ({ common }) => {
  return (
    <div className={css.titlewrap}>
      <h3>{common.title}</h3>
      <div className={css.saveBtn}>
        <HeartToggle />
      </div>
    </div>
  )
}

export default DetailTitle
