import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

/**
 * 찜 추가: destination 객체 전체를 넘김
 * @param {{
 *   contentid: number|string,
 *   contenttypeid?: number,
 *   firstimage?: string,
 *   title?: string,
 *   addr1?: string,
 *   addr2?: string,
 *   mapx?: number,
 *   mapy?: number
 * }} data
 */
export async function addFavorite(data) {
  const res = await axios.post(
    `${API_URL}/favorites`,
    data, // 🚀 전체 destination 정보
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
