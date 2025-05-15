import { getScheduleList } from '@/apis/scheduleApi'
import { formatDateToLocalString } from '@/components/common/Calendar/CalendarLogic'
import { useEffect, useState } from 'react'

export const useScheduleList = () => {
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSheduleList = async () => {
      try {
        setLoading(true)
        const data = await getScheduleList()
        const formattedData = data.map(schedule => ({
          ...schedule,
          start: formatDateToLocalString(schedule.startDate),
          end: formatDateToLocalString(schedule.endDate),
        }))
        setSchedules(formattedData)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSheduleList()
  }, [])

  return { schedules, loading, error }
}
