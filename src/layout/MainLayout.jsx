import React, { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Navbar from '@/components/common/Navbar/Navbar'
import Footer from '@/components/common/Footer/Footer'
import Spinner from '@/components/loading/Spinner'
const MainLayout = () => {
  const location = useLocation()
  const isMapPage = location.pathname === '/map'
  const isPage =
    location.pathname === '/register' ||
    location.pathname === '/login' ||
    location.pathname === '/map'

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
