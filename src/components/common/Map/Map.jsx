import React, { useEffect, useRef, useState } from 'react'
import { loadKakaoMapScript } from '@/loaders/kakaoLoader'
import css from './Map.module.css'
import MapModal from './MapModal'
import { useNavigate } from 'react-router-dom'

// SVG 아이콘 URL 임포트
import markerDefaultUrl from '@/assets/icons/markerDefault.svg'
import markerSelectedUrl from '@/assets/icons/markerSelected.svg'

const Map = ({ center, list, onMarkerClick, detail, onCloseModal }) => {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])

  const [isReady, setIsReady] = useState(false)
  const [modalClosing, setModalClosing] = useState(false)
  const navigate = useNavigate()

  // 1) 지도 스크립트 로드 & 인스턴스 생성
  useEffect(() => {
    loadKakaoMapScript()
      .then(() => {
        const kakao = window.kakao
        const map = new kakao.maps.Map(mapContainerRef.current, {
          center: new kakao.maps.LatLng(center[0], center[1]),
          level: 6,
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
    mapInstanceRef.current.setLevel(8)
    setTimeout(() => setIsReady(true), 300)
  }, [center])

  // 3) list 또는 detail 변경 시 마커 다시 그리기
  useEffect(() => {
    if (!mapInstanceRef.current || !isReady) return

    const kakao = window.kakao

    // ★수정: MarkerImage 생성 시점을 이곳으로 이동
    const markerSize = new kakao.maps.Size(30, 35)
    const markerOffset = new kakao.maps.Point(12, 34)
    const defaultMarkerImage = new kakao.maps.MarkerImage(markerDefaultUrl, markerSize, {
      offset: markerOffset,
    })
    const selectedMarkerImage = new kakao.maps.MarkerImage(markerSelectedUrl, markerSize, {
      offset: markerOffset,
    })

    // 기존 마커 전부 제거
    markersRef.current.forEach(m => m.setMap(null))
    markersRef.current = []

    // 새로운 마커 그리기
    list.forEach(item => {
      const lat = parseFloat(item.mapy)
      const lng = parseFloat(item.mapx)
      if (isNaN(lat) || isNaN(lng)) return

      // ★수정: 선택된 detail과 비교해 이미지 분기
      const image =
        detail && String(item.contentid) === String(detail.contentid)
          ? selectedMarkerImage
          : defaultMarkerImage

      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(lat, lng),
        image,
        map: mapInstanceRef.current,
      })

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
          ←
        </button>
        <span>{detail?.title}</span>
      </div>

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
