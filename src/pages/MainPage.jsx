import Map from '@/components/common/Map/Map'
import React from 'react'
import { NavLink } from 'react-router-dom'

const MainPage = () => {
  return (
    <main>
      <h2>MainPage</h2>
      <NavLink to="/list">리스트 보기</NavLink>
      <Map />
    </main>
  )
}

export default MainPage
