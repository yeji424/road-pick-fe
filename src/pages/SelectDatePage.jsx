import Calendar from '@/components/common/Calendar/Calendar'
import { useCallback, useEffect, useRef, useState } from 'react'
import css from './SelectDatePage.module.css'
import Header from '@/components/common/Header/Header'
import RegistModal from '@/components/common/Modal/RegistModal'
import { useScheduleList } from '@/hooks/useScheduleList'
import Spinner from '@/components/loading/Spinner'
import { useSelector } from 'react-redux'

const SelectDatePage = () => {
  const [start, setStart] = useState('')
  const user = useSelector(state => state.auth.user)
  const userId = user?._id
  const [end, setEnd] = useState('')
  const [showBtn, setShowBtn] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { data: schedules, loading, error } = useScheduleList(userId)

  const ModalOpen = () => {
    setIsOpen(true)
  }
  const ModalClose = () => {
    setIsOpen(false)
  }
  const [buttonEffect, setButtonEffect] = useState(false)
  const SelectDate = date => {
    if (!start) {
      setStart(date)
    } else if (!end) {
      if (date >= start) {
        setEnd(date)
        setButtonEffect(true)
      } else {
        setStart(date)
        setEnd('')
      }
    } else {
      setStart(date)
      setEnd('')
    }
  }
  useEffect(() => {
    if (buttonEffect) {
      const timer = setTimeout(() => {
        setButtonEffect(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [buttonEffect])

  if (loading || !schedules) return <Spinner />
  if (error) {
    return (
      <div className={css.error}>
        <p>에러가 발생했습니다.</p>
        <pre>{error.message || JSON.stringify(error)}</pre>
      </div>
    )
  }
  return (
    <main className={css.container} ref={containerRef}>
      <Header
        showButton={true}
        buttonText="일정 추가"
        onButtonClick={ModalOpen}
        buttonTextClassName={buttonEffect ? css.grow : ''}
      />
      {isOpen && <RegistModal start={start} end={end} onClose={ModalClose} />}
      <div className={`${css.title} fadeInText`}>
        <h2>여행일정 등록</h2>
        <p className={css.description}>설레는 여행일정으로 달력을 채워보세요!</p>
      </div>
      <div className={css.calendarArea}>
        <Calendar
          SelectDate={SelectDate}
          start={start}
          end={end}
          schedules={schedules}
          isSelect={true}
          showStartEndLabel={true}
        />
        {showBtn && (
          <button className={css.floatingBtn} onClick={ModalOpen}>
            + 일정 추가
          </button>
        )}
      </div>
    </main>
  )
}

export default SelectDatePage
