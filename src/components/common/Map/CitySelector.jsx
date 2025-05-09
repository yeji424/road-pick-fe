import React from 'react'
import css from './CitySelector.module.css'

const CITIES = [
  { name: '서울', lat: 37.5665, lng: 126.978 },
  { name: '인천', lat: 37.4563, lng: 126.7052 },
  { name: '대전', lat: 36.3504, lng: 127.3845 },
  { name: '대구', lat: 35.8714, lng: 128.6014 },
  { name: '부산', lat: 35.1796, lng: 129.0756 },
  { name: '광주', lat: 35.1595, lng: 126.8526 },
  { name: '전주', lat: 35.8242, lng: 127.1472 },
  { name: '제주', lat: 33.4996, lng: 126.5312 },
]

const CitySelector = ({ selected, onSelect }) => {
  return (
    <div className={css.container}>
      {CITIES.map(city => (
        <button
          key={city.name}
          className={`${css.button} ${selected.name === city.name ? css.active : ''}`}
          onClick={() => onSelect(city)}
        >
          {city.name}
        </button>
      ))}
    </div>
  )
}

export default CitySelector
