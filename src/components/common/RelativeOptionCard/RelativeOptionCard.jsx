import { useNavigate } from 'react-router-dom'
import css from './RelativeOptionCard.module.css'

const RelativeOptionCard = ({ festival, currentTitle }) => {
  const { firstimage, title, dist, contentid, contenttypeid } = festival
  const navigate = useNavigate()

  /*디테일 페이지 이동*/
  const moveDetailPage = () => {
    navigate(`/detail/${contenttypeid}/${contentid}`)
  }
  return (
    <div className={css.box} onClick={moveDetailPage}>
      <div className={css.imgWrap}>
        <img src={firstimage || '/assets/imgs/noImageImg.png'} alt={title} />
      </div>
      <h3 className={css.title}>{title}</h3>
      <p className={css.dist}>
        {currentTitle}으로부터 {(dist / 1000).toFixed(1)}km 떨어져있어요!
      </p>
    </div>
  )
}

export default RelativeOptionCard
