import React, { useEffect, useState } from 'react'
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

  const [center, setCenter] = useState([
    initMapy ? Number(initMapy) : DEFAULT_CITY.lat,
    initMapx ? Number(initMapx) : DEFAULT_CITY.lng,
  ])
  const [debouncedCenter, setDebouncedCenter] = useState(center)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedCenter(center), 500)
    return () => clearTimeout(handler)
  }, [center])

  const [contentTypeId, setContentTypeId] = useState(12)
  // (2) 선택된 관광지 상세 관리
  const [selectedDetail, setSelectedDetail] = useState(null)

  // 위치 기반 관광지 조회 (반경 200km)
  const {
    data: list,
    isLoading,
    isError,
  } = useLocationTourList(debouncedCenter[1], debouncedCenter[0], RADIUS, contentTypeId)

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

  // (3) 리스트 클릭 → 맵 포커싱 + 모달 오픈
  const handleItemClick = item => {
    setCenter([Number(item.mapy), Number(item.mapx)])
    setSelectedDetail(item)
    api.start({ y: snapPoints.min })
  }
  // (4) 마커 클릭 → 모달 오픈
  const handleMarkerClick = item => {
    setSelectedDetail(item)
    api.start({ y: snapPoints.min })
  }
  const handleCloseModal = () => {
    setSelectedDetail(null)
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
      <Map
        center={center}
        list={list}
        contentTypeId={contentTypeId}
        onMarkerClick={handleMarkerClick}
        detail={selectedDetail}
        onCloseModal={handleCloseModal}
      />

      <BottomSheet snapPoints={snapPoints} y={y} api={api}>
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
