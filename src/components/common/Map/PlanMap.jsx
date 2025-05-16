// src/components/common/Map/MultiPlaceMap.jsx
import React, { useEffect, useRef } from 'react'
import { loadKakaoMapScript } from '../../../loaders/kakaoLoader'
import css from './DetailMap.module.css'

const MultiPlaceMap = ({ places }) => {
  const mapRef = useRef(null)
  useEffect(() => {
    if (!places || places.length === 0) return

    loadKakaoMapScript().then(() => {
      const container = document.getElementById('map3')
      // 지도 초기 옵션 설정 (첫 번째 장소 기준 중심)
      const options = {
        center: new window.kakao.maps.LatLng(places[0].lat, places[0].lng),
        level: 5,
      }

      const map = new window.kakao.maps.Map(container, options)
      mapRef.current = map

      const bounds = new window.kakao.maps.LatLngBounds() // 전체 장소 범위
      const linePath = [] // 선 경로 저장 배열
      const markers = [] // 생성된 마커 저장

      // 각 장소에 대해 마커와 선 경로 처리
      places.forEach((place, idx) => {
        const position = new window.kakao.maps.LatLng(place.lat, place.lng)

        // 마커 이미지 (숫자 순서 아이콘 만들기)
        const imageSrc = `https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png`
        const imageSize = new window.kakao.maps.Size(36, 37)
        const imgOptions = {
          spriteSize: new window.kakao.maps.Size(36, 691),
          spriteOrigin: new window.kakao.maps.Point(0, idx * 46),
          offset: new window.kakao.maps.Point(13, 37),
        }

        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions)
        const marker = new window.kakao.maps.Marker({
          map,
          position,
          image: markerImage,
          title: place.name,
        })

        // 경로 및 범위에 추가
        markers.push(marker)
        bounds.extend(position)
        linePath.push(position)
      })

      // 선 그리기
      const polyline = new window.kakao.maps.Polyline({
        path: linePath, // 연결할 좌표 배열
        strokeWeight: 5,
        strokeColor: 'var(--primary-blue-80)',
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
      })
      polyline.setMap(map) // 지도에 선 추가

      // 모든 마커가 잘 보이도록 지도 범위 조절
      map.setBounds(bounds)
    })
  }, [places])

  return (
    <div className={css.Plancontainer}>
      <div id="map3" className={css.map} />
    </div>
  )
}

export default MultiPlaceMap
