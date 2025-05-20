import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import css from './SearchPage.module.css'
import Header from '@/components/common/Header/Header'
import Spinner from '@/components/loading/Spinner'
import ListCard from '@/components/common/ListCard/ListCard'
import { usePopularTourList } from '@/hooks/usePopularTourList'

const SearchPopularPage = () => {
  const [contentTypeId, setContentTypeId] = useState(12)
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const areaCode = query.get('areaCode')
  const sigunguCode = query.get('sigunguCode') || undefined
  const title = query.get('title') || '유명 관광지 전체 보기'

  const { populars, loading, error } = usePopularTourList({
    areaCode: areaCode ? Number(areaCode) : undefined,
    sigunguCode: sigunguCode ? Number(sigunguCode) : undefined,
    contentTypeId,
  })

  return (
    <main className={css.wrapper}>
      <Header title={title} />

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

      {loading && <Spinner />}
      {error && <div>오류 발생: {error.message}</div>}
      {!loading && populars.length === 0 && <div>유명 관광지가 없습니다.</div>}

      <div className={css.cardListWrapper}>
        {populars.map((item, idx) => (
          <ListCard
            key={idx}
            firstimage={item.firstimage || '/noImageImg.png'}
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

export default SearchPopularPage
