import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import css from './LoginPage.module.css'
import { validatePassword, validateEmail } from '@/utils/features'
import { login as loginThunk } from '@/store/authSlice'
import GoogleIcon from '@/assets/icons/googleIcon.svg?react'
import KakaoIcon from '@/assets/icons/kakaoIcon.svg?react'
import EyeOpenIcon from '@/assets/icons/eye-open.svg?react'
import EyeCloseIcon from '@/assets/icons/eye-close.svg?react'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 비밀번호 표시 토글 state
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => setShowPassword(prev => !prev)

  // 1) 상태 관리
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [loginMsg, setLoginMsg] = useState('')

  // 2) 유효성 검사
  const validate = (name, value) => {
    switch (name) {
      case 'email':
        if (!validateEmail(value)) return '올바른 이메일 형식을 입력하세요.'
        return ''

      case 'password':
        if (!value) return '비밀번호를 입력하세요.'
        if (!validatePassword(value)) {
          return '비밀번호는 영문자와 특수문자를 포함한 8자 이상이어야 합니다.'
        }
        return ''

      default:
        return ''
    }
  }

  // 3) 입력 변화 처리
  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }))
  }

  // 4) 폼 유효성 체크
  const isFormValid = () =>
    Object.values(errors).every(e => e === '') && Object.values(form).every(v => v !== '')

  // 5) 제출 처리
  const handleSubmit = async e => {
    e.preventDefault()
    if (!isFormValid()) return

    try {
      await dispatch(loginThunk({ email: form.email, password: form.password })).unwrap()
      navigate('/')
    } catch {
      setLoginMsg('아이디 또는 비밀번호가 틀렸습니다.')
    }
  }

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>로그인</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        {/* 이메일 */}
        <div className={css.inputWrap}>
          <div className={css.inputGroup}>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          {errors.email && <p className={css.error}>{errors.email}</p>}
        </div>

        {/* 비밀번호 */}
        <div className={css.inputWrap}>
          <div className={css.inputGroup}>
            <label htmlFor="password">비밀번호</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className={css.toggleBtn}
              onClick={togglePassword}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? <EyeOpenIcon /> : <EyeCloseIcon />}
            </button>
          </div>
          {errors.password && <p className={css.error}>{errors.password}</p>}
        </div>

        {/* 비밀번호 찾기 */}
        <p className={css.forgot}>비밀번호를 잊어버리셨나요?</p>

        {/* 로그인 버튼 */}
        <button
          className={`${css.submit} ${loginMsg ? css.error : ''}`}
          type="submit"
          disabled={!isFormValid()}
        >
          로그인
        </button>
        {loginMsg && <p className={css.error}>{loginMsg}</p>}
      </form>

      {/* SNS 로그인 */}
      <p className={css.alt}>3초만에 로그인하기</p>
      <div className={css.snsButtons}>
        <button className={css.snsBtn}>
          <GoogleIcon />
        </button>
        <button className={css.snsBtn}>
          <KakaoIcon />
        </button>
      </div>

      {/* 회원가입 이동 */}
      <p className={css.alt}>
        회원이 아니신가요?{' '}
        <span className={css.link} onClick={() => navigate('/register')}>
          회원가입
        </span>
      </p>
    </div>
  )
}

export default LoginPage
