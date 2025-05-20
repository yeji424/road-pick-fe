import React from 'react'
import css from './Modal.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/authSlice'
const LogoutModal = ({ onClose }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogoutClick = () => {
    onClose()
    dispatch(logout())
    navigate('/')
    //window.location.reload()
  }
  const handleCLoseClick = () => {
    onClose()
  }
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <button className={css.closeIcon} onClick={onClose}>
          ✕
        </button>
        <h3>로그아웃 하시겠습니까?</h3>
        <div className={css.btnArea}>
          <button className={css.closeBtn} onClick={handleCLoseClick}>
            닫기
          </button>
          <button className={css.successBtn} onClick={handleLogoutClick}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal
