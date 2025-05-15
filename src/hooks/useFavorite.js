import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getFavorites, addFavorite, removeFavorite } from '@/apis/favoriteApi'

/**
 * contentid에 대한 찜 상태(isFavorited)와
 * 클릭 시 토글(toggle) 함수를 제공합니다.
 *
 * @param {number|string} contentid
 */
export function useFavorite(contentid) {
  const qc = useQueryClient()

  // 1) 찜 목록 조회
  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    staleTime: 1000 * 60 * 5,
  })

  // 2) 이 contentid가 찜 목록에 있는지 확인
  const favItem = favorites.find(f => f.destination.contentid === contentid)
  const isFavorited = Boolean(favItem)
  const favId = favItem?._id

  // 3) 추가/삭제 뮤테이션
  const addMut = useMutation({
    mutationFn: () => addFavorite(contentid),
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
      addMut.mutate() // 함수 호출 방식은 동일
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
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  })

  return {
    favorites: data || [],
    isLoading,
    isError,
    error,
  }
}
