import { useTourDetail } from '@/hooks/useTourDetail'
import React from 'react'
import { useParams } from 'react-router-dom'
import css from './DetailPage.module.css'
import { useLocationTourList } from '@/hooks/useLocationTourList'
import DetailImage from '@/components/detail/DetailImage'
import DetailTitle from '@/components/detail/DetailTitle'
import DetailContent from '@/components/detail/DetailContent'
import Spinner from '@/components/loading/Spinner'
import Header from '@/components/common/Header/Header'

const DetailPage = () => {
  const { contentid, contenttypeid } = useParams() // 파라미터 정보 받아옴
  const { commonData, introData, loading, error } = useTourDetail(contentid, contenttypeid)
  const common = commonData?.[0]
  const mapx = common?.mapx
  const mapy = common?.mapy
  const { data: festivals, isLoading, isError } = useLocationTourList(mapx, mapy, 5000, 15)

  if (isLoading || loading) return <Spinner />
  if (isError || error) return <p>에러 발생</p>

  return (
    <main className={css.container}>
      <Header title="상세 정보" />
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
