import axios from 'axios'
axios.defaults.withCredentials = true
const API_URL = 'http://localhost:5000'

export const createSchedule = async schedule => {
  const responce = await axios.post(`${API_URL}/schedule`, schedule)
  return responce.data
}

export const getScheduleList = async () => {
  const responce = await axios.get(`${API_URL}/scheduleList`)
  return responce.data
}

export const getScheduleDetail = async scheduleId => {
  const responce = await axios.get(`${API_URL}/scheduleDetail/${scheduleId}`)
  return responce.data
}

export const deleteSchedule = async scheduleId => {
  const responce = await axios.delete(`${API_URL}/scheduleDelete/${scheduleId}`)
  return responce.data
}
