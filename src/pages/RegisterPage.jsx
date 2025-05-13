import React, { useState } from 'react'
import css from './RegisterPage.module.css'

const RegisterPage = () => {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))

    // 입력 시 에러 초기화
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    let valid = true
    const newErrors = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    }

    if (!form.email.includes('@')) {
      newErrors.email = '올바른 이메일 형식을 입력하세요.'
      valid = false
    }

    if (form.username.length < 2) {
      newErrors.username = '닉네임은 2자 이상이어야 합니다.'
      valid = false
    }

    if (form.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다.'
      valid = false
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.'
      valid = false
    }

    setErrors(newErrors)
    if (!valid) return

    alert('회원가입 완료!')
  }

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>회원가입</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        {/* 이메일 */}
        <div className={css.inputWrap}>
          <div className={css.inputGroup}>
            <label htmlFor="email">이메일</label>
            <input
              type="mail"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          {errors.email && <p className={css.error}>{errors.email}</p>}
        </div>
        {/* 닉네임 */}
        <div className={css.inputGroup}>
          <label htmlFor="username">닉네임</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className={css.error}>{errors.username}</p>}
        </div>

        {/* 비밀번호 */}
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
          {errors.password && <p className={css.error}>{errors.password}</p>}
        </div>

        {/* 비밀번호 확인 */}
        <div className={css.inputGroup}>
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className={css.error}>{errors.confirmPassword}</p>}
        </div>

        <button className={css.submit} type="submit" disabled={Object.values(form).some(v => !v)}>
          회원가입
        </button>
      </form>

      <p className={css.alt}>3초만에 로그인하기</p>
      <div className={css.snsButtons}>
        <button className={css.snsBtn}>🔵 Google</button>
        <button className={css.snsBtn}>🟡 Kakao</button>
      </div>
    </div>
  )
}

export default RegisterPage
