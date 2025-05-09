// src/components/common/Map/Map.jsx
import React, { useEffect } from 'react'
import { loadKakaoMapScript } from '../../../loaders/kakaoLoader' // 여기서 import
import css from './Map.module.css'

const Map = () => {
  useEffect(() => {
    loadKakaoMapScript()
      .then(() => {
        // 지도를 표시할 <div> 요소를 id="map"으로로
        const container = document.getElementById('map')
        //지도 생성 옵션션
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울
          level: 3, // 초기 확대 레벨
        }

        // 해당 컨테이너에 Kakao 지도를 그려줌줌
        new window.kakao.maps.Map(container, options)
      })
      .catch(error => {
        console.error('지도 로드 실패:', error)
      })
  }, [])
  return (
    <>
      <div id="map" className={css.map}></div>
    </>
  )
}

export default Map
