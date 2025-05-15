import api from './index'

/**
 * 사용자 이름 수정
 * @param {{ name: string }} data
 */
export async function updateProfile(data) {
  try {
    const res = await api.put('/auth/profile', data)
    return res.data
  } catch (err) {
    const payload = err.response?.data || {}
    const message = payload.message || '프로필 수정 실패'
    const error = new Error(message)
    error.status = err.response?.status
    throw error
  }
}
