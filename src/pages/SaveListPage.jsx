import Header from '@/components/common/Header/Header'
import { useFavoritesList } from '@/hooks/useFavorite'
import css from './SaveListPage.module.css'
import Spinner from '@/components/loading/Spinner'
import ListCard from '@/components/common/ListCard/ListCard'
import { useLocation, useNavigate } from 'react-router-dom'
import { formatDateToLocalString } from '@/components/common/Calendar/CalendarLogic'
import { createScheduleDetail } from '@/apis/schedulsDetailApi'
// import { useState } from 'react'
import { useModal } from '@/hooks/useModal'

const SaveListPage = () => {
  const { favorites, isLoading, isError } = useFavoritesList() // 찜 목록 훅 호출
  const navigate = useNavigate()
  const location = useLocation()
  const date = location.state?.date
  const tripId = location.state?.tripId
  const day = location.state?.day
  const title = location.state?.title
  const { openModal, closeModal } = useModal()

  if (isLoading) return <Spinner />
  if (isError) return <div className={css.error}>찜 목록을 불러오는 중 오류가 발생했습니다.</div>
  const handleOpenModal = dest => {
    openModal('plan', {
      dest,
      title,
      image: true,
      description: `${title} 페이지로 이동합니다.`,
      CreateShedule,
    })
  }
  const CreateShedule = async (e, fav, checked) => {
    e.stopPropagation()
    if (!fav) return

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

    const newDetail = {
      trip: tripId,
      destination: dest,
      visitDate: formatDateToLocalString(date),
      visitOrder: day,
    }

    try {
      await createScheduleDetail(newDetail)
      if (checked) {
        navigate(-1)
      }
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <main>
      <Header title="저장 목록" />
      {favorites.length === 0 ? (
        <p className={css.empty}>아직 찜한 항목이 없습니다.</p>
      ) : (
        <ul className={css.list}>
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
              <li key={fav._id} className={css.item} onClick={() => handleOpenModal(dest)}>
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
                  isFavorite="true"
                />
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}

export default SaveListPage
