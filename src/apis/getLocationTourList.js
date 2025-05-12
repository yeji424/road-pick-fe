import { getLocationTourList } from '@/apis/getLocationTourList'
import { useEffect, useState } from 'react'

export const useLocationTourList = params => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!params || !params.mapX || !params.mapY || !params.contentTypeId) return

    const getList = async () => {
      try {
        setLoading(true)
        const data = await getLocationTourList(params)
        setList(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    getList()
  }, [params?.mapX, params?.mapY])

  return list
}
