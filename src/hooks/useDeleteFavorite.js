import { removeFavorite } from '@/apis/favoriteApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteFavorite() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites'])
    },
  })
}
