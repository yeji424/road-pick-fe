import { useTourDetail } from '@/hooks/useTourDetail'
import React from 'react'
import { useParams } from 'react-router-dom'
import css from './DetailPage.module.css'
import { useLocationTourList } from '@/hooks/useLocationTourList'
import RelativeOptionCard from '@/components/common/RelativeOptionCard/RelativeOptionCard'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

const DetailPage = () => {
  const { contentid, contenttypeid } = useParams()
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

  console.log(commonData, festivals)
  return (
    <main className={css.container}>
      {loading && <p>loading...</p>}
      {error && <p>error..</p>}
      <div className={css.head}>
        <button>&lt;</button>
        <h3>상세 정보</h3>
        <button>일정 추가</button>
      </div>
      <div className={css.imgWrap}>
        <img src={commonData[0].firstimage} alt={commonData[0].title} />
      </div>
      <div className={css.titleWrap}>
        <h3>{commonData[0].title}</h3>
        <i className="bi bi-star-fill"></i>
      </div>
      <p className={css.addr}>{commonData[0].addr1}</p>
      {contenttypeid !== '15' ? (
        <div className={css.content}>
          <h3>{commonData[0].title} 관련 정보</h3>
          <p>{commonData[0].overview}</p>
          <h3>map</h3>
          <div>
            <p>주소 {commonData[0].addr1}</p>
            <p>전화 {introData[0].infocenter}</p>
            <div>
              <span>홈페이지 </span>
              <span dangerouslySetInnerHTML={{ __html: commonData[0].homepage }} />
            </div>
          </div>
          <div>
            <p>개장일</p>
            <p>
              {introData[0].usetime
                ? introData[0].usetime.replace(/<br\s*\/?>/gi, '\n')
                : '상시개방'}
            </p>
          </div>
          <div>
            <p>휴무일</p>
            <p>
              {introData[0].restdate
                ? introData[0].restdate.replace(/<br\s*\/?>/gi, '\n')
                : '연중무휴'}
            </p>
          </div>
          <div>
            <p>주차 안내</p>
            <p>
              {introData[0].parking ? introData[0].parking.replace(/<br\s*\/?>/gi, '\n') : '없음'}
            </p>
          </div>
          <div>
            <p>체험 안내</p>
            <p>
              {introData[0].expquide ? introData[0].expquide.replace(/<br\s*\/?>/gi, '\n') : '없음'}
            </p>
          </div>
          <div>
            <p>유모차 이용 가능 여부</p>
            <p>{introData[0].chkbabycarriage}</p>
          </div>
          <div>
            <p>반려동물 동반 가능 여부</p>
            <p>{introData[0].chkpet ? introData[0].chkpet : '불가'}</p>
          </div>
          <div>
            <p>관련 축제 정보</p>
            <div className={css.slider}>
              <Swiper
                slidesPerView={3}
                spaceBetween={110}
                pagination={{
                  clickable: true,
                }}
                className="mySwiper"
              >
                {festivals.map(festival => (
                  <SwiperSlide key={festival.contentid}>
                    <RelativeOptionCard festival={festival} currentTitle={commonData[0].title} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      ) : (
        <div>축제정보</div>
      )}
    </main>
  )
}

export default DetailPage
