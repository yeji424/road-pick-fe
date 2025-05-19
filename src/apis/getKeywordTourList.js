import axios from 'axios'

const SERVICE_KEY = import.meta.env.VITE_TOUR_API

export const getKeywordTourList = async ({ keyword, contentTypeId }) => {
  const response = await axios.get('https://apis.data.go.kr/B551011/KorService2/searchKeyword2', {
    params: {
      MobileOS: 'ETC',
      MobileApp: 'LoadPick',
      _type: 'json',
      keyword,
      contentTypeId,
      serviceKey: SERVICE_KEY,
    },
  })

  const item = response.data.response.body.items.item

  return item.filter(item => item.mapx && item.mapy)
}
