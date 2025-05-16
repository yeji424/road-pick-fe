import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getFavorites, addFavorite, removeFavorite } from '@/apis/favoriteApi'

/**
 * @param {{
 *   contentid: number|string,
 *   contenttypeid?: number,
 *   firstimage?: string,
 *   title?: string,
 *   addr1?: string,
 *   addr2?: string,
 *   mapx?: number,
 *   mapy?: number
 * }} item
 */
export function useFavorite(item) {
  const qc = useQueryClient()

  // 1) 찜 목록 조회
  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    staleTime: 1000 * 60 * 5,
  })

  // 2) 이 contentid가 찜 목록에 있는지 확인
  const favItem = favorites.find(
    f =>
      // destination이 있으면 그 contentid, 없으면 최상위 contentid로 비교
      (f.destination?.contentid ?? f.contentid) == item.contentid
  )
  const isFavorited = Boolean(favItem)
  const favId = favItem?._id

  // 3) 추가/삭제 뮤테이션
  const addMut = useMutation({
    mutationFn: () => addFavorite(item),
    onSuccess: () => qc.invalidateQueries(['favorites']),
  })
  const removeMut = useMutation({
    mutationFn: () => removeFavorite(favId),
    onSuccess: () => qc.invalidateQueries(['favorites']),
  })

  // 4) 토글 핸들러
  const toggle = e => {
    e.stopPropagation()
    if (!isFavorited) {
      addMut.mutate()
    } else {
      removeMut.mutate()
    }
  }

  return { isFavorited, toggle }
}

export function useFavoritesList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    staleTime: 1000 * 60 * 5,
  })

  return {
    favorites: data || [],
    isLoading,
    isError,
    error,
  }
}
