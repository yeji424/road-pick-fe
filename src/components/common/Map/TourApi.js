import axios from 'axios'

const SERVICE_KEY =
  '6VPhP1QDfBwrzYJaSQGZkHHGo0Sf0AZ/Xc7P6FxOrO1F0dlhJqrxhhUu2fXAFCXhhQey1VOAeA2xU4HgIrd5GA=='

// ✅ 관광지 전체 조회 (pageNo=1만 우선 조회)
export const getTourData = async () => {
  try {
    const res = await axios.get('https://apis.data.go.kr/B551011/KorService1/areaBasedList1', {
      params: {
        serviceKey: SERVICE_KEY,
        MobileOS: 'ETC',
        MobileApp: 'LoadPick',
        _type: 'json',
        contentTypeId: 12, // 관광지
        numOfRows: 100, // 100개씩 가져오기
        pageNo: 1, // 1페이지부터
      },
    })

    const items = res.data.response.body.items.item
    console.log('관광지 데이터:', items)
    const points = items.map(item => ({
      title: item.title,
      lat: parseFloat(item.mapy), // 위도
      lng: parseFloat(item.mapx), // 경도
    }))
    console.log(points)
    return items
  } catch (error) {
    console.error('관광지 API 호출 실패:', error)
    return []
  }
}
