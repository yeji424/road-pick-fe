import React, { useEffect, useRef, useState } from 'react'
import { loadKakaoMapScript } from '../../../loaders/kakaoLoader'
import css from './DetailMap.module.css'

const MultiPlaceMap = ({ places }) => {
  const mapRef = useRef(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  useEffect(() => {
    loadKakaoMapScript().then(() => {
      setIsMapLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (!isMapLoaded || !places || places.length === 0) return

    const validPlaces = places.filter(p => p.lat != null && p.lng != null)
    if (validPlaces.length === 0) return
    const container = document.getElementById('map3')
    const options = {
      center: new window.kakao.maps.LatLng(places[0].lat, places[0].lng),
      level: 5,
    }

    const map = new window.kakao.maps.Map(container, options)
    mapRef.current = map

    const bounds = new window.kakao.maps.LatLngBounds()
    const linePath = []
    const markers = []

    places.forEach((place, idx) => {
      const position = new window.kakao.maps.LatLng(place.lat, place.lng)

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

      markers.push(marker)
      bounds.extend(position)
      linePath.push(position)
    })

    const polyline = new window.kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: 'var(--primary-blue-80)',
      strokeOpacity: 0.8,
      strokeStyle: 'solid',
    })
    polyline.setMap(map)

    map.setBounds(bounds)
  }, [isMapLoaded, places])

  return (
    <div className={css.Plancontainer}>
      <div id="map3" className={css.map} />
    </div>
  )
}

export default MultiPlaceMap
