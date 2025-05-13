import { useEffect, useState } from 'react'
import { getTourDetailCommon } from '../apis/getTourDetailCommon'
import { getTourDetailIntro } from '@/apis/getTourDetailIntro'

export const useTourDetail = (contentId, contentTypeId) => {
  const [commonData, setCommonData] = useState(null)
  const [introData, setIntroData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [common, intro] = await Promise.all([
          getTourDetailCommon(contentId, contentTypeId),
          getTourDetailIntro(contentId, contentTypeId),
        ])
        setCommonData(common)
        setIntroData(intro)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [contentId, contentTypeId])

  return { commonData, introData, loading, error }
}
