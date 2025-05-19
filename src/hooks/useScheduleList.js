import { useQuery } from '@tanstack/react-query'
import { getScheduleList } from '@/apis/scheduleApi'
import { formatDateToLocalString } from '@/components/common/Calendar/CalendarLogic'

export const useScheduleList = userId => {
  return useQuery({
    queryKey: ['scheduleList', userId],
    queryFn: async () => {
      const data = await getScheduleList(userId)
      return data.map(schedule => ({
        ...schedule,
        start: formatDateToLocalString(schedule.startDate),
        end: formatDateToLocalString(schedule.endDate),
      }))
    },
    enabled: !!userId,
    staleTime: 5 * 60,
    retry: 1,
  })
}
