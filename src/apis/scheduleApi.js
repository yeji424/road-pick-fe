import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const createSchedule = async schedule => {
  const responce = await axios.post(`${API_URL}/schedule`, schedule)
  return responce.data
}

export const getScheduleList = async userId => {
  const responce = await axios.get(`${API_URL}/schedule/list/${userId}`)
  return responce.data
}

export const getScheduleDetail = async scheduleId => {
  if (!scheduleId) return
  const responce = await axios.get(`${API_URL}/schedule/detail/${scheduleId}`)
  return responce.data
}

export const deleteSchedule = async scheduleId => {
  const responce = await axios.delete(`${API_URL}/schedule/delete/${scheduleId}`)
  return responce.data
}
