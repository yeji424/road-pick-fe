import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // 로그인 후 쿠키 전송을 위해
  headers: {
    'Content-Type': 'application/json',
  },
})

// (필요시 요청/응답 인터셉터 추가 가능)

export default api
