import { getKeywordTourList } from '@/apis/getKeywordTourList'
import { useQuery } from '@tanstack/react-query'
export const useTourList = ({ keyword, contentTypeId }) => {
  return useQuery({
    queryKey: ['tourList', keyword, contentTypeId],
    queryFn: () => getKeywordTourList({ keyword, contentTypeId }),
    enabled: !!keyword, // keyword 필수 없으면 요청 안 보냄
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
  })
}
