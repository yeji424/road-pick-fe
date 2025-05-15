import axios from 'axios'

const SERVICE_KEY = import.meta.env.VITE_TOUR_API

export const getLocationTourList = async ({ mapX, mapY, radius, contentTypeId }) => {
  const response = await axios.get(
    'https://apis.data.go.kr/B551011/KorService2/locationBasedList2',
    {
      params: {
        MobileOS: 'ETC',
        MobileApp: 'LoadPick',
        _type: 'json',
        contentTypeId,
        mapX,
        mapY,
        radius,
        arrange: 'B', // 인기순
        numOfRows: 20,
        serviceKey: SERVICE_KEY,
      },
    }
  )

  const items = response.data.response.body.items.item || []
  const filtered = items.filter(item => item.firstimage).slice(0, 10)
  const shuffled = filtered.sort(() => Math.random() - 0.5)
  return shuffled
}
