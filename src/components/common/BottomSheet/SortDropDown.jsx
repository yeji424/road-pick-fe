import React, { useState, useRef, useEffect } from 'react'
import css from './BottomSheet.module.css'

const options = [
  { label: '이름순', value: 'name' },
  { label: '거리순', value: 'distance' },
  { label: '리뷰순', value: 'review' },
]

const SortDropdown = ({ sortBy, onChange }) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef()

  const handleClickOutside = e => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = value => {
    onChange(value)
    setOpen(false)
  }

  return (
    <div className={css.wrapper} ref={dropdownRef}>
      <button className={css.trigger} onClick={() => setOpen(prev => !prev)}>
        {options.find(o => o.value === sortBy)?.label || '정렬'}
        <span className={css.arrow}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <ul className={css.menu}>
          {options.map(option => (
            <li
              key={option.value}
              className={`${css.item} ${sortBy === option.value ? css.selected : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SortDropdown
