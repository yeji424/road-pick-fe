import { useEffect, useState } from 'react'
import { getKeywordTourList } from '@/apis/getKeywordTourList'
export const useTourList = ({ keyword, contentTypeId }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true)
        const data = await getKeywordTourList(keyword, contentTypeId)
        setList(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    getList()
  }, [keyword, contentTypeId])

  return { list, loading, error }
}
