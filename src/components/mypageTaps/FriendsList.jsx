import React from 'react'
import css from './mypageTaps.module.css'
import profileImage from '@/assets/imgs/ProfileBasicImg.png'
import MypageListCard from './MypageListCard'

const friends = [
  { name: '김민석', shared: '공유 일정 없음', color: 'red' },
  { name: '김예지', shared: '공유 일정 없음', color: 'blue' },
  { name: '홍석준', shared: '강원도 여행 일정 공유 중\n2025.05.11 - 05.15', color: 'gray' },
]

const FriendsList = () => {
  return (
    <div className={css.listTile}>
      {friends.map((friend, i) => (
        <MypageListCard
          key={i}
          thumbnail={
            <div className={`${css.profile} ${css[friend.color]}`}>
              <img src={profileImage} alt="프로필 이미지" />
            </div>
          }
          info={
            <>
              <h4>{friend.name}</h4>
              <p>{friend.shared}</p>
            </>
          }
          renderMoreMenu={() => (
            <>
              <button onClick={() => console.log(`${friend.name} 차단`)}>친구 삭제</button>
              <button onClick={() => console.log(`${friend.name} 공유 중단`)}>공유 중단</button>
            </>
          )}
        />
      ))}
    </div>
  )
}

export default FriendsList
