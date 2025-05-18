import React from 'react'
import noImage from '@/assets/imgs/noImageImg.png'
import css from './Modal.module.css'

const DeleteModal = ({ onClose, onConfirm, title, image, description }) => {
  const handleDeleteClick = () => {
    onConfirm?.()
    onClose()
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
        <h3>{title || `을(를)목록에서 삭제하시겠습니까?`}</h3>
        {image && <img src={image || noImage} alt={title} className={css.imagePreview} />}
        {description && <p>{description}</p>}
        <div className={css.btnArea}>
          <button className={css.closeBtn} onClick={handleCLoseClick}>
            닫기
          </button>
          <button className={css.successBtn} onClick={handleDeleteClick}>
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
