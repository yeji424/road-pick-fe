import css from './FestivalSlider.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import RelativeOptionCard from '@/components/common/RelativeOptionCard/RelativeOptionCard'
import 'swiper/css'
import 'swiper/css/pagination'

const FestivalSlider = ({ festivals, commonTitle }) => {
  return festivals ? (
    <div className={css.festival}>
      <h3>관련 축제 정보</h3>
      <div>
        <Swiper
          slidesPerView={3}
          spaceBetween={50}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {festivals.map(festival => (
            <SwiperSlide key={festival.contentid}>
              <RelativeOptionCard festival={festival} currentTitle={commonTitle} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  ) : (
    <div>관련 축제 정보가 없습니다.</div>
  )
}
export default FestivalSlider
