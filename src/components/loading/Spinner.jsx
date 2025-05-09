import React from 'react'
import css from './Spinner.module.css'

const Spinner = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.spinner} />
    </div>
  )
}

export default Spinner
