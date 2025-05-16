import React, { useEffect, useRef, useState } from 'react'
import { loadKakaoMapScript } from '@/loaders/kakaoLoader'
import css from './Map.module.css'
import MapModal from './MapModal'
import { useNavigate } from 'react-router-dom'

const Map = ({ center, list, onMarkerClick, detail, onCloseModal }) => {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([]) // 마커 관리용

  const [isReady, setIsReady] = useState(false)
  const [modalClosing, setModalClosing] = useState(false)
  const navigate = useNavigate()

  // 맵 로드 (최초 1회)
  useEffect(() => {
    loadKakaoMapScript()
      .then(() => {
        const container = mapContainerRef.current
        const options = {
          center: new window.kakao.maps.LatLng(center[0], center[1]),
          level: 8,
        }
        const map = new window.kakao.maps.Map(container, options)
        mapInstanceRef.current = map
        setIsReady(true)

        // 지도 클릭 → 모달 닫기
        window.kakao.maps.event.addListener(map, 'click', () => {
          setModalClosing(true)
        })
      })
      .catch(error => {
        console.error('지도 로드 실패:', error)
      })
  }, [])

  // center 변경 시 지도 이동
  useEffect(() => {
    if (!mapInstanceRef.current) return
    setIsReady(false)
    const moveLatLon = new window.kakao.maps.LatLng(center[0], center[1])
    mapInstanceRef.current.setCenter(moveLatLon)
    mapInstanceRef.current.setLevel(8)
    setTimeout(() => setIsReady(true), 300)
  }, [center])

  // list 변경 시 마커 업데이트
  useEffect(() => {
    if (!mapInstanceRef.current || !isReady) return

    // 기존 마커 제거
    markersRef.current.forEach(m => m.setMap(null))
    markersRef.current = []

    // 새로운 마커 생성
    list.forEach(item => {
      const lat = parseFloat(item.mapy)
      const lng = parseFloat(item.mapx)
      if (!isNaN(lat) && !isNaN(lng)) {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(lat, lng),
          map: mapInstanceRef.current,
        })
        window.kakao.maps.event.addListener(marker, 'click', () => {
          setModalClosing(false)
          onMarkerClick(item)
        })
        markersRef.current.push(marker)
      }
    })
  }, [list, isReady])

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
