import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import css from './SearchPage.module.css'
import SortDropdown from '../components/common/BottomSheet/SortDropDown'
import Header from '@/components/common/Header/Header'
import Spinner from '@/components/loading/Spinner'
import ListCard from '@/components/common/ListCard/ListCard'
import { useTourList } from '@/hooks/useKeywordList'

const SearchPage = () => {
  const [contentTypeId, setContentTypeId] = useState(12)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const keyword = params.get('keyword')
    if (keyword) {
      setSearchTerm(keyword)
    }
  }, [location])

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useTourList({ keyword: searchTerm, contentTypeId })

  return (
    <main>
      <Header title={`"${searchTerm}" 검색 결과`} />

      <div className={css.tabWrapper}>
        <button
          className={`${css.tabButton} ${contentTypeId === 12 ? css.active : ''}`}
          onClick={() => setContentTypeId(12)}
        >
          관광지
        </button>
        <button
          className={`${css.tabButton} ${contentTypeId === 15 ? css.active : ''}`}
          onClick={() => setContentTypeId(15)}
        >
          축제/행사
        </button>
      </div>

      <div className={css.headerRow}>
        <SortDropdown sortBy={sortBy} onChange={setSortBy} />
      </div>

      {isLoading && <Spinner />}
      {isError && <div>오류 발생: {isError.message}</div>}
      {!isLoading && searchResults?.length === 0 && <div>검색 결과가 없습니다.</div>}

      <div className={css.cardListWrapper}>
        {searchResults?.map((item, idx) => (
          <ListCard
            key={idx}
            firstimage={item.firstimage}
            title={item.title}
            addr1={item.addr1}
            addr2={item.addr2}
            contentid={item.contentid}
            contenttypeid={item.contenttypeid}
            mapx={item.mapx}
            mapy={item.mapy}
          />
        ))}
      </div>
    </main>
  )
}

export default SearchPage
