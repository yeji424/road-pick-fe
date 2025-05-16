export const generateDateRange = (startDateStr, endDateStr) => {
  const result = []
  const start = new Date(startDateStr)
  const end = new Date(endDateStr)

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    result.push(`${yyyy}.${mm}.${dd}`)
  }

  return result
}
