import { getTourList } from '../apis/getTourList'
import { useQuery } from '@tanstack/react-query'

export const useTourList = ({ areaCode, contentTypeId }) => {
  return useQuery({
    queryKey: ['tourList', areaCode, contentTypeId],
    queryFn: () => {
      return getTourList({ areaCode, contentTypeId })
    },
    enabled: !!areaCode && !!contentTypeId, // undefined 방지
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
  })
}
