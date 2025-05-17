import { Swiper, SwiperSlide } from 'swiper/react'
import RelativeOptionCard from '@/components/common/RelativeOptionCard/RelativeOptionCard'
import 'swiper/css'
import 'swiper/css/pagination'
import css from './FestivalSlider.module.css'
const FestivalSlider = ({ festivals, commonTitle }) => {
  return (
    <div className={css.festival}>
      <h3>관련 축제 정보</h3>
      <hr className={css.divider} />
      <div>
        <Swiper
          slidesPerView={3}
          spaceBetween={50}
          pagination={{
            clickable: true,
          }}
          className={css.mySwiper}
        >
          {festivals.map(festival => (
            <SwiperSlide key={festival.contentid}>
              <RelativeOptionCard festival={festival} currentTitle={commonTitle} />
            </SwiperSlide>
          ))}
          <div style={{ height: 10 }}></div>
        </Swiper>
      </div>
    </div>
  )
}

export default FestivalSlider
