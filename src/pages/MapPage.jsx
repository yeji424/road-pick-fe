import Map from '@/components/common/Map/Map'
import React, { useState } from 'react'
import css from './MapPage.module.css'

const DEFAULT_CITY = { name: '서울', lat: 37.5665, lng: 126.978 }

const MapPage = () => {
  const [city, setCity] = useState(DEFAULT_CITY)
  return (
    <div className={css.fullPage}>
      <Map center={[city.lat, city.lng]} />
    </div>
  )
}

export default MapPage
