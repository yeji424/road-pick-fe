import React, { useEffect, useState } from 'react'
import css from './AlertModal.module.css'

const AlertModal = ({ message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (message) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        onClose?.()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [message, duration, onClose])

  if (!visible) return null

  return <div className={css.alert}>{message}</div>
}

export default AlertModal
