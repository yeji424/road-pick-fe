import axios from 'axios'

const SERVICE_KEY = import.meta.env.VITE_TOUR_API

export const getTourDetailIntro = async (contentId, contentTypeId) => {
  const response = await axios.get('https://apis.data.go.kr/B551011/KorService2/detailIntro2', {
    params: {
      MobileOS: 'ETC',
      MobileApp: 'LoadPick',
      _type: 'json',
      contentTypeId,
      contentId,
      serviceKey: SERVICE_KEY,
    },
  })

  const item = response.data.response.body.items.item

  return item
}
