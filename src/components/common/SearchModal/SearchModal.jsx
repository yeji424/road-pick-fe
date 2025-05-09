// components/common/SearchModal.jsx
import React, { useEffect, useRef } from 'react'
import css from './SearchModal.module.css'

const SearchModal = ({ onClose }) => {
  const modalRef = useRef(null)

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // 바깥 클릭 시 닫힘
  useEffect(() => {
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  return (
    <div className={css.overlay}>
      <div className={css.modal} ref={modalRef}>
        <input type="text" placeholder="여행지를 검색하세요" />
      </div>
    </div>
  )
}

export default SearchModal
