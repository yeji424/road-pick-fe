import React, { useEffect, useRef, useState } from 'react'
import css from './mypageTaps.module.css'
import MoreIcon from '@/assets/icons/moreIcon.svg?react'

const MypageListCard = ({ thumbnail, info, renderMoreMenu }) => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const handleToggle = () => {
    setOpen(prev => !prev)
  }

  useEffect(() => {
    const handleClickOutside = e => {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  return (
    <div className={css.listCard}>
      <div className={css.thumbnail}>{thumbnail}</div>
      <div className={css.info}>{info}</div>
      <div className={css.more} ref={menuRef} onClick={handleToggle}>
        <MoreIcon />
        {open && <div className={css.moreMenu}>{renderMoreMenu?.()}</div>}
      </div>
    </div>
  )
}

export default MypageListCard
