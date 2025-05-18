import { useQuery } from '@tanstack/react-query'
import { getScheduleDetail } from '@/apis/scheduleApi'
import { formatDateToLocalString } from '@/components/common/Calendar/CalendarLogic'

export const useScheduleDetail = scheduleId => {
  return useQuery({
    queryKey: ['scheduleDetail', scheduleId],
    queryFn: () => getScheduleDetail(scheduleId),
    enabled: !!scheduleId,
    staleTime: 1000 * 60 * 5, // 5분 동안은 fresh 상태
    cacheTime: 1000 * 60 * 10, // 캐시 유지
    select: data => ({
      ...data,
      start: formatDateToLocalString(data.startDate),
      end: formatDateToLocalString(data.endDate),
    }),
  })
}
