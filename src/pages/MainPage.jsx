import React, { useState } from 'react'
import css from './MainPage.module.css'
import Spinner from '@/components/loading/Spinner'
import SearchCard from '@/components/common/Search/SearchCard'
import HeartToggle from '@/components/common/ListCard/HeartToggle'
import { useNavigate } from 'react-router-dom'
import { usePopularTourList } from '@/hooks/usePopularTourList'
import { useRecommendTourList } from '@/hooks/useRecommendTourList'

const MainPage = () => {
  const [selectedCity, setSelectedCity] = useState('전국')
  const navigate = useNavigate()

  const cities = [
    '전국',
    '서울',
    '인천',
    '대전',
    '대구',
    '광주',
    '부산',
    '울산',
    '경기',
    '강원',
    '충북',
    '충남',
    '경북',
    '경남',
    '전북',
    '전남',
    '제주',
    '세종',
  ]

  const {
    populars,
    loading: popLoading,
    error: popError,
  } = usePopularTourList({ areaCode: 1, sigunguCode: 2 })
  const {
    recommendations,
    loading: recLoading,
    error: recError,
  } = useRecommendTourList({ areaCode: 1, sigunguCode: 2 })

  if (recLoading || popLoading) return <Spinner />
  if (recError || popError) return <div>오류 발생: {recError?.message || popError?.message}</div>

  const handleCityChange = city => {
    setSelectedCity(city)
  }

  return (
    <main className={css.wrapper}>
      <h2 className={css.title}>
        여행하고 싶은
        <br />
        지역을 선택해보세요
      </h2>
      <p className={css.description}>
        지역명이나 관광지명을 입력해 관련된 축제 및 행사
        <br />
        정보를 확인하세요
      </p>
      <SearchCard />
      <div className={css.cityWrapper}>
        {cities.map(city => (
          <button
            key={city}
            className={`${css.cityButton} ${selectedCity === city ? css.selected : ''}`}
            onClick={() => handleCityChange(city)}
          >
            {city}
          </button>
        ))}
      </div>
      <div className={css.selectedInfoWrapper}>
        <p className={css.selectedInfoText}>{selectedCity} 유명 관광지</p>
        <button className={css.viewAllButton} onClick={() => navigate('/list')}>
          모두 보기
        </button>
      </div>
      <div className={css.popularWrapper}>
        {populars.length > 0 ? (
          populars.map((item, idx) => (
            <div key={idx} className={css.popularItem}>
              <img
                src={item.firstimage || 'https://via.placeholder.com/225x152'}
                alt={item.title}
                className={css.popularImage}
              />
              <div className={css.popularContent}>
                <div className={css.popularTextWrapper}>
                  <p className={css.popularTitle}>{item.title}</p>
                  <p className={css.popularAddress}>{item.addr1}</p>
                </div>
                <HeartToggle />
              </div>
            </div>
          ))
        ) : (
          <div>유명 관광지가 없습니다.</div>
        )}
      </div>
      <p className={css.recommendTitleText}>OO님께 추천해요!</p>
      <div className={css.recommendWrapper}>
        {recommendations.length > 0 ? (
          recommendations.map((item, idx) => (
            <div key={idx} className={css.recommendItem}>
              <div className={css.recommendContent}>
                <img
                  src={item.firstimage || 'https://via.placeholder.com/225x152'}
                  alt={item.title}
                  className={css.recommendImage}
                />
                <div className={css.recommendTextWrapper}>
                  <p className={css.recommendTitle}>{item.title}</p>
                  <p className={css.recommendAddress}>{item.addr1}</p>
                </div>
              </div>
              <HeartToggle />
            </div>
          ))
        ) : (
          <div>추천 관광지가 없습니다.</div>
        )}
      </div>
      <div className={css.eventBannerSection}>
        <p className={css.eventBannerTitle}>여름 오기 전, 깜짝 이벤트!</p>
        <div className={css.eventBannerBox}>이벤트 배너</div>
      </div>
    </main>
  )
}

export default MainPage
