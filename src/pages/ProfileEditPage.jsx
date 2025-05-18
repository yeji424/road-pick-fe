import Header from '@/components/common/Header/Header'
import React, { useState } from 'react'
import css from './ProfileEditPage.module.css'
import profileImage from '@/assets/imgs/ProfileBasicImg.png'
import { useSelector } from 'react-redux'
import { updateProfile } from '@/apis/userApi'
import { useDispatch } from 'react-redux'
import { fetchProfile } from '@/store/authSlice'
import { useNavigate } from 'react-router-dom'
import AlertModal from '@/components/common/Modal/AlertModal'

const ProfileEditPage = () => {
  const user = useSelector(state => state.auth.user)
  const originalName = user?.name || ''
  const [name, setName] = useState(originalName)
  const [alertMessage, setAlertMessage] = useState()
  const isNameChanged = name.trim() && name.trim() !== originalName.trim()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async () => {
    if (!name.trim()) {
      alert('닉네임을 입력해주세요.')
      return
    }

    try {
      await updateProfile({ name })
      await dispatch(fetchProfile())

      navigate('/mypage', {
        state: {
          alertMessage: '프로필이 수정되었습니다.',
        },
      })
    } catch (err) {
      alert(err.message || '프로필 수정 실패')
    }
  }

  return (
    <main>
      <Header />
      {alertMessage && <AlertModal message={alertMessage} onClose={() => setAlertMessage('')} />}
      <section className={css.profileSection}>
        <div className={css.profileImageWrap}>
          <img src={profileImage} alt="프로필 이미지" className={css.profileImage} />
          {/* <span className={css.editIcon}>편집</span> */}
        </div>

        <div className={css.nameWrap}>
          <input
            type="text"
            className={`${css.nameInput} ${isNameChanged ? css.activeInput : ''}`}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="닉네임을 입력해주세요."
          />
        </div>

        <button
          className={`${css.submitButton} ${isNameChanged ? css.activeButton : ''}`}
          onClick={handleSubmit}
          disabled={!isNameChanged}
        >
          수정 완료
        </button>
        <p className={css.infoText}>한글/영어/숫자/밑줄/하이픈만 사용할 수 있습니다.</p>
      </section>
    </main>
  )
}

export default ProfileEditPage
