import React, { useEffect, useState } from 'react'
import css from './MyPage.module.css'
import Header from '@/components/common/Header/Header'
import MyTrips from '@/components/mypageTaps/MyTrips'
import SavedList from '@/components/mypageTaps/SavedList'
import FriendsList from '@/components/mypageTaps/FriendsList'
import { useSelector } from 'react-redux'
import profileImage from '@/assets/imgs/ProfileBasicImg.png'
import LogoutIcon from '@/assets/icons/logoutIcon.svg?react'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/store/authSlice'
import { useScheduleList } from '@/hooks/useScheduleList'
import Spinner from '@/components/loading/Spinner'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useModal } from '@/hooks/useModal'
import AlertModal from '@/components/common/Modal/AlertModal'

const MyPage = () => {
  // Redux store에서 user 정보만 꺼내서 화면에 표시
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)
  const [activeIndex, setActiveIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(0)
  const { data: schedules, loading, error } = useScheduleList(user._id)
  const location = useLocation()
  const [alertMessage, setAlertMessage] = useState('')
  useEffect(() => {
    if (location.state?.alertMessage) {
      setAlertMessage(location.state.alertMessage)

      // 2초 뒤 알림 닫기
      const timer = setTimeout(() => {
        setAlertMessage('')
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [location.state])
  
  const onTabChange = index => {
    setPrevIndex(activeIndex)
    setActiveIndex(index)
  }
  const handleLogout = () => {
    openModal('logout')
  }
  console.log(schedules)
  const tabs = [
    { key: 'myTrips', label: '내 여행', component: <MyTrips setAlertMessage={setAlertMessage}  schedules={schedules} /> },
    { key: 'saved', label: '저장 목록', component: <SavedList /> },
    { key: 'friends', label: '친구 목록', component: <FriendsList /> },
  ]
  const { openModal } = useModal()
  
  if (!schedules || loading) return <Spinner />
  if (error) return <div>error..</div>
  const title =
    schedules.length > 0
      ? schedules[0].title.endsWith('여행')
        ? schedules[0].title
        : schedules[0].title + '여행'
      : ''
  return (
    <main>
      <Header
        showButton
        buttonText="프로필 편집"
        onButtonClick={() => navigate('/profileEdit')}
        showIcon
        iconSvg={<LogoutIcon />}
        onIconClick={handleLogout}
      />
      {alertMessage && (
        <AlertModal
          message={alertMessage}
          onClose={() => {
            setAlertMessage('')
            navigate(location.pathname, { replace: true })
          }}
        />
      )}{' '}
      {/* 프로필 영역 */}
      <section className={css.profile}>
        <div className={css.img}>
          <img src={user.profileImage || profileImage} alt="프로필 이미지" />
        </div>
        <div className={css.info}>
          <h3>{user.name}님</h3>
          {schedules && schedules.length > 0 ? (
            <p>{`${title} 며칠 남지 않았어요!`}</p>
          ) : (
            <p>일정을 생성하고 계획해보세요!</p>
          )}
        </div>
      </section>
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
        />
      </div>
      {/* 탭 별 컨텐츠 랜딩 영역 */}
      <div className={css.sliderContainer}>
        <div className={css.slider} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {tabs.map((tab, index) => {
            const isActive = activeIndex === index
            const isPrev = prevIndex === index
            const direction = activeIndex > prevIndex ? 'left' : 'right'

            return (
              <div
                key={tab.key}
                className={`
        ${css.slide}
        ${isActive ? css.active : ''}
        ${isPrev ? (direction === 'left' ? css.exitLeft : css.exitRight) : ''}
      `}
              >
                {tab.component}
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default MyPage
