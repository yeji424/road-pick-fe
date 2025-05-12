import { useEffect, useState } from 'react'
import { getTourList } from '../apis/getTourList'

export const useTourList = ({ areaCode, sigunguCode }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true)
        const data = await getTourList({ areaCode, sigunguCode })
        setList(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    getList()
  }, [areaCode, sigunguCode])

  return { list, loading, error }
}
