import css from './DetailTitle.module.css'

const DetailTitle = ({ common }) => {
  return (
    <div className={css.titlewrap}>
      <h3>{common.title}</h3>
      <img className={css.archive} src="/src/assets/icons/archiveAddIcon.svg" alt="" />
    </div>
  )
}

export default DetailTitle
