import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import Spinner from '@/components/loading/Spinner'

export function RequireAuth({ children }) {
  const { user, status } = useSelector(state => state.auth)
  const location = useLocation()

  // 프로필 로딩 전(idle)·로딩 중(loading)에는 스피너 표시
  if (status === 'idle' || status === 'loading') {
    return <Spinner />
  }

  // 로딩 끝났는데 user가 없으면 로그인으로 리다이렉트
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  // user가 있으면 자식 렌더링
  return children
}
