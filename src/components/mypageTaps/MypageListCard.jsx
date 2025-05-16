import React, { useEffect, useRef, useState } from 'react'
import css from './mypageTaps.module.css'
import MoreIcon from '@/assets/icons/moreIcon.svg?react'
import { useNavigate } from 'react-router-dom'

const MypageListCard = ({ thumbnail, info, renderMoreMenu, trip }) => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const handleToggle = () => {
    setOpen(prev => !prev)
  }
  console.log(trip)
  const MovePlanPage = () => {
    navigate(`/plan/${trip.tripId}`)
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
    <div className={css.listCard} onClick={MovePlanPage}>
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
