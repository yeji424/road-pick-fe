import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '@/components/common/Navbar/Navbar'
import Footer from '@/components/common/Footer/Footer'
import Spinner from '@/components/loading/Spinner'

const MainLayout = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  )
}

export default MainLayout
