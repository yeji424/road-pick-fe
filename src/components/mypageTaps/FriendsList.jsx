import React from 'react'
import css from './mypageTaps.module.css'
import profileImage from '@/assets/imgs/ProfileBasicImg.png'

const friends = [
  { name: '김민석', shared: '공유 일정 없음', color: 'red' },
  { name: '김예지', shared: '공유 일정 없음', color: 'blue' },
  { name: '홍석준', shared: '강원도 여행 일정 공유 중\n2025.05.11 - 05.15', color: 'gray' },
]

const FriendsList = () => {
  return (
    <div className={css.friendsList}>
      {friends.map((friend, index) => (
        <div className={css.friendCard} key={index}>
          <div className={`${css.profile} ${css[friend.color]}`}>
            <img src={profileImage} alt="프로필 이미지" />
          </div>
          <div className={css.info}>
            <p className={css.name}>{friend.name}</p>
            <p className={css.shared}>{friend.shared}</p>
          </div>
          <div className={css.more}>⋯</div>
        </div>
      ))}
    </div>
  )
}

export default FriendsList
