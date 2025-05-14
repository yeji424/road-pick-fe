import React, { useState } from 'react'
import css from './MyPage.module.css'
import Header from '@/components/common/Header/Header'
import MyTrips from '@/components/mypage/MyTrips'
import SavedList from '@/components/mypage/SavedList'
import FriendsList from '@/components/mypage/FriendsList'

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('myTrips')
  const onTabChange = tab => {
    setActiveTab(tab)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'myTrips':
        return <MyTrips />
      case 'saved':
        return <SavedList />
      case 'friends':
        return <FriendsList />
      default:
        return null
    }
  }

  const tabs = [
    { key: 'myTrips', label: '내 여행' },
    { key: 'saved', label: '저장 목록' },
    { key: 'friends', label: '친구 목록' },
  ]

  const renderTabButton = (key, label) => (
    <button
      key={key}
      className={activeTab === key ? css.active : ''}
      onClick={() => onTabChange(key)}
    >
      {label}
    </button>
  )
  return (
    <main>
      <Header
        showButton
        buttonText="프로필 편집"
        onButtonClick={() => console.log('버튼 클릭됨')}
      />
      {/* 프로필 영역 */}
      <section className={css.profile}>
        <div className={css.img}>프로필 이미지</div>
        <div className={css.info}>
          <h3>ㅇㅇㅇ님</h3>
          <p>일정을 생성하고 계획해보세요!</p>
        </div>
      </section>
      {/* 탭 영역 */}
      <div className={css.tabs}>{tabs.map(tab => renderTabButton(tab.key, tab.label))}</div>

      {/* 탭 별 컨텐츠 랜딩 영역 */}
      <div className={css.content}>{renderContent()}</div>
    </main>
  )
}

export default MyPage

// import React from 'react'
// import { useSelector } from 'react-redux'

// const MyPage = () => {
//   // Redux store에서 user 정보만 꺼내서 화면에 표시
//   const user = useSelector(state => state.auth.user)

//   return (
//     <main>
//       <h2>{user.name}님의 마이페이지</h2>
//       <p>이메일: {user.email}</p>
//       <p>테스트: {user._id}</p>
//       {/* 필요에 따라 프로필 사진, 즐겨찾기, 가입일 등 추가 */}
