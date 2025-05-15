import Calendar from '@/components/common/Calendar/Calendar'
import { useState } from 'react'
import css from './SelectDatePage.module.css'
import Header from '@/components/common/Header/Header'
import RegistModal from '@/components/common/Modal/RegistModal'
const SelectDatePage = () => {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const ModalOpen = () => {
    setIsOpen(true)
  }
  const ModalClose = () => {
    setIsOpen(false)
  }
  const SelectDate = date => {
    if (!start) {
      setStart(date)
    } else if (!end) {
      if (date >= start) {
        setEnd(date)
      } else {
        setStart(date)
        setEnd('')
      }
    } else {
      setStart(date)
      setEnd('')
    }
  }
  return (
    <main className={css.maincontainer}>
      <Header
        showButton={true}
        buttonText="일정 추가"
        setIsOpen={setIsOpen}
        onButtonClick={ModalOpen}
      />
      {isOpen && <RegistModal start={start} end={end} onClose={ModalClose} />}
      <h2>여행일정 등록</h2>
      <p>설레는 여행일정으로 달력을 채워보세요!</p>
      <Calendar SelectDate={SelectDate} start={start} end={end} />
    </main>
  )
}

export default SelectDatePage
