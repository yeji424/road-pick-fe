// src/api/authApi.js
const API_URL = import.meta.env.VITE_API_URL

/**
 * @param {{ email: string,  name: string,  password: string }} data
 */
export async function register(data) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const payload = await res.json()
  if (!res.ok) {
    const err = new Error(payload.message || '회원가입 실패')
    err.status = res.status
    err.validation = payload.errors
    throw err
  }
  return payload
}

/**
 * @param {{ email: string, password: string }} data
 */
export async function login(data) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // 🍪 쿠키 전송을 위해 필수
    body: JSON.stringify(data),
  })

  const payload = await res.json()
  if (!res.ok) {
    const err = new Error(payload.message || '로그인 실패')
    err.status = res.status
    throw err
  }
  return payload
}

// 프로필 조회: HttpOnly 쿠키(JWT) 포함
export async function fetchProfile() {
  const res = await fetch(`${API_URL}/auth/profile`, {
    method: 'GET',
    credentials: 'include',
  })
  if (!res.ok) throw new Error('프로필 조회 실패')
  return await res.json()
}

export async function refreshToken() {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include', // 🍪 쿠키 포함해야 서버가 기존 토큰 보고 새 토큰 발급
  })
  const payload = await res.json()
  if (!res.ok) {
    const err = new Error(payload.message || '토큰 갱신 실패')
    err.status = res.status
    throw err
  }
  return payload
}
