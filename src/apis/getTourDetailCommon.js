import axios from 'axios'

const SERVICE_KEY = import.meta.env.VITE_TOUR_API

export const getTourDetailCommon = async (contentId, contentTypeId) => {
  const response = await axios.get('https://apis.data.go.kr/B551011/KorService2/detailCommon2', {
    params: {
      MobileOS: 'ETC',
      MobileApp: 'LoadPick',
      _type: 'json',
      contentId,
      contentTypeId,
      serviceKey: SERVICE_KEY,
      defaultYN: 'Y',
      firstImageYN: 'Y',
      areacodeYN: 'Y',
      addrinfoYN: 'Y',
      mapinfoYN: 'Y',
      overviewYN: 'Y',
    },
  })

  const item = response.data.response.body.items.item
  return item
}
