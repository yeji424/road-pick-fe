import React, { Suspense, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Navbar from '@/components/common/Navbar/Navbar'
import Footer from '@/components/common/Footer/Footer'
import Spinner from '@/components/loading/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile, refreshToken } from '@/store/authSlice'
import ModalRoot from '@/components/common/Modal/ModalRoot'
const MainLayout = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const user = useSelector(state => state.auth.user)

  const isMapPage = location.pathname === '/map'
  const isPage =
    location.pathname === '/register' ||
    location.pathname === '/login' ||
    location.pathname === '/map' ||
    location.pathname.includes('/plan') ||
    location.pathname === '/firstloading'
  const [profileFetched, setProfileFetched] = useState(false)

  useEffect(() => {
    if (!profileFetched) {
      dispatch(fetchProfile())
      setProfileFetched(true)
    }
  }, [dispatch, profileFetched])

  useEffect(() => {
    if (user) {
      dispatch(refreshToken())
    }
  }, [dispatch, location.pathname, user])

  return (
    <div className={`${isMapPage ? 'mapPage' : ''}`}>
      {!isPage && <Navbar />}
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
      <Footer />
      <ModalRoot />
    </div>
  )
}

export default MainLayout
