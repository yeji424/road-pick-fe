import React, { useRef } from 'react'
import { useDrag } from '@use-gesture/react'
import css from './BottomSheet.module.css'

const BottomSheet = ({ children, snapPoints, y, api }) => {
  const sheetRef = useRef(null)
  const bodyRef = useRef(null) // 스크롤 영역 참조

  // useDrag : 드래그 이벤트 처리
  const bind = useDrag(
    ({ last, movement: [, my], memo = y.get(), cancel }) => {
      const isAtTop = bodyRef.current?.scrollTop === 0 // 스크롤 최상단인지 확인

      if (!isAtTop && !last) {
        cancel?.() // 스크롤 중이면 드래그 취소
        return
      }
      let nextY = memo + my // 현재 위치 + 움직인 값

      // 바텀시트가 너무 위아래로 못 가게 제한
      if (nextY < snapPoints.full) nextY = snapPoints.full
      if (nextY > snapPoints.min) nextY = snapPoints.min

      if (last) {
        // 드래그 놓았을 때 스냅 위치로 자동 이동
        const threshold = 100
        if (nextY < snapPoints.mid - threshold) {
          api.start({ y: snapPoints.full }) // 많이 올렸으면 full
        } else if (nextY < snapPoints.min - threshold) {
          api.start({ y: snapPoints.mid }) // 중간이면 mid
        } else {
          api.start({ y: snapPoints.min }) // 내려가면 min으
        }
      } else {
        // 드래그 중에는 실시간 이동
        api.start({ y: nextY })
      }

      return memo
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: snapPoints.full, bottom: snapPoints.min },
      rubberband: true, // 끝까지 드래그하면 탄성으로 full로 돌아감
    }
  )
  // 외부 클릭 핸들링 (min 상태)
  const handleBackdropClick = () => {
    api.start({ y: snapPoints.min })
  }
  return (
    <main>
      {/* 어두운 배경 (바텀시트 높이에 따라 조절) */}
      <animated.div
        className={css.backdrop}
        onClick={handleBackdropClick}
        style={{
          opacity: y.to([snapPoints.min, snapPoints.full], [0, 1]),
          pointerEvents: y.to(val => (val < snapPoints.min - 10 ? 'auto' : 'none')),
        }}
      />
      <animated.div
        ref={sheetRef}
        {...bind()}
        className={css.sheet}
        style={{
          // height: screenHeight,
          transform: y.to(py => `translateY(${py}px)`),
        }}
      >
        <div className={css.handleContainer}>
          <div className={css.handleBar} />
        </div>
        <div className={css.sheetBody} ref={bodyRef}>
          {children}
        </div>
      </animated.div>
    </main>
  )
}

export default BottomSheet
