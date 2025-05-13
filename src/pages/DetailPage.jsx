import { useTourDetail } from '@/hooks/useTourDetail'
import React from 'react'
import { useParams } from 'react-router-dom'
import css from './DetailPage.module.css'
import { useLocationTourList } from '@/hooks/useLocationTourList'
import DetailHeader from '@/components/detail/Header/DetailHeader'
import DetailImage from '@/components/detail/DetailImage/DetailImage'
import DetailTitle from '@/components/detail/DetailTitle/DetailTitle'
import DetailContent from '@/components/detail/DetailContent/DetailContent'

const DetailPage = () => {
  const { contentid, contenttypeid } = useParams() // 파라미터 정보 받아옴
  const { commonData, introData, loading, error } = useTourDetail(contentid, contenttypeid)
  const festivals = useLocationTourList(
    commonData && commonData.length > 0
      ? {
          mapX: commonData[0].mapx,
          mapY: commonData[0].mapy,
          radius: 5000,
          contentTypeId: 15,
        }
      : null
  )

  if (!commonData || !introData || !contentid || !contenttypeid) return <div>loading..</div>

  return (
    <main className={css.container}>
      {loading && <p>loading...</p>}
      {error && <p>error..</p>}
      <DetailHeader />
      <DetailImage common={commonData[0]} />
      <DetailTitle common={commonData[0]} />
      <p className={css.addr}>{commonData[0].addr1}</p>
      <DetailContent
        common={commonData[0]}
        festivals={festivals}
        contenttypeid={contenttypeid}
        intro={introData[0]}
      />
    </main>
  )
}

export default DetailPage
