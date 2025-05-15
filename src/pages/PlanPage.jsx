import React from 'react'
import Header from '@/components/common/Header/Header'
import css from './PlanPage.module.css'
import UserIcon from '@/assets/icons/userIcon.svg?react'

const PlanPage = () => {
  return (
    <main>
      <Header />

      <section className={css.infoSection}>
        <p className={css.tripTitle}>어디로 여행</p>
        <p className={css.tripDate}>2025.05.11 - 05.15</p>
      </section>

      <h2 className={css.description}>하루하루 구체적인 계획을 세워보아요!</h2>

      <section className={css.friendSection}>
        {[...Array(3)].map((_, idx) => (
          <div
            className={`${css.friendIcon} ${css[`color${idx + 1}`]}`}
            key={idx}
            style={{ zIndex: idx + 1 }}
          >
            <UserIcon className={css.userIcon} />
          </div>
        ))}

        <button className={css.addButton} style={{ zIndex: 3 }}>
          + 인원추가
        </button>
      </section>
    </main>
  )
}

export default PlanPage
