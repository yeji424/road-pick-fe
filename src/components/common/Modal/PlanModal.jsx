import { useState } from 'react'
import css from './PlanModal.module.css'

const PlanModal = ({ CreateShedule, ModalClose, dest, title }) => {
  const [checked, setChecked] = useState(false)

  const handleCheckboxChange = e => {
    setChecked(e.target.checked)
  }
  return (
    <div className={css.container}>
      <div className={css.modal}>
        <div className={css.imgwrap}>
          <img src={dest.firstimage} alt={dest.title} />
        </div>
        <div className={css.title}>
          <h2>{`${dest.title}을 ${title}에 추가하시겠습니까?`}</h2>
        </div>
        <div className={css.descript}>
          <input type="checkbox" checked={checked} onChange={handleCheckboxChange} />
          <p>{title} 페이지로 이동합니다.</p>
        </div>
        <div className={css.btnarea}>
          <button className={css.close} onClick={ModalClose}>
            닫기
          </button>
          <button className={css.create} onClick={e => CreateShedule(e, dest, checked)}>
            추가
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlanModal
