import axios from 'axios'
import md5 from 'md5'
import { MarvelSeries } from '../lib/types'
import { getHash, publicKey, baseUrl } from '../lib/utils'

const api = axios.create({
  baseURL: baseUrl,
})

const getRandomOffset = (max: number) => {
  return Math.floor(Math.random() * max)
}

export const getMarvelSeries = async (): Promise<MarvelSeries[]> => {
  const ts = new Date().getTime().toString()
  const hash = getHash(ts)

  const totalSeries = 1493 // Total number of series in the Marvel database
  const limit = 20 // Number of series to fetch
  const offset = getRandomOffset(totalSeries - limit) // Ensure the offset doesn't go out of bounds

  try {
    const response = await api.get('/series', {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit,
        offset, // Randomize the offset for variety
      },
    })

    const results = response.data.data.results

    return results
      .filter(
        (series: { thumbnail: { path: string } }) =>
          series.thumbnail.path.indexOf('image_not_available') === -1 &&
          series.thumbnail.path.indexOf('4c002e0305708') === -1 // Filter out placeholder images
      )
      .map(
        (series: {
          id: number
          title: string
          thumbnail: {
            path: string
            extension: string
          }
        }) => ({
          id: series.id,
          title: series.title,
          thumbnail: {
            path: series.thumbnail.path,
            extension: series.thumbnail.extension,
          },
        })
      )
  } catch (error: any) {
    console.error(
      'Error fetching Marvel series:',
      error.response?.status,
      error.message
    )
    return []
  }
}
