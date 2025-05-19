import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Map from '@/components/common/Map/Map'
import BottomSheet from '@/components/common/BottomSheet/BottomSheet'
import BottomSheetContent from '@/components/common/BottomSheet/BottomSheetContent'
import { useLocationTourList } from '@/hooks/useLocationTourList'
import { useSpring } from 'react-spring'
import css from './MapPage.module.css'
import Spinner from '@/components/loading/Spinner'

const DEFAULT_CITY = { name: '서울', lat: 37.5665, lng: 126.978 }
const RADIUS = 5000

const MapPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const {
    mapx: initMapx,
    mapy: initMapy,
    contentTypeId: initType,
    contentId,
  } = location.state ?? {}

  const [center, setCenter] = useState([
    initMapy ? Number(initMapy) : DEFAULT_CITY.lat,
    initMapx ? Number(initMapx) : DEFAULT_CITY.lng,
  ])

  const [debouncedCenter, setDebouncedCenter] = useState(center)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedCenter(center), 500)
    return () => clearTimeout(handler)
  }, [center])

  const [contentTypeId, setContentTypeId] = useState(initType === undefined ? 12 : initType)
  const [selectedDetail, setSelectedDetail] = useState(null)
  const [hasAutoFocused, setHasAutoFocused] = useState(false)

  const {
    data: list,
    isLoading,
    isError,
  } = useLocationTourList(debouncedCenter[1], debouncedCenter[0], RADIUS, contentTypeId)

  // snapPoints 상태를 useRef로 관리
  const snapPointsRef = useRef({
    full: 100,
    mid: window.innerHeight / 2,
    min: window.innerHeight - 50,
  })

  const [{ y }, api] = useSpring(() => ({
    y: snapPointsRef.current.min,
    config: { tension: 300, friction: 30 },
  }))

  // 반응형 대응: window 크기 변경 시 snapPoints 재계산
  useEffect(() => {
    const updateSnapPoints = () => {
      const height = window.innerHeight
      snapPointsRef.current.full = 100
      snapPointsRef.current.mid = height / 2
      snapPointsRef.current.min = height - 50
      api.start({ y: snapPointsRef.current.min })
    }

    window.addEventListener('resize', updateSnapPoints)
    updateSnapPoints()

    return () => window.removeEventListener('resize', updateSnapPoints)
  }, [api])

  // 초기 contentId 기준 자동 포커싱 (한 번만)
  useEffect(() => {
    if (!list || !contentId || hasAutoFocused) return

    const item = list.find(i => String(i.contentid) === String(contentId))
    if (item) {
      setCenter([Number(item.mapy), Number(item.mapx)])
      setSelectedDetail(item)
      api.start({ y: snapPointsRef.current.min })
      setHasAutoFocused(true)
    }
  }, [list, contentId, hasAutoFocused, api])

  const handleItemClick = item => {
    const lat = Number(item.mapy)
    const lng = Number(item.mapx)
    setCenter([Number(item.mapy), Number(item.mapx)])
    setSelectedDetail(item)
    api.start({ y: snapPointsRef.current.min })

    navigate(location.pathname, {
      replace: true,
      state: {
        mapy: lat,
        mapx: lng,
        contentTypeId,
        contentId: item.contentid,
      },
    })
  }

  const handleMarkerClick = item => {
    const lat = Number(item.mapy)
    const lng = Number(item.mapx)
    setSelectedDetail(item)
    api.start({ y: snapPointsRef.current.min })

    navigate(location.pathname, {
      replace: true,
      state: {
        mapy: lat,
        mapx: lng,
        contentTypeId,
        contentId: item.contentid,
      },
    })
  }

  const handleCloseModal = () => {
    setSelectedDetail(null)
  }

  if (isLoading) {
    return (
      <div className={css.spinnerWrap}>
        <Spinner />
      </div>
    )
  }

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
        onReSearch={newCenter => {
          setCenter(newCenter)
        }}
      />

      <BottomSheet snapPoints={snapPointsRef.current} y={y} api={api}>
        <BottomSheetContent
          list={list}
          contentTypeId={contentTypeId}
          setContentTypeId={setContentTypeId}
          onItemClick={handleItemClick}
          positionType="absolute"
        />
      </BottomSheet>
    </div>
  )
}

export default MapPage
