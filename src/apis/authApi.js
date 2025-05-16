import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

/**
 * @param {{ email: string, name: string, password: string }} data
 */
export async function register(data) {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, data)
    return res.data
  } catch (err) {
    const payload = err.response?.data || {}
    const message = payload.message || '회원가입 실패'
    const error = new Error(message)
    error.status = err.response?.status
    error.validation = payload.errors
    throw error
  }
}

/**
 * @param {{ email: string, password: string }} data
 */
export async function login(data) {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, data, {
      withCredentials: true,
    })
    return res.data
  } catch (err) {
    const payload = err.response?.data || {}
    const message = payload.message || '로그인 실패'
    const error = new Error(message)
    error.status = err.response?.status
    throw error
  }
}

// ── 프로필 조회
export async function fetchProfile() {
  try {
    const res = await axios.get(`${API_URL}/auth/profile`, {
      withCredentials: true,
    })
    return res.data
  } catch {
    throw new Error('프로필 조회 실패')
  }
}

// ── 토큰 갱신
export async function refreshToken() {
  try {
    const res = await axios.post(
      `${API_URL}/auth/refresh`,
      {}, // POST 바디가 없더라도 빈 객체 전달
      {
        withCredentials: true,
      }
    )
    return res.data
  } catch (err) {
    const payload = err.response?.data || {}
    const message = payload.message || '토큰 갱신 실패'
    const error = new Error(message)
    error.status = err.response?.status
    throw error
  }
}

// ── 로그아웃
export async function logout() {
  try {
    const res = await axios.post(
      `${API_URL}/auth/logout`,
      {}, // POST 바디가 필요 없으므로 빈 객체
      {
        withCredentials: true,
      }
    )
    return res.data
  } catch (err) {
    const payload = err.response?.data || {}
    const message = payload.message || '로그아웃 실패'
    const error = new Error(message)
    error.status = err.response?.status
    throw error
  }
}
