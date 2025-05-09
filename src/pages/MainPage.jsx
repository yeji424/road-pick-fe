import CitySelector from '@/components/common/Map/CitySelector'
import Map from '@/components/common/Map/Map'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const DEFAULT_CITY = { name: '서울', lat: 37.5665, lng: 126.978 }

const MainPage = () => {
  const [city, setCity] = useState(DEFAULT_CITY)

  return (
    <main>
      <h2>MainPage</h2>
      <CitySelector selected={city} onSelect={setCity} />
      <NavLink to="/list">리스트 보기</NavLink>
      <Map center={[city.lat, city.lng]} />
    </main>
  )
}

export default MainPage
