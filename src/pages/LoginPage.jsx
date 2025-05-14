// src/pages/LoginPage.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import css from './LoginPage.module.css'
import { login as loginThunk } from '@/store/authSlice' // ← authSlice의 Thunk import

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch() // dispatch 준비

  // 1) 상태 관리
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [loginMsg, setLoginMsg] = useState('')

  // 2) 유효성 검사
  const validate = (name, value) => {
    switch (name) {
      case 'email':
        if (!value.includes('@')) return '올바른 이메일 형식을 입력하세요.'
        return ''
      case 'password':
        if (!value) return '비밀번호를 입력하세요.'
        if (value.length < 6) return '비밀번호는 6자 이상이어야 합니다.'
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
      // ── login Thunk dispatch: 토큰 발급 + 프로필 조회 → state.auth.user에 저장
      await dispatch(loginThunk({ email: form.email, password: form.password })).unwrap()
      navigate('/') // 로그인+프로필 완료 후 홈으로 이동
    } catch (err) {
      setLoginMsg(err.message)
    }
  }

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>로그인</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        {/* 이메일 입력 */}
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

        {/* 비밀번호 입력 */}
        <div className={css.inputWrap}>
          <div className={css.inputGroup}>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          {errors.password && <p className={css.error}>{errors.password}</p>}
        </div>

        {/* 비밀번호 찾기 */}
        <p className={css.forgot}>비밀번호를 잊어버리셨나요?</p>

        {/* 로그인 버튼 */}
        <button className={css.submit} type="submit" disabled={!isFormValid()}>
          로그인
        </button>
        {loginMsg && <p className={css.error}>{loginMsg}</p>}
      </form>

      {/* SNS 로그인 */}
      <p className={css.alt}>3초만에 로그인하기</p>
      <div className={css.snsButtons}>
        <button className={css.snsBtn}>🔴</button>
        <button className={css.snsBtn}>🟡</button>
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
