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
  const { state = {} } = useLocation()
  const { mapx: initMapx, mapy: initMapy, contentTypeId: initType, contentId } = state

  // (1) 지도 중심 관리
  const [center, setCenter] = useState([
    initMapy ? Number(initMapy) : DEFAULT_CITY.lat,
    initMapx ? Number(initMapx) : DEFAULT_CITY.lng,
  ])

  // (2) 디바운스된 중심값
  const [debouncedCenter, setDebouncedCenter] = useState(center)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedCenter(center), 500)
    return () => clearTimeout(handler)
  }, [center])

  // (3) 탭(관광지/축제) 관리
  const [contentTypeId, setContentTypeId] = useState(initType === undefined ? null : initType)

  // (4) 선택된 아이템 상세 관리
  const [selectedDetail, setSelectedDetail] = useState(null)

  // 자동 포커싱이 이미 실행되었는지 여부
  const [hasAutoFocused, setHasAutoFocused] = useState(false)

  // (5) 위치 기반 리스트 조회
  const {
    data: list,
    isLoading,
    isError,
  } = useLocationTourList(debouncedCenter[1], debouncedCenter[0], RADIUS, contentTypeId)

  // (6) 스프링 애니메이션 셋업
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

  // contentId 자동 포커싱 & 모달 열기 (한 번만 실행)
  useEffect(() => {
    if (!list || !contentId || hasAutoFocused) return

    const item = list.find(i => String(i.contentid) === String(contentId))
    if (item) {
      // 지도 이동
      setCenter([Number(item.mapy), Number(item.mapx)])
      // 모달 오픈
      setSelectedDetail(item)
      api.start({ y: snapPoints.min })
      // 한 번 실행된 이후에는 다시 실행 안 하도록 플래그 설정
      setHasAutoFocused(true)
    }
  }, [list, contentId, api, snapPoints.min, hasAutoFocused])

  // (7) 리스트 클릭 → 포커싱 + 모달
  const handleItemClick = item => {
    setCenter([Number(item.mapy), Number(item.mapx)])
    setSelectedDetail(item)
    api.start({ y: snapPoints.min })
  }
  // (8) 마커 클릭 → 모달
  const handleMarkerClick = item => {
    setSelectedDetail(item)
    api.start({ y: snapPoints.min })
  }
  const handleCloseModal = () => {
    setSelectedDetail(null)
  }

  // (9) 로딩/에러/빈 화면 처리
  if (isLoading)
    return (
      <div className={css.spinnerWrap}>
        <Spinner />
      </div>
    )
  if (isError) return <div className={css.error}>데이터를 불러오는 중 오류가 발생했습니다.</div>
  if (!list || list.length === 0) return <div className={css.empty}>데이터가 없습니다.</div>

  // (10) 실제 렌더링
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
