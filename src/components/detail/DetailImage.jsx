import css from './Detail.module.css'

const DetailImage = ({ common }) => {
  return (
    <div className={css.imgwrap}>
      <img src={common.firstimage || '/imgs/noImageImg.png'} alt={common.title} />
    </div>
  )
}

export default DetailImage
