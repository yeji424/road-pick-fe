import { getScheduleDetail } from '@/apis/scheduleApi'
import { formatDateToLocalString } from '@/components/common/Calendar/CalendarLogic'
import { useEffect, useState } from 'react'

export const useScheduleDetail = scheduleId => {
  const [schedule, setSchedule] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!scheduleId) return
    const fetchSheduleDetail = async () => {
      try {
        setLoading(true)
        const data = await getScheduleDetail(scheduleId)
        const formattedData = {
          ...data,
          start: formatDateToLocalString(data.startDate),
          end: formatDateToLocalString(data.endDate),
        }
        setSchedule(formattedData)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchSheduleDetail()
  }, [scheduleId])

  return { schedule, loading, error }
}
