import React, { useEffect, useState } from 'react'
import css from './MapModal.module.css'
import ListCard from '../ListCard/ListCard'

const MapModal = ({ detail, isClosing, onCloseComplete }) => {
  const [closing, setClosing] = useState(false)

  // 상위에서 isClosing이 true로 바뀌면 closing 상태로 전환
  useEffect(() => {
    if (isClosing) setClosing(true)
  }, [isClosing])

  // 모달 열 때마다 closing 해제
  useEffect(() => {
    if (detail && !isClosing) setClosing(false)
  }, [detail, isClosing])

  // 애니메이션 끝나면 onCloseComplete 콜
  const handleAnimEnd = () => {
    if (closing) {
      onCloseComplete()
    }
  }
  return (
    <div className={`${css.modal} ${closing ? css.slideOut : ''}`} onAnimationEnd={handleAnimEnd}>
      <ListCard
        firstimage={detail.firstimage}
        title={detail.title}
        location={detail.addr1}
        withPet={detail.withPet ?? false}
        rating={detail.readcount ?? 0}
        reviewCnt={detail.readcount ?? 0}
        contentid={detail.contentid}
        contenttypeid={detail.contenttypeid}
      />
    </div>
  )
}

export default MapModal

//   이전 모달 내용
//   return (
//     <div className={css.modal}>
//       <ListCard item={detail} />
//       <div className={css.card}>
//         <img src={detail.firstimage || '/no-image.png'} alt={detail.title} className={css.image} />
//         <div className={css.info}>
//           <div className={css.topRow}>
//             <span className={css.rating}>
//               ★ 4.8 <span className={css.count}>(24)</span>
//             </span>
//             <button className={css.bookmark}>책갈피</button>
//           </div>
//           <h3 className={css.title}>{detail.title}</h3>
//           <p className={css.addr}>{detail.addr1}</p>
//         </div>
//       </div>
//     </div>
//   )
// }
