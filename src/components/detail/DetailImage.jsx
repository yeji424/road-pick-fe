import css from './Detail.module.css'
import noImage from './assets/imgs/noImageImg.png'

const DetailImage = ({ common }) => {
  return (
    <div className={css.imgwrap}>
      <img src={common.firstimage || noImage} alt={common.title} />
    </div>
  )
}

export default DetailImage
