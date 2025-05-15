// src/components/common/Map/Map.jsx
import React, { useEffect, useRef, useState } from 'react'
import { loadKakaoMapScript } from '../../../loaders/kakaoLoader'
import css from './Map.module.css'
import MapModal from './MapModal'
import { useNavigate } from 'react-router-dom'
import ArrowLeftIcon from '@/assets/icons/arrowLeftIcon.svg?react'

const Map = ({ center, list, contentTypeId }) => {
  const mapRef = useRef(null)
  const markersRef = useRef([]) // 기존 마커 추적용
  const [isReady, setIsReady] = useState(false)
  const [detail, setDetail] = useState(null)
  const [modalClosing, setModalClosing] = useState(false)
  const navigate = useNavigate()

  // 1) 최초 렌더링 시 한 번만: 카카오맵 스크립트 로드 + 지표 표시
  useEffect(() => {
    loadKakaoMapScript()
      .then(() => {
        const container = document.getElementById('map')
        const options = {
          center: new window.kakao.maps.LatLng(center[0], center[1]),
          level: 8,
        }
        const map = new window.kakao.maps.Map(container, options)
        mapRef.current = map
        setIsReady(true)

        // 지도 클릭 시 모달 닫기
        window.kakao.maps.event.addListener(map, 'click', () => {
          setModalClosing(true)
        })
      })
      .catch(error => {
        console.error('지도 로드 실패:', error)
      })
  }, [])

  // 2) center 변경될 때마다 지도 중심 이동
  useEffect(() => {
    if (mapRef.current) {
      setIsReady(false)
      const moveLatLon = new window.kakao.maps.LatLng(center[0], center[1])
      mapRef.current.setCenter(moveLatLon)
      mapRef.current.setLevel(8)
      setTimeout(() => setIsReady(true), 300)
    }
  }, [center])

  // 3) list 변경 시마다 마커 갱신
  useEffect(() => {
    if (!isReady || !mapRef.current) return

    // (3-1) 기존 마커 제거
    markersRef.current.forEach(marker => marker.setMap(null))
    markersRef.current = []

    // (3-2) 새 마커 추가
    list.forEach(item => {
      const lat = parseFloat(item.mapy)
      const lng = parseFloat(item.mapx)
      if (!isNaN(lat) && !isNaN(lng)) {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(lat, lng),
          map: mapRef.current,
        })
        window.kakao.maps.event.addListener(marker, 'click', () => {
          setModalClosing(false)
          setDetail(item)
        })
        markersRef.current.push(marker)
      }
    })
  }, [list, isReady])

  return (
    <div className={`${css.container} ${!isReady ? css.loading : ''}`}>
      <div className={css.infoBar}>
        <button className={css.backBtn} onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </button>
        <span>{detail?.title}</span>
      </div>

      <div id="map" className={css.map} style={{ visibility: isReady ? 'visible' : 'hidden' }} />

      {detail && (
        <MapModal
          detail={detail}
          isClosing={modalClosing}
          onCloseComplete={() => {
            setDetail(null)
            setModalClosing(false)
          }}
        />
      )}
    </div>
  )
}

export default Map
