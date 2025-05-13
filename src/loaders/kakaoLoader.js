export const loadKakaoMapScript = () => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve()
      return
    }

    const API_KEY = import.meta.env.VITE_KAKAOMAP_KEY

    // <script> 태그를 생성
    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&autoload=false&libraries=services,clusterer`
    // 비동기로 로드
    script.async = true

    script.onload = () => {
      if (window.kakao) {
        window.kakao.maps.load(() => {
          resolve()
        })
      } else {
        reject(new Error('Kakao SDK 로드 실패'))
      }
    }

    script.onerror = () => reject(new Error('Kakao 스크립트 로드 실패'))

    // 생성한 <script> 태그를 <head>에 추가해서 로딩을 시작
    document.head.appendChild(script)
  })
}
