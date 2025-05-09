// src/components/common/Map/Map.jsx
import React, { useEffect, useRef } from 'react'
import { loadKakaoMapScript } from '../../../loaders/kakaoLoader'
import css from './Map.module.css'

const Map = ({ center }) => {
  const mapRef = useRef(null)

  useEffect(() => {
    loadKakaoMapScript()
      .then(() => {
        // 지도를 표시할 <div> 요소를 id="map"으로
        const container = document.getElementById('map')
        //지도 생성 옵션
        const options = {
          center: new window.kakao.maps.LatLng(center[0], center[1]), // 첫 위치: 서울
          level: 8, // 초기 확대 레벨
        }
        mapRef.current = new window.kakao.maps.Map(container, options)
      })
      .catch(error => {
        console.error('지도 로드 실패:', error)
      })
  }, [])

  // center prop이 바뀔 때마다 지도 위치 이동
  useEffect(() => {
    if (mapRef.current) {
      const moveLatLon = new window.kakao.maps.LatLng(center[0], center[1])
      mapRef.current.setCenter(moveLatLon)
    }
  }, [center])

  return (
    <>
      <div id="map" className={css.map}></div>
    </>
  )
}

export default Map
