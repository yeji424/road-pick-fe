// src/api/authApi.js
const API_URL = import.meta.env.VITE_API_URL

/**
 * @param {{ userId: string, name: string, email: string, password: string }} data
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
