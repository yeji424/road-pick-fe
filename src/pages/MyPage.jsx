import React from 'react'
import { useSelector } from 'react-redux'

const MyPage = () => {
  // Redux store에서 user 정보만 꺼내서 화면에 표시
  const user = useSelector(state => state.auth.user)

  return (
    <main>
      <h2>{user.name}님의 마이페이지</h2>
      <p>이메일: {user.email}</p>
      <p>테스트: {user._id}</p>
      {/* 필요에 따라 프로필 사진, 즐겨찾기, 가입일 등 추가 */}
    </main>
  )
}

export default MyPage
