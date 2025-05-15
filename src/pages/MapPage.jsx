import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Map from '@/components/common/Map/Map'
import BottomSheet from '@/components/common/BottomSheet/BottomSheet'
import BottomSheetContent from '@/components/common/BottomSheet/BottomSheetContent'
import { useLocationTourList } from '@/hooks/useLocationTourList'
import { useSpring } from 'react-spring'
import css from './MapPage.module.css'
import Spinner from '@/components/loading/Spinner'

const DEFAULT_CITY = { name: '서울', lat: 37.5665, lng: 126.978 }
const RADIUS = 20000

const MapPage = () => {
  const location = useLocation() // ← 추가
  const initMapx = location.state?.mapx
  const initMapy = location.state?.mapy

  // (1) 지도 중심 관리: state 기반으로 초기값 설정
  const [center, setCenter] = useState([
    initMapy ? Number(initMapy) : DEFAULT_CITY.lat,
    initMapx ? Number(initMapx) : DEFAULT_CITY.lng,
  ])
  const [contentTypeId, setContentTypeId] = useState(12)

  const {
    data: list,
    isLoading,
    isError,
  } = useLocationTourList(
    // ← 변경
    center[1],
    center[0],
    RADIUS,
    contentTypeId
  )

  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const snapPoints = {
    full: 100,
    mid: screenHeight / 2,
    min: screenHeight - 50,
  }

  const [{ y }, api] = useSpring(() => ({
    y: snapPoints.min,
    config: { tension: 300, friction: 30 },
  }))

  // 리스트 항목 클릭 시 중심 이동
  const handleItemClick = (lat, lng) => {
    setCenter([lat, lng])
    api.start({ y: snapPoints.min })
  }

  if (isLoading)
    return (
      <div className={css.spinnerWrap}>
        <Spinner />
      </div>
    )
  if (isError) return <div className={css.error}>데이터를 불러오는 중 오류가 발생했습니다.</div>
  if (!list || list.length === 0) return <div className={css.empty}>데이터가 없습니다.</div>

  return (
    <div className={css.fullPage}>
      {/*Map 컴포넌트에 list 전달 */}
      <Map center={center} list={list} contentTypeId={contentTypeId} />

      <BottomSheet snapPoints={snapPoints} y={y} api={api}>
        {/* 탭·리스트 컴포넌트에 contentTypeId도 전달 */}
        <BottomSheetContent
          list={list}
          contentTypeId={contentTypeId}
          setContentTypeId={setContentTypeId}
          onItemClick={handleItemClick}
        />
      </BottomSheet>
    </div>
  )
}

export default MapPage
