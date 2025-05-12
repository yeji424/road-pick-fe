import React, { useState } from 'react'
import css from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@/assets/icons/homeIcon.svg?react'
import CalendarIcon from '@/assets/icons/calendarIcon.svg?react'
import UserIcon from '@/assets/icons/userIcon.svg?react'

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <>
      <nav className={css.navbar}>
        <div className={css.con}>
          <div className={css.icons}>
            <CustomIconLink to="/" icon="home" />
            <CustomIconLink to="/calendar" icon="calendar" />
            <CustomIconLink to="/mypage" icon="user" />
          </div>
        </div>
      </nav>
      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
    </>
  )
}

const iconMap = {
  home: <HomeIcon />,
  calendar: <CalendarIcon />,
  user: <UserIcon />,
}

// icon 링크용 컴포넌트
const CustomIconLink = ({ to, icon }) => (
  <NavLink to={to} className={({ isActive }) => (isActive ? css.active : '')}>
    {iconMap[icon]}
  </NavLink>
)

export default Navbar
