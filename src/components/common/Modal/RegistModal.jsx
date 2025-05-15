import { useState } from 'react'
import css from './RegistModal.module.css'
import { v4 as uuidv4 } from 'uuid'
import { createSchedule } from '@/apis/scheduleApi'
import { useSelector } from 'react-redux'

const RegistModal = ({ start, end, onClose }) => {
  const user = useSelector(state => state.auth.user)
  const [title, setTitle] = useState('')
  const handleRegist = async () => {
    const newSchedule = {
      title,
      startDate: start,
      endDate: end,
      userId: user._id,
      tripId: uuidv4(),
    }
    console.log(newSchedule)
    try {
      await createSchedule(newSchedule)
      onClose()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main className={css.container}>
      <div className={css.box}>
        <input
          type="text"
          value={title}
          className={css.titleinput}
          onChange={e => setTitle(e.target.value)}
          placeholder="여행명을 입력해주세요"
        />
        <span>출발일:{start}</span>
        <span>마감일:{end}</span>
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
