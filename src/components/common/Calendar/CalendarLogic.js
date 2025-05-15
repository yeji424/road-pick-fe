/*해당 월의 날짜 채우기*/
export const generateMonth = (year, month) => {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0) // 해당 월의 마지막 날짜
  const dates = []

  const firstWeekDay = firstDay.getDay()
  for (let i = 0; i < firstWeekDay; i++) {
    dates.push(null) // 시작 전 빈칸 채우기
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    dates.push(new Date(year, month, day)) //날짜 넣기
  }

  return dates
}

/*스케줄 날짜가 일정 범위에 포함되는지 검사하는 함수 */
export const getSchedulesForDate = (dateString, schedules) => {
  const currentDate = new Date(dateString)
  return schedules?.filter(({ start, end }) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    return currentDate >= startDate && currentDate <= endDate
  })
}
/* 해당 날짜가 start와 end 사이에 있는지 확인*/
export const isInSelectedRange = (date, start, end) => {
  if (!start || !end || !date) return false
  const d = new Date(date)
  const s = new Date(start)
  const e = new Date(end)
  return s <= d && d <= e
}
/*  로컬 시간 기준으로 날짜를 문자열로 변환 */
export const formatDateToLocalString = date => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
