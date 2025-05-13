import React from 'react'
import BottomSheet from '@/components/common/BottomSheet/BottomSheet'
import BottomSheetContent from '@/components/common/BottomSheet/BottomSheetContent'
import Spinner from '@/components/loading/Spinner'
import { useTourList } from '@/hooks/useTourList'

const ListPage = () => {
  const { list, loading, error } = useTourList({ areaCode: 1, sigunguCode: 2 })
  if (loading) return <Spinner />

  if (error) return <div>오류 발생: {error.message}</div>
  console.log(list)
  return (
    <main>
      <BottomSheet>
        <BottomSheetContent list={list} />
      </BottomSheet>
    </main>
  )
}

export default ListPage
