import React, { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Navbar from '@/components/common/Navbar/Navbar'
import Footer from '@/components/common/Footer/Footer'
import Spinner from '@/components/loading/Spinner'
import { useDispatch } from 'react-redux'
import { fetchProfile, refreshToken } from '@/store/authSlice'
const MainLayout = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const isMapPage = location.pathname === '/map'
  const isPage =
    location.pathname === '/register' ||
    location.pathname === '/login' ||
    location.pathname === '/map'

  // 앱이 마운트될 때 프로필 조회
  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch, location.pathname])

  return (
    <div className={`${isMapPage ? 'mapPage' : ''}`}>
      {!isPage && <Navbar />}
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  )
}

export default MainLayout
