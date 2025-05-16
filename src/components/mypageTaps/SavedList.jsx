import React from 'react'
import { useFavoritesList } from '@/hooks/useFavorite'
import Spinner from '@/components/loading/Spinner'
import ListCard from '@/components/common/ListCard/ListCard'
import css from './mypageTaps.module.css'

const SavedList = () => {
  const { favorites, isLoading, isError } = useFavoritesList() // 찜 목록 훅 호출

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <div className={css.error}>찜 목록을 불러오는 중 오류가 발생했습니다.</div>
  }

  return (
    <div className={css.container}>
      {favorites.length === 0 ? (
        <p className={css.empty}>아직 찜한 항목이 없습니다.</p>
      ) : (
        <ul className={css.savelist}>
          {favorites.map(fav => {
            // destination이 없을 경우에도 안전하게 처리하기 위해 fallback 객체 생성
            const dest = fav.destination ?? {
              contentid: fav.contentid,
              contenttypeid: fav.contenttypeid,
              firstimage: fav.firstimage,
              title: fav.title,
              addr1: fav.addr1,
              addr2: fav.addr2,
              mapx: fav.mapx,
              mapy: fav.mapy,
            }

            return (
              <li key={fav._id} className={css.item}>
                {/* ListCard에 destination 정보 전체를 props로 전달 */}
                <ListCard
                  contentid={dest.contentid}
                  contenttypeid={dest.contenttypeid}
                  firstimage={dest.firstimage}
                  title={dest.title}
                  addr1={dest.addr1}
                  addr2={dest.addr2}
                  mapx={dest.mapx}
                  mapy={dest.mapy}
                />
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default SavedList
