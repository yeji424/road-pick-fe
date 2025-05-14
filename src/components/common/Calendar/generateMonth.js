/*해당 월의 날짜 채우기*/
const generateMonth = (year, month) => {
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

export default generateMonth
