import { useEffect, useState } from 'react'
import { getTourList } from '@/apis/getTourList'

export const usePopularTourList = ({ areaCode, sigunguCode }) => {
  const [populars, setPopulars] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPopulars = async () => {
      try {
        setLoading(true)
        const data = await getTourList({ areaCode, sigunguCode })
        setPopulars(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPopulars()
  }, [areaCode, sigunguCode])

  return { populars, loading, error }
}
