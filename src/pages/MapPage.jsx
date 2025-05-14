import React, { useState } from 'react'
import Map from '@/components/common/Map/Map'
import BottomSheet from '@/components/common/BottomSheet/BottomSheet'
import BottomSheetContent from '@/components/common/BottomSheet/BottomSheetContent'
import { useTourList } from '@/hooks/useTourList'
import { useSpring } from 'react-spring'
import css from './MapPage.module.css'
import Spinner from '@/components/loading/Spinner'

const DEFAULT_CITY = { name: '서울', lat: 37.5665, lng: 126.978 }

const MapPage = () => {
  // (1) 지도 중심 관리
  const [center, setCenter] = useState([DEFAULT_CITY.lat, DEFAULT_CITY.lng])
  const [contentTypeId, setContentTypeId] = useState(12)

  const {
    data: list,
    isLoading,
    isError,
  } = useTourList({
    areaCode: 1,
    contentTypeId,
  })

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

  if (isLoading)
    return (
      <div className={css.spinnerWrap}>
        <Spinner />
      </div>
    )
  if (isError) return <div className={css.error}>데이터를 불러오는 중 오류가 발생했습니다.</div>
  if (!list || list.length === 0) return <div className={css.empty}>데이터가 없습니다.</div>

  const handleItemClick = (lat, lng) => {
    setCenter([lat, lng])
    api.start({ y: snapPoints.min })
  }

  return (
    <div className={css.fullPage}>
      <Map center={center} contentTypeId={contentTypeId} />

      <BottomSheet snapPoints={snapPoints} y={y} api={api}>
        <BottomSheetContent
          list={list}
          setContentTypeId={setContentTypeId}
          onItemClick={handleItemClick}
        />
      </BottomSheet>
    </div>
  )
}

export default MapPage
