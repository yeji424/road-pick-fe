import React, { useState } from 'react'
import css from './Header.module.css'
import Logo from './Logo'
import { Link, NavLink } from 'react-router-dom'
import SearchModal from '@/components/common/SearchModal/SearchModal'

const Header = () => {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <>
      <header className={css.hd}>
        <div className={css.con}>
          <h1>
            <Link to={'/'}>
              <Logo />
            </Link>
          </h1>

          <div className={css.icon}>
            <button onClick={() => setShowSearch(true)} className={css.iconBtn}>
              <i className="bi bi-search"></i>
            </button>
            <CustomIconLink to="/calender" icon="bi bi-calendar-week" />
            <CustomIconLink to="/mypage" icon="bi bi-person" />
          </div>
        </div>
      </header>
      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
    </>
  )
}

// icon 링크용 컴포넌트
const CustomIconLink = ({ to, icon }) => (
  <NavLink to={to} className={({ isActive }) => (isActive ? `${css.active}` : '')}>
    <i className={`bi ${icon}`}></i>
  </NavLink>
)

export default Header
