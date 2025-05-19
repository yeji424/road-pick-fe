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
        {/* <button className={css.closeIcon} onClick={onClose}>
          ✕
        </button> */}
        <div className={css.image}>
          {image && <img src={image || noImage} alt={title} className={css.imagePreview} />}
        </div>
        <h4>
          {title ? (
            <>
              <span className={css.title}>"{title}"</span>를(을) 저장 목록에서 삭제하시겠습니까?
            </>
          ) : (
            '해당 관광지를(을) 저장 목록에서 삭제하시겠습니까?'
          )}
        </h4>
        {description && <p className={css.description}>{description}</p>}
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
