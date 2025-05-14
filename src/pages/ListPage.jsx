import React, { useState } from 'react'
import BottomSheet from '@/components/common/BottomSheet/BottomSheet'
import BottomSheetContent from '@/components/common/BottomSheet/BottomSheetContent'
import Spinner from '@/components/loading/Spinner'
import { useTourList } from '@/hooks/useTourList'
import { useSpring } from 'react-spring'

const ListPage = () => {
  const [contentTypeId, setContentTypeId] = useState(12)
  const { data: list, isLoading, isError } = useTourList({ areaCode: 1, contentTypeId })

  // 현재 화면 높이 기준으로 snap 위치 계산
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800

  // 바텀시트 멈출 위치들 정의
  const snapPoints = {
    full: 100, // 완전히 올라온 상태 (상단 - 100px)
    mid: screenHeight / 2, // 중간 위치
    min: screenHeight - 50, // 최소 위치
  }

  // y값 애니메이션 상태 관리 (react-spring 사용)
  const [{ y }, api] = useSpring(() => ({
    y: snapPoints.min, // 초기 상태 : 가장 아래
    config: { tension: 300, friction: 30 }, // 애니메이션 : 탄성
  }))
  if (isLoading) return <Spinner />
  if (!list || list.length === 0) return <div>데이터 오류..</div>
  if (isError) return <div>오류 발생: {isError.message}</div>
  return (
    <main>
      <BottomSheet snapPoints={snapPoints} y={y} api={api}>
        <BottomSheetContent list={list} setContentTypeId={setContentTypeId} />
      </BottomSheet>
    </main>
  )
}

export default ListPage
