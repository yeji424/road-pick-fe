import { getLocationTourList } from '@/apis/getLocationTourList'
import { useQuery } from '@tanstack/react-query'

export const useLocationTourList = (mapX, mapY, radius, contentTypeId) => {
  return useQuery({
    queryKey: ['LocationTourList', mapX, mapY, radius, contentTypeId],
    queryFn: () => getLocationTourList({ mapX, mapY, radius, contentTypeId }),
    enabled: !!mapX && !!mapY, // mapX,mapY는 필수 없으면 요청 안 보냄
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
  })
}
