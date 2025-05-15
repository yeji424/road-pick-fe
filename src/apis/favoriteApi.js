import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

/**
 * 찜 추가: contentid만 넘김
 * @param {number|string} contentid
 */
export async function addFavorite(contentid) {
  const res = await axios.post(
    `${API_URL}/favorites`,
    { contentid }, // 🚀 body에 destination 대신 contentid만
    { withCredentials: true }
  )
  return res.data.favorite
}

/**
 * 찜 삭제
 * @param {string} favoriteId
 */
export async function removeFavorite(favoriteId) {
  const res = await axios.delete(`${API_URL}/favorites/${favoriteId}`, { withCredentials: true })
  return res.data
}

/**
 * 찜 목록 조회
 */
export async function getFavorites() {
  const res = await axios.get(`${API_URL}/favorites`, { withCredentials: true })
  return res.data.favorites
}
