import { useEffect, useState } from 'react'
import { getTourList } from '@/apis/getTourList'

export const usePopularTourList = ({ areaCode, sigunguCode, contentTypeId = 12 }) => {
  const [populars, setPopulars] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPopulars = async () => {
      try {
        setLoading(true)

        if (!areaCode) {
          // 전국일 경우 모든 지역에서 가져오기
          const areaCodes = [1, 2, 3, 4, 5, 6, 7, 8, 31, 32, 33, 34, 35, 36, 37, 38, 39]
          const responses = await Promise.all(
            areaCodes.map(code => getTourList({ areaCode: code, contentTypeId }))
          )

          const merged = responses.flat()
          const filtered = merged
            .filter(item => item.firstimage)
            .sort(() => Math.random() - 0.5)
            .slice(0, 10)

          setPopulars(filtered)
        } else {
          // 지역 선택된 경우
          const data = await getTourList({ areaCode, contentTypeId })
          setPopulars(data)
        }
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPopulars()
  }, [areaCode, sigunguCode, contentTypeId])

  return { populars, loading, error }
}
