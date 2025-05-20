import { Swiper, SwiperSlide } from 'swiper/react'
import RelativeOptionCard from '@/components/common/RelativeOptionCard/RelativeOptionCard'
import 'swiper/css'
import 'swiper/css/pagination'
import css from './FestivalSlider.module.css'
const FestivalSlider = ({ festivals, commonTitle }) => {
  return festivals ? (
    <div className={css.festival}>
      <h3>관련 축제 정보</h3>
      <hr className={css.divider} />
      {!festivals || festivals.length === 0 ? (
        <div className={css.none}>관련 축제 정보가 없습니다.</div>
      ) : (
        <div>
          <Swiper
            slidesPerView={3}
            spaceBetween={50}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              600: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
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
      )}
    </div>
  ) : (
    <div>관련 축제 정보가 없습니다.</div>
  )
}
export default FestivalSlider
