// src/components/common/Map/Map.jsx
import React, { useEffect, useRef } from 'react'
import { loadKakaoMapScript } from '../../../loaders/kakaoLoader'
import css from './DetailMap.module.css'

const DetailMap = ({ mapy, mapx }) => {
  const mapRef = useRef(null)
  useEffect(() => {
    if (!mapx || !mapy) return
    loadKakaoMapScript()
      .then(async () => {
        // 지도를 표시할 <div> 요소를 id="map2"으로
        const container = document.getElementById('map2')
        // 지도 생성 옵션
        const options = {
          center: new window.kakao.maps.LatLng(mapy, mapx), // 첫 위치: 서울
          level: 3, // 초기 확대 레벨
        }
        const map2 = new window.kakao.maps.Map(container, options)
        mapRef.current = map2

        //확대 축소 불가
        mapRef.current.setZoomable(false)

        // 지도 이동 제한: 드래그 비활성화
        mapRef.current.setDraggable(false)
      })
      .catch(error => {
        console.error('지도 로드 실패:', error)
      })
  }, [mapx, mapy])

  return (
    <div className={css.container}>
      <div id="map2" className={css.map} />
    </div>
  )
}

export default DetailMap
