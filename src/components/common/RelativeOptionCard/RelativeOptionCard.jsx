import { useNavigate } from 'react-router-dom'
import css from './RelativeOptionCard.module.css'

const RelativeOptionCard = ({ festival, currentTitle }) => {
  const { firstimage, title, dist, contentid, contenttypeid } = festival
  const navigate = useNavigate()

  const moveDetailPage = () => {
    navigate(`/detail/${contenttypeid}/${contentid}`)
  }
  return (
    <div className={css.box} onClick={moveDetailPage}>
      <div className={css.imgWrap}>
        <img src={firstimage} alt={title} />
      </div>
      <h3 className={css.title}>{title}</h3>
      <h6 className={css.dist}>
        {currentTitle}으로부터 {(dist / 1000).toFixed(1)} 떨어져있어요!
      </h6>
    </div>
  )
}

export default RelativeOptionCard
