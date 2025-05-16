import { useQueries } from '@tanstack/react-query'
import { getTourDetailCommon } from '@/apis/getTourDetailCommon'

export const useTourDetailCommons = (items = []) => {
  const results = useQueries({
    queries: items.map(({ contentId, contentTypeId }) => ({
      queryKey: ['tourDetailCommon', contentId, contentTypeId],
      queryFn: () => getTourDetailCommon(contentId, contentTypeId),
      enabled: !!contentId && !!contentTypeId,
    })),
  })

  const isLoading = results.some(result => result.isLoading)
  const isError = results.some(result => result.isError)
  const error = results.find(result => result.error)?.error || null
  const data = results.map(result => result.data)

  return {
    data,
    isLoading,
    isError,
    error,
  }
}
