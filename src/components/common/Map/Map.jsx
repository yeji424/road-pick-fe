import React, { useEffect, useRef, useState } from 'react'
import { loadKakaoMapScript } from '@/loaders/kakaoLoader'
import css from './Map.module.css'
import MapModal from './MapModal'
import { useNavigate } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'

// SVG 아이콘 URL 임포트
import arrowLeftUrl from '@/assets/icons/arrowLeftIcon.svg'
import refreshArrowUrl from '@/assets/icons/refresh.svg'
import markerDefaultUrl from '@/assets/icons/markerDefault.svg'
import markerSelectedUrl from '@/assets/icons/markerSelected.svg'

const Map = ({ center, list, onMarkerClick, detail, onCloseModal, onReSearch }) => {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])

  const [isReady, setIsReady] = useState(false)
  const [modalClosing, setModalClosing] = useState(false)
  const navigate = useNavigate()

  const showReBtn = !detail

  const transitions = useTransition(showReBtn, {
    from: { opacity: 0, transform: 'translateY(-10px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-10px)' },
    config: { tension: 250, friction: 20 },
  })

  // 1) 지도 스크립트 로드 & 인스턴스 생성
  useEffect(() => {
    loadKakaoMapScript()
      .then(() => {
        const kakao = window.kakao
        const map = new kakao.maps.Map(mapContainerRef.current, {
          center: new kakao.maps.LatLng(center[0], center[1]),
          level: 2,
        })
        mapInstanceRef.current = map
        setIsReady(true)

        kakao.maps.event.addListener(map, 'click', () => {
          setModalClosing(true)
        })
      })
      .catch(console.error)
  }, [])

  // 2) center가 변경되면 맵 이동
  useEffect(() => {
    if (!mapInstanceRef.current) return
    setIsReady(false)
    const kakao = window.kakao
    const moveLatLon = new kakao.maps.LatLng(center[0], center[1])
    mapInstanceRef.current.setCenter(moveLatLon)
    mapInstanceRef.current.setLevel(2)
    setTimeout(() => setIsReady(true), 300)
  }, [center])

  // 3) list 또는 detail 변경 시 마커 다시 그리기
  useEffect(() => {
    if (!mapInstanceRef.current || !isReady) return

    const kakao = window.kakao

    const defaultMarkerSize = new kakao.maps.Size(30, 35)
    const defaultMarkerOffset = new kakao.maps.Point(12, 34)
    const defaultMarkerImage = new kakao.maps.MarkerImage(markerDefaultUrl, defaultMarkerSize, {
      offset: defaultMarkerOffset,
    })

    const selectedMarkerSize = new kakao.maps.Size(36, 42)
    const selectedMarkerOffset = new kakao.maps.Point(18, 42)
    const selectedMarkerImage = new kakao.maps.MarkerImage(markerSelectedUrl, selectedMarkerSize, {
      offset: selectedMarkerOffset,
    })

    const defaultZIndex = 1
    const selectedZIndex = 2

    // 기존 마커 전부 제거
    markersRef.current.forEach(m => m.setMap(null))
    markersRef.current = []

    // 새로운 마커 그리기
    list.forEach(item => {
      const lat = parseFloat(item.mapy)
      const lng = parseFloat(item.mapx)
      if (isNaN(lat) || isNaN(lng)) return

      const isSelected = detail && String(item.contentid) === String(detail.contentid)
      const image = isSelected ? selectedMarkerImage : defaultMarkerImage
      const zIndex = isSelected ? selectedZIndex : defaultZIndex

      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(lat, lng),
        image,
        map: mapInstanceRef.current,
        zIndex, //
      })

      if (isSelected) {
        marker.setZIndex(selectedZIndex)
      }

      kakao.maps.event.addListener(marker, 'click', () => {
        setModalClosing(false)
        onMarkerClick(item)
      })

      markersRef.current.push(marker)
    })
  }, [list, isReady, detail])

  return (
    <div className={`${css.container} ${!isReady ? css.loading : ''}`}>
      <div className={css.infoBar}>
        <button className={css.backBtn} onClick={() => navigate(-1)}>
          <img src={arrowLeftUrl} alt="뒤로가기" className={css.backIcon} />
        </button>
        <span>{detail?.title}</span>
      </div>

      {transitions((styles, item) =>
        item ? (
          <animated.div style={styles} className={css.researchBtnWrapper}>
            <button
              className={css.researchBtn}
              onClick={() => {
                if (!mapInstanceRef.current) return
                const c = mapInstanceRef.current.getCenter()
                onReSearch([c.getLat(), c.getLng()])
              }}
            >
              <img src={refreshArrowUrl} alt="refresh" className={css.refreshIcon} />
              <span>이 지역 재검색</span>
            </button>
          </animated.div>
        ) : null
      )}

      <div
        ref={mapContainerRef}
        className={css.map}
        style={{ visibility: isReady ? 'visible' : 'hidden' }}
      />

      {detail && (
        <MapModal
          detail={detail}
          isClosing={modalClosing}
          onCloseComplete={() => {
            setModalClosing(false)
            onCloseModal()
          }}
        />
      )}
    </div>
  )
}

export default Map
