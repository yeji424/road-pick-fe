import { useEffect, useState } from 'react'
import { getTourList } from '@/apis/getTourList'

export const usePopularTourList = ({ areaCode, sigunguCode, contentTypeId = 12 }) => {
  const [populars, setPopulars] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // contentTypeId 포함한 캐시 키 생성
  const ALL_POPULARS_KEY = `allPopulars_v1_${contentTypeId}`

  useEffect(() => {
    const fetchPopulars = async () => {
      try {
        setLoading(true)

        if (!areaCode) {
          // 캐시된 데이터 있으면 사용
          const cached = sessionStorage.getItem(ALL_POPULARS_KEY)
          if (cached) {
            setPopulars(JSON.parse(cached))
            setLoading(false)
            return
          }

          // 전국 데이터 여러 지역에서 불러오기
          const areaCodes = [1, 2, 3, 4, 5, 6, 7, 8, 31, 32, 33, 34, 35, 36, 37, 38, 39]
          const responses = await Promise.all(
            areaCodes.map(code => getTourList({ areaCode: code, contentTypeId }))
          )

          const merged = responses.flat()
          const filtered = merged
            .filter(item => item.firstimage)
            .sort(() => Math.random() - 0.5)
            .slice(0, 10)

          sessionStorage.setItem(ALL_POPULARS_KEY, JSON.stringify(filtered))
          setPopulars(filtered)
        } else {
          // 지역별 데이터 불러오기
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
  }, [areaCode, sigunguCode, contentTypeId, ALL_POPULARS_KEY])

  return { populars, loading, error }
}
