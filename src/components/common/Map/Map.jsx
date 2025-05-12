// src/components/common/Map/Map.jsx
import React, { useEffect, useRef, useState } from 'react'
import { loadKakaoMapScript } from '../../../loaders/kakaoLoader'
import css from './Map.module.css'
import { getTourData } from './TourApi'
import MapModal from './MapModal'
import { useNavigate } from 'react-router-dom'

const Map = ({ center }) => {
  const mapRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const [detail, setDetail] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadKakaoMapScript()
      .then(async () => {
        // 지도를 표시할 <div> 요소를 id="map"으로
        const container = document.getElementById('map')
        // 지도 생성 옵션
        const options = {
          center: new window.kakao.maps.LatLng(center[0], center[1]), // 첫 위치: 서울
          level: 8, // 초기 확대 레벨
        }
        const map = new window.kakao.maps.Map(container, options)
        mapRef.current = map
        setIsReady(true)

        // 지도 클릭 시 모달 창 닫힘
        window.kakao.maps.event.addListener(map, 'click', () => {
          setDetail(null)
        })

        // 관광지 데이터 받아오기
        const data = await getTourData()

        // 관광지마다 마커 찍기
        data.forEach(item => {
          const lat = parseFloat(item.mapy)
          const lng = parseFloat(item.mapx)

          // 유효한 좌표일 때만
          if (!isNaN(lat) && !isNaN(lng)) {
            const marker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(lat, lng),
              map: map,
              //title: item.title, // 마커 hover 시 뜨는 제목
            })
            window.kakao.maps.event.addListener(marker, 'click', () => {
              setDetail(item) // item = 관광지 데이터
            })
          }
        })
      })
      .catch(error => {
        console.error('지도 로드 실패:', error)
      })
  }, [])

  // center prop이 바뀔 때마다 지도 위치 이동
  useEffect(() => {
    if (mapRef.current) {
      setIsReady(false)
      const moveLatLon = new window.kakao.maps.LatLng(center[0], center[1])
      mapRef.current.setCenter(moveLatLon)
      mapRef.current.setLevel(8)
      // 여유 시간을 두어 지도가 처음 위치가 겹쳐 보이는 현상 방지
      setTimeout(() => {
        setIsReady(true)
      }, 300)
    }
  }, [center])

  return (
    <div className={`${css.container} ${!isReady ? css.loading : ''}`}>
      <div className={css.infoBar}>
        <button className={css.backBtn} onClick={() => navigate(-1)}>
          ←
        </button>
        <span>{detail && detail.title}</span>
      </div>

      <div id="map" className={css.map} style={{ visibility: isReady ? 'visible' : 'hidden' }} />

      {detail && <MapModal detail={detail} />}
    </div>
  )
}

export default Map
