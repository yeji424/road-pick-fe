// 리스트 페이지

import ListCard from '@/components/common/ListCard/ListCard'
import { useTourList } from '@/hooks/useTourList'
import React from 'react'

// const dummyList = [
//   {
//     title: '태안해수욕장',
//     description: '관광지 설명 요약',
//     location: '충청남도, 태안',
//     withPet: true,
//     rating: 4.8,
//     reviewCnt: 24,
//   },
//   {
//     title: '태안해수욕장 2',
//     description: '관광지 설명 요약2',
//     location: '충청남도, 태안',
//     withPet: false,
//     rating: 4.6,
//     reviewCnt: 39,
//   },
// ]

const ListPage = () => {
  const { list, loading, error } = useTourList({ areaCode: 1, sigunguCode: 2 })

  if (loading) return <div>로딩 중...</div>
  if (error) return <div>오류 발생: {error.message}</div>
  console.log(list)
  return (
    <main>
      {list.map((item, idx) => (
        <ListCard key={idx} {...item} />
      ))}
    </main>
  )
}

export default ListPage
