// 가격 단위 함수
export const formatCurrency = number => {
  return number.toLocaleString() + '원'
}

// Intl.DateTimeFormat을 사용한 날짜 함수
export const formatDate = date => {
  const d = new Date(date)
  const year = d.getFullYear()
  // getMonth()는 0부터 시작하므로 1을 더하고, 10보다 작으면 앞에 0 추가
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')

  return `${year}. ${month}. ${day}`
}
// debounce : 연속된 호출을 지연시켜 한번만 실행. 함수(함수, 대시시간)
export const debounce = (func, delay = 300) => {
  let timerId
  return function (...args) {
    if (timerId) clearTimeout(timerId)
    timerId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// throttle : 일정 시간 동안 한 번만 실행. 함수(함수, 대시시간)
export const throttle = (func, limit = 300) => {
  let inThrottle
  return function (...args) {
    // 일반 함수로 변경
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// 비밀번호 유효성 검사 함수
export const validatePassword = password => {
  // 영문자 최소 1개 + 특수문자 최소 1개 포함, 8자 이상
  const pwdRegex = /^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9]).{8,}$/
  return pwdRegex.test(password)
}

// 이메일 유효성 검사 함수
export const validateEmail = email => {
  // 공백 없는 문자열@문자열.문자열 형식
  const emailRegex = /^\S+@\S+\.\S+$/
  return emailRegex.test(email)
}