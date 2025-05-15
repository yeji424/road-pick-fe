import axios from 'axios'

// axios.defaults.withCredentials = true
const API_URL = 'http://localhost:5000'

export const createSchedule = async schedule => {
  const responce = await axios.post(`${API_URL}/schedule`, schedule)
  return responce.data
}

export const getScheduleList = async () => {
  const responce = await axios.get(`${API_URL}/schedule/list`)
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
