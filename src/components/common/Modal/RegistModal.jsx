import { useState } from 'react'
import css from './RegistModal.module.css'
import { v4 as uuidv4 } from 'uuid'
import { createSchedule } from '@/apis/scheduleApi'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LabelRow = ({ label, children }) => (
  <div className={css.row}>
    <span className={css.label}>{label}</span>
    <span className={css.value}>{children}</span>
  </div>
)

const RegistModal = ({ start, end, onClose }) => {
  const user = useSelector(state => state.auth.user)
  const [title, setTitle] = useState('')
  const navigate = useNavigate()
  const handleRegist = async () => {
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
      navigate('/mypage')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main className={css.container}>
      <div className={css.modal}>
        <h3>일정 추가</h3>
        <div className={css.title}>
          <LabelRow label="여행명">
            <span>
              <input
                type="text"
                value={title}
                className={css.titleinput}
                onChange={e => setTitle(e.target.value)}
                placeholder="여행명을 입력해주세요"
                required
              />
            </span>
          </LabelRow>
        </div>

        <LabelRow label="여행 시작일">
          <span>{start} </span>
        </LabelRow>
        <LabelRow label="여행 종료일">
          <span>{end} </span>
        </LabelRow>
        <div className={css.btnarea}>
          <button className={css.cancle} onClick={onClose}>
            취소
          </button>
          <button className={css.regist} onClick={handleRegist}>
            등록
          </button>
        </div>
      </div>
    </main>
  )
}

export default RegistModal
