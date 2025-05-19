import React, { useState } from 'react'
import css from './Modal.module.css'
import { v4 as uuidv4 } from 'uuid'
import { createSchedule } from '@/apis/scheduleApi'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const RegistModal = ({ start, end, onClose }) => {
  const user = useSelector(state => state.auth.user)
  const [title, setTitle] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const handleRegist = async () => {
    if (!title.trim()) {
      setError('여행명을 입력해주세요.')
      return
    }
    const newSchedule = {
      title,
      startDate: start,
      endDate: end,
      userId: user._id,
      tripId: uuidv4(),
    }

    try {
      await createSchedule(newSchedule)
      onClose()
      navigate('/mypage', {
        state: { alertMessage: '새로운 여행 일정이 등록되었습니다.' },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleBackdropClick = () => {
    onClose()
  }

  const handleModalClick = e => {
    e.stopPropagation()
  }

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal} onClick={handleModalClick}>
        <h4 className={css.titleArea}>일정을 추가하시겠습니까?</h4>

        <div className={css.inputArea}>
          <div className={css.inputGroup}>
            <label className={css.label}>여행명</label>
            <div className={css.inputWrapper}>
              <input
                type="text"
                value={title}
                className={css.input}
                onChange={e => {
                  setTitle(e.target.value)
                  if (error) setError('')
                }}
                placeholder="여행명을 입력해주세요"
                required
              />
              {error && <p className={css.error}>{error}</p>}
            </div>{' '}
          </div>
          <div className={css.inputGroup}>
            <label className={css.label}>여행 시작일</label>
            <div className={css.value}>{start}</div>
          </div>
          <div className={css.inputGroup}>
            <label className={css.label}>여행 종료일</label>
            <div className={css.value}>{end}</div>
          </div>
        </div>

        <div className={css.btnArea}>
          <button className={css.closeBtn} onClick={onClose}>
            취소
          </button>
          <button
            className={`${css.successBtn} ${title.trim() ? css.activeBtn : ''}`}
            onClick={handleRegist}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  )
}

export default RegistModal
