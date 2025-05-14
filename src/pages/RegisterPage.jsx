import React, { useState } from 'react'
import css from './RegisterPage.module.css'
import { register } from '@/apis/authApi'

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

  const [registerMsg, setRegisterMsg] = useState('')

  const validate = (name, value) => {
    switch (name) {
      case 'email':
        if (!value.includes('@')) return '올바른 이메일 형식을 입력하세요.'
        return ''
      case 'username':
        if (value.length < 2) return '닉네임은 2자 이상이어야 합니다.'
        return ''
      case 'password':
        if (value.length < 6) return '비밀번호는 6자 이상이어야 합니다.'
        return ''
      case 'confirmPassword':
        if (value !== form.password) return '비밀번호가 일치하지 않습니다.'
        return ''
      default:
        return ''
    }
  }

  const handleChange = e => {
    const { name, value } = e.target

    // 값 갱신
    setForm(prev => ({ ...prev, [name]: value }))

    // 유효성 검사
    const newError = validate(name, value)

    // confirmPassword는 password와 비교하므로 password 변경 시도 함께 확인
    let confirmError = ''
    if (name === 'password' && form.confirmPassword) {
      confirmError = validate('confirmPassword', form.confirmPassword)
    }

    setErrors(prev => ({
      ...prev,
      [name]: newError,
      ...(name === 'password' && form.confirmPassword ? { confirmPassword: confirmError } : {}),
    }))
  }

  const isFormValid = () => {
    return Object.values(errors).every(e => e === '') && Object.values(form).every(f => f !== '')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isFormValid()) return

    try {
      const payload = {
        userId: form.username,
        name: form.username,
        email: form.email,
        password: form.password,
      }
      const data = await register(payload)
      setRegisterMsg(data.message)
      // navigate('/login')
    } catch (err) {
      if (err.status === 400 && err.validation) {
        const apiErrors = {}
        err.validation.forEach(v => {
          apiErrors[v.param] = v.msg
        })
        setErrors(prev => ({ ...prev, ...apiErrors }))
      } else {
        setRegisterMsg(err.message)
      }
    }
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

        {/* 닉네임 */}
        <div className={css.inputWrap}>
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
          </div>
          {errors.username && <p className={css.error}>{errors.username}</p>}
        </div>

        {/* 비밀번호 */}
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

        {/* 비밀번호 확인 */}
        <div className={css.inputWrap}>
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
          </div>
          {errors.confirmPassword && <p className={css.error}>{errors.confirmPassword}</p>}
        </div>

        <button className={css.submit} type="submit" disabled={!isFormValid()}>
          회원가입
        </button>
        {registerMsg && <p>{registerMsg}</p>}
      </form>

      <p className={css.alt}>3초만에 로그인하기</p>
      <div className={css.snsButtons}>
        <button className={css.snsBtn}>🔵 </button>
        <button className={css.snsBtn}>🟡 </button>
      </div>
    </div>
  )
}

export default RegisterPage
