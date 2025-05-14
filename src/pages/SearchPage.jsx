import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Spinner from '@/components/loading/Spinner'
import { useTourList } from '@/hooks/useKeywordList'
import ListCard from '@/components/common/ListCard/ListCard'

const SearchPage = () => {
  const [contentTypeId] = useState(12)
  const [searchTerm, setSearchTerm] = useState('')

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

  if (isLoading) return <Spinner />
  if (isError) return <div>오류 발생: {isError.message}</div>
  if (!searchResults || searchResults.length === 0) return <div>검색 결과가 없습니다.</div>

  return (
    <main>
      <div>
        {searchResults.map((item, idx) => (
          <ListCard
            key={idx}
            firstimage={item.firstimage || 'https://via.placeholder.com/225x152'}
            title={item.title}
            addr1={item.addr1}
            addr2={item.addr2}
            contentid={item.contentid}
            contenttypeid={item.contenttypeid}
          />
        ))}
      </div>
    </main>
  )
}

export default SearchPage
