import React, { Suspense } from 'react'
import Spinner from '@/components/loading/Spinner'
import MainLayout from '@/layout/MainLayout'
import MainPage from '@/pages/MainPage'
import NotFoundPage from '@/pages/NotFoundPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CalenderPage from '@/pages/CalenderPage'
import MyPage from '@/pages/MyPage'
import ListPage from '@/pages/ListPage'
import BookMarkPage from '@/pages/BookMarkPage'
import DetailPage from '@/pages/DetailPage'

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
        path: '/calender',
        element: (
          <Suspense fallback={<Spinner />}>
            <CalenderPage />
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
        path: '/detail/:contenttypeid/:contentid',
        element: (
          <Suspense fallback={<Spinner />}>
            <DetailPage />
          </Suspense>
        ),
      },
    ],
  },
])

export default function Router() {
  return <RouterProvider router={AppRouter} fallbackElement={<Spinner />} />
}
