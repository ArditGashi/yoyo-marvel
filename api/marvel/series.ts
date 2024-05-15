import axios from 'axios'
import md5 from 'md5'
import { MarvelSeries } from '../lib/types'
import { getHash, publicKey, baseUrl } from '../lib/utils'

const api = axios.create({
  baseURL: baseUrl,
})

export const getMarvelSeries = async (): Promise<MarvelSeries[]> => {
  const ts = new Date().getTime().toString()
  const hash = getHash(ts)

  try {
    const response = await api.get('/series', {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit: 10, // Fetch a limited number of series for efficiency
      },
    })

    const results = response.data.data.results

    return results.map(
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
