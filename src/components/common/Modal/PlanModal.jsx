import { useState } from 'react'
import noImage from '@/assets/imgs/noImageImg.png'
import css from './Modal.module.css'
import CheckboxIcon from '@/assets/icons/checkBoxIcon.svg?react'

const PlanModal = ({ CreateShedule, onClose, image, description, dest, title }) => {
  const [checked, setChecked] = useState(false)

  const handleCheckboxChange = e => {
    setChecked(e.target.checked)
  }
  const handleCLoseClick = () => {
    onClose()
  }
  return (
    <div className={css.backdrop}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <div className={css.image}>
          {image && (
            <img src={dest.firstimage || noImage} alt={dest.title} className={css.imagePreview} />
          )}
        </div>
        <h4>
          {title ? (
            <>
              <span className={css.title}>"{dest.title}"</span>
              {`를(을) ${title}에 추가하시겠습니까?`}
            </>
          ) : (
            '해당 관광지를(을) 여행 일정에 추가하시겠습니까?'
          )}
        </h4>

        {description && (
          <label className={css.description}>
            <input
              type="checkbox"
              checked={checked}
              onChange={handleCheckboxChange}
              className={css.hiddenCheckbox}
              id="customCheckbox"
            />
            <span
              className={`${css.customCheckbox} ${checked ? css.checked : ''}`}
              aria-hidden="true"
            >
              <CheckboxIcon />
            </span>
            <p>{description}</p>
          </label>
        )}
        <div className={css.btnArea}>
          <button className={css.closeBtn} onClick={handleCLoseClick}>
            닫기
          </button>
          <button className={css.successBtn} onClick={e => CreateShedule(e, dest, checked)}>
            추가
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlanModal
