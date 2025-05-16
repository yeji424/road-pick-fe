import { useEffect, useState } from 'react'
import { getTourList } from '@/apis/getTourList'

export const useRecommendTourList = ({ areaCode, sigunguCode }) => {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true)
        const data = await getTourList({ areaCode, sigunguCode, contentTypeId: 12 })
        setRecommendations(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [areaCode, sigunguCode])

  return { recommendations, loading, error }
}
