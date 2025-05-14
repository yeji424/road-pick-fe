import React from 'react'
import { useNavigate } from 'react-router-dom'
import css from './Header.module.css'
import ArrowLeftIcon from '@/assets/icons/arrowLeftIcon.svg?react'

const Header = ({ title, showButton = false, buttonText = '일정 추가', onButtonClick }) => {
  const navigate = useNavigate()
  const backPage = () => {
    navigate(-1)
  }

  return (
    <div className={css.head}>
      <ArrowLeftIcon onClick={backPage} className={css.arrowLeftIcon} />
      {title && <p>{title}</p>}
      {showButton && (
        <button className={css.plus} onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  )
}

export default Header
