import { useNavigate } from 'react-router-dom'
import css from './Detail.module.css'
import ArrowLeftIcon from '@/assets/icons/arrowLeftIcon.svg?react'
const DetailHeader = () => {
  const navigate = useNavigate()
  const backPage = () => {
    navigate(-1)
  }
  return (
    <div className={css.head}>
      <ArrowLeftIcon onClick={backPage} className={css.arrowLeftIcon} />
      <p>상세 정보</p>
      <button className={css.plus}>일정 추가</button>
    </div>
  )
}

export default DetailHeader
