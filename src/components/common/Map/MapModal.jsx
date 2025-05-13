import React from 'react'
import css from './MapModal.module.css'

const MapModal = ({ detail }) => {
  return (
    <div className={css.modal}>
      <div className={css.card}>
        <img src={detail.firstimage || '/no-image.png'} alt={detail.title} className={css.image} />
        <div className={css.info}>
          <div className={css.topRow}>
            <span className={css.rating}>
              ★ 4.8 <span className={css.count}>(24)</span>
            </span>
            <button className={css.bookmark}>책갈피</button>
          </div>
          <h3 className={css.title}>{detail.title}</h3>
          <p className={css.addr}>{detail.addr1}</p>
        </div>
      </div>
    </div>
  )
}

export default MapModal
