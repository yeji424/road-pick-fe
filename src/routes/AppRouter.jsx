import React, { Suspense } from 'react'
import Spinner from '@/components/loading/Spinner'
import MainLayout from '@/layout/MainLayout'
import MainPage from '@/pages/MainPage'
import NotFoundPage from '@/pages/NotFoundPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MyPage from '@/pages/MyPage'
import ListPage from '@/pages/ListPage'
import BookMarkPage from '@/pages/BookMarkPage'
import CalendarPage from '@/pages/CalendarPage'
import MapPage from '@/pages/MapPage'

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<Spinner />}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: '/mypage',
        element: (
          <Suspense fallback={<Spinner />}>
            <MyPage />
          </Suspense>
        ),
      },
      {
        path: '/bookmark',
        element: (
          <Suspense fallback={<Spinner />}>
            <BookMarkPage />
          </Suspense>
        ),
      },
      {
        path: '/calendar',
        element: (
          <Suspense fallback={<Spinner />}>
            <CalendarPage />
          </Suspense>
        ),
      },
      {
        path: '/list',
        element: (
          <Suspense fallback={<Spinner />}>
            <ListPage />
          </Suspense>
        ),
      },
      {
        path: '/map',
        element: (
          <Suspense fallback={<Spinner />}>
            <MapPage />
          </Suspense>
        ),
      },
    ],
  },
])

export default function Router() {
  return <RouterProvider router={AppRouter} fallbackElement={<Spinner />} />
}
