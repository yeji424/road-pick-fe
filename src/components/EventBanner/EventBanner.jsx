import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import css from './EventBanner.module.css'
const EventBanner = () => {
  return (
    <div className={css.eventBannerSection}>
      <p className={css.eventBannerTitle}>여름 오기 전, 깜짝 이벤트!</p>
      <Swiper
        modules={[Autoplay]} // 자동재생
        autoplay={{
          delay: 3000, // 3초마다 넘어감
          disableOnInteraction: false, // 유저가 넘겨도 자동 재시작 끄기
        }}
        loop={true} // 무한루프
        speed={600}
        slidesPerView={1}
      >
        <SwiperSlide>
          <img src="/src/BannerImg1.png" alt="배너1" className={css.bannerImage} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/src/BannerImg2.png" alt="배너2" className={css.bannerImage} />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default EventBanner
