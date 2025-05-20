import axios from 'axios'

const SERVICE_KEY = import.meta.env.VITE_TOUR_API

export const getTourDetailCommon = async contentId => {
  const response = await axios.get('https://apis.data.go.kr/B551011/KorService2/detailCommon2', {
    params: {
      MobileOS: 'ETC',
      MobileApp: 'LoadPick',
      _type: 'json',
      contentId,
      serviceKey: SERVICE_KEY,
    },
  })

  const item = response.data.response.body.items.item
  return item
}
