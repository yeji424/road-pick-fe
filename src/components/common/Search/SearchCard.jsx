import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import css from './SearchCard.module.css'
import SearchIcon from '@/assets/icons/searchIcon.svg?react'

const SearchCard = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (!inputValue.trim()) return

    // setSearchTerm이 존재하면 호출, 아니면 단순히 이동만
    if (typeof setSearchTerm === 'function') {
      setSearchTerm(inputValue)
    }
    navigate(`/search?keyword=${encodeURIComponent(inputValue)}`)
  }

  const handleKeyPress = e => {
    // Enter키(키 코드 13) 눌렀을 때
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className={css.searchWrapper}>
      <SearchIcon className={css.searchIcon} onClick={handleSearch} /> {/* 클릭 시 검색 */}
      <input
        type="text"
        value={inputValue}
        className={css.searchInput}
        onChange={e => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="지역명이나 관광지명을 입력하세요"
      />
    </div>
  )
}

export default SearchCard
