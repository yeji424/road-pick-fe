import React, { useState, useEffect } from 'react'
import FirstLoadingPage from '@/pages/FirstLoadingPage'
import Router from './routes/AppRouter'

export default function App() {
  const [loading, setLoading] = useState(() => {
    return !localStorage.getItem('hasLoadedBefore')
  })

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false)
        localStorage.setItem('hasLoadedBefore', 'true')
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [loading])

  if (loading) {
    return <FirstLoadingPage />
  }

  return <Router />
}
