import axios from 'axios'

axios.defaults.withCredentials = false

const API_URL = import.meta.env.VITE_API_URL

// 일정 생성
export const createScheduleDetail = async detail => {
  const response = await axios.post(`${API_URL}/scheduledetail`, detail)
  return response.data
}

// 특정 Trip에 속한 일정 전체 조회 (날짜순 정렬 기대)
export const getScheduleDetailList = async tripId => {
  if (!tripId) return
  const response = await axios.get(`${API_URL}/scheduledetail/list/${tripId}`)
  return response.data
}

// 특정 Trip의 특정 날짜 일정 조회
export const getScheduleDetailByDate = async (tripId, visitDate) => {
  if (!tripId || !visitDate) return
  const response = await axios.get(`${API_URL}/scheduledetail/list/${tripId}/${visitDate}`)
  return response.data
}

// 일정 삭제
export const deleteScheduleDetail = async (detailId, tripId, visitDate) => {
  const response = await axios.delete(
    `${API_URL}/scheduledetail/${detailId}/${tripId}/${visitDate}`
  )
  return response.data
}

// 일정 수정
export const updateScheduleDetail = async (detailId, updatedData) => {
  const response = await axios.put(`${API_URL}/scheduledetail/${detailId}`, updatedData)
  return response.data
}
