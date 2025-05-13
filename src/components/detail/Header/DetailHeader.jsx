import { useNavigate } from 'react-router-dom'
import css from './DetailHeader.module.css'

const DetailHeader = () => {
  const navigate = useNavigate()
  const backPage = () => {
    navigate(-1)
  }
  return (
    <div className={css.head}>
      <img
        className={css.back}
        onClick={backPage}
        src="/src/assets/icons/arrowLeftIcon.svg"
        alt="뒤로가기"
      />
      <p>상세 정보</p>
      <button className={css.plus}>일정 추가</button>
    </div>
  )
}

export default DetailHeader
