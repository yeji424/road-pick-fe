import { useQueries } from '@tanstack/react-query'
import { getTourDetailCommon } from '@/apis/getTourDetailCommon'
import { getTourDetailIntro } from '@/apis/getTourDetailIntro'

export const useTourDetail = (contentId, contentTypeId) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ['tourDetailCommon', contentId, contentTypeId],
        queryFn: () => getTourDetailCommon(contentId, contentTypeId),
        enabled: !!contentId && !!contentTypeId, // contentId contentTypeId 필수
      },
      {
        queryKey: ['tourDetailIntro', contentId, contentTypeId],
        queryFn: () => getTourDetailIntro(contentId, contentTypeId),
        enabled: !!contentId && !!contentTypeId, // contentId contentTypeId 필수
      },
    ],
  })

  const [commonQuery, introQuery] = results

  const loading = commonQuery.isLoading || introQuery.isLoading
  const error = commonQuery.error || introQuery.error

  return {
    commonData: commonQuery.data,
    introData: introQuery.data,
    loading,
    error,
  }
}
