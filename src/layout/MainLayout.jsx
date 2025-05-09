import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '@/components/common/Header/Header'
import Footer from '@/components/common/Footer/Footer'
import Spinner from '@/components/loading/Spinner'

const MainLayout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  )
}

export default MainLayout
