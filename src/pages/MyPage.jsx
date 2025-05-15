import React, { useState } from 'react'
import css from './MyPage.module.css'
import Header from '@/components/common/Header/Header'
import MyTrips from '@/components/mypageTaps/MyTrips'
import SavedList from '@/components/mypageTaps/SavedList'
import FriendsList from '@/components/mypageTaps/FriendsList'
import { useDispatch, useSelector } from 'react-redux'
import profileImage from '@/assets/imgs/ProfileBasicImg.png'
import LogoutIcon from '@/assets/icons/logoutIcon.svg?react'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/store/authSlice'

const MyPage = () => {
  //   // Redux store에서 user 정보만 꺼내서 화면에 표시
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const tabs = [
    { key: 'myTrips', label: '내 여행', component: <MyTrips /> },
    { key: 'saved', label: '저장 목록', component: <SavedList /> },
    { key: 'friends', label: '친구 목록', component: <FriendsList /> },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const onTabChange = index => {
    setActiveIndex(index)
  }

  return (
    <main>
      <Header
        showButton
        buttonText="프로필 편집"
        onButtonClick={() => navigate('/profileEdit')}
        showIcon
        iconSvg={<LogoutIcon />}
        onIconClick={() => console.log('로그아웃 버튼 클릭됨')}
      />
      {/* 프로필 영역 */}
      <section className={css.profile}>
        <div className={css.img}>
          <img src={user.profileImage || profileImage} alt="프로필 이미지" />
        </div>
        <div className={css.info}>
          <h3>{user.name}님</h3>
          <p>일정을 생성하고 계획해보세요!</p>
        </div>
      </section>
      <p className={css.logoutText} onClick={handleLogout}>
        로그아웃
      </p>
      {/* 탭 영역 */}
      <div className={css.tabs}>
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            className={`${css.tabButton} ${activeIndex === index ? css.active : ''}`}
            onClick={() => onTabChange(index)}
          >
            {tab.label}
          </button>
        ))}
        <div
          className={css.underline}
          style={{ transform: `translateX(${activeIndex * 100}%)`, width: `${100 / tabs.length}%` }}
        />{' '}
      </div>{' '}
      {/* 탭 별 컨텐츠 랜딩 영역 */}
      <div className={css.sliderContainer}>
        <div className={css.slider} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {tabs.map(tab => (
            <div className={css.slide} key={tab.key}>
              {tab.component}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default MyPage
