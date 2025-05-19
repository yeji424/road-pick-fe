import React, { useState, useMemo } from 'react'
import css from './MainPage.module.css'
import Spinner from '@/components/loading/Spinner'
import SearchCard from '@/components/common/Search/SearchCard'
import HeartToggle from '@/components/common/ListCard/HeartToggle'
import { NavLink, useNavigate } from 'react-router-dom'
import { usePopularTourList } from '@/hooks/usePopularTourList'
import { useRecommendTourList } from '@/hooks/useRecommendTourList'
import { useSelector } from 'react-redux'
import ListCard from '@/components/common/ListCard/ListCard'

const MainPage = () => {
  const [selectedCity, setSelectedCity] = useState('전국')
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)

  const areaCodeMap = useMemo(
    () => ({
      전국: 0,
      서울: 1,
      인천: 2,
      대전: 3,
      대구: 4,
      광주: 5,
      부산: 6,
      울산: 7,
      세종: 8,
      경기: 31,
      강원: 32,
      충북: 33,
      충남: 34,
      경북: 35,
      경남: 36,
      전북: 37,
      전남: 38,
      제주: 39,
    }),
    []
  )

  const cities = Object.keys(areaCodeMap)

  const {
    populars,
    loading: popLoading,
    error: popError,
  } = usePopularTourList({
    areaCode: selectedCity === '전국' ? undefined : areaCodeMap[selectedCity],
    sigunguCode: selectedCity === '전국' ? undefined : 2,
  })

  const {
    recommendations,
    loading: recLoading,
    error: recError,
  } = useRecommendTourList({
    areaCode: selectedCity === '전국' ? undefined : areaCodeMap[selectedCity],
    sigunguCode: selectedCity === '전국' ? undefined : 2,
  })

  if (recLoading || popLoading) return <Spinner />
  if (recError || popError) return <div>오류 발생: {recError?.message || popError?.message}</div>

  const handleCityChange = city => {
    setSelectedCity(city)
  }

  const handleMoveDetail = (contenttypeid, contentid) => {
    navigate(`/detail/${contenttypeid}/${contentid}`)
  }

  return (
    <main className={css.wrapper}>
      <h2 className={`${css.title} fadeInText`}>
        여행하고 싶은
        <br />
        지역을 선택해보세요
      </h2>
      <p className={`${css.description} fadeInText`}>
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
        <h3 className={css.selectedInfoText}>{selectedCity} 유명 관광지</h3>
        <button
          className={css.viewAllButton}
          onClick={() =>
            navigate(
              `/searchPopular?areaCode=${areaCodeMap[selectedCity]}&sigunguCode=2&title=${selectedCity} 유명 관광지`
            )
          }
        >
          모두 보기
        </button>
      </div>
      <div className={css.popularWrapper}>
        {populars.length > 0 ? (
          populars.map((item, idx) => (
            <div
              key={idx}
              className={css.popularItem}
              onClick={() => handleMoveDetail(item.contenttypeid, item.contentid)}
            >
              <div className={css.popularImage}>
                <img src={item.firstimage} alt={item.title} className={css.popularImage} />
              </div>
              <div className={css.popularContent}>
                <div className={css.popularTextWrapper}>
                  <p className={css.popularTitle}>{item.title}</p>
                  <p className={css.popularAddress}>{item.addr1}</p>
                </div>

                <div onClick={e => e.stopPropagation()}>
                  <HeartToggle
                    contentid={item.contentid}
                    contenttypeid={item.contenttypeid}
                    firstimage={item.firstimage}
                    title={item.title}
                    addr1={item.addr1}
                    addr2={item.addr2}
                    mapx={item.mapx}
                    mapy={item.mapy}
                    className={css.saveBtn}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>유명 관광지가 없습니다.</div>
        )}
      </div>
      {user && user.name ? (
        <>
          <h3 className={css.recommendTitle}>{user.name}님께 추천해요!</h3>
          <div className={css.recommendWrapper}>
            {recommendations.length > 0 ? (
              recommendations.map((item, idx) => (
                <ListCard
                  key={idx}
                  firstimage={item.firstimage}
                  title={item.title}
                  addr1={item.addr1}
                  addr2={item.addr2}
                  contentid={item.contentid}
                  contenttypeid={item.contenttypeid}
                  mapx={item.mapx}
                  mapy={item.mapy}
                />
              ))
            ) : (
              <div>추천 관광지가 없습니다.</div>
            )}
          </div>
          <div className={css.eventBannerSection}>
            <p className={css.eventBannerTitle}>여름 오기 전, 깜짝 이벤트!</p>
            <div className={css.eventBannerBox}>이벤트 배너</div>
          </div>
        </>
      ) : (
        <NavLink to="/login" className={css.loginLink}>
          <div className={css.loginPrompt}>
            <h3 className={css.recommendTitle}>
              더 많은 서비스를 이용하고 싶다면
              <br />
              <span>
                <span className={css.loginWord}>로그인</span>을 해주세요!
              </span>
            </h3>
            <div>
              <svg
                className={css.loginIcon}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.8999 7.55999C9.2099 3.95999 11.0599 2.48999 15.1099 2.48999H15.2399C19.7099 2.48999 21.4999 4.27999 21.4999 8.74999V15.27C21.4999 19.74 19.7099 21.53 15.2399 21.53H15.1099C11.0899 21.53 9.2399 20.08 8.9099 16.54"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12H14.88"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={css.arrowLine}
                />
                <path
                  d="M12.6499 8.64999L15.9999 12L12.6499 15.35"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={css.arrowLine}
                />
              </svg>
            </div>
          </div>
        </NavLink>
      )}
    </main>
  )
}

export default MainPage
