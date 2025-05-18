import React from 'react'
import css from './Modal.module.css'
import { useNavigate } from 'react-router-dom'
import registerImg from '@/assets/imgs/registerImg.png'

const RegisterModal = ({ onClose }) => {
  const navigate = useNavigate()

  const handleLoginClick = () => {
    onClose()
    navigate('/login')
  }
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <button className={css.closeIcon} onClick={onClose}>
          ✕
        </button>
        <div className={css.icon}>
          <img src={registerImg} alt="회원가입에 완료되었습니다!" />
        </div>
        <p className={css.text}>회원가입이 완료되었습니다!</p>
        <button className={css.loginBtn} onClick={handleLoginClick}>
          로그인하기
        </button>
      </div>
    </div>
  )
}

export default RegisterModal
