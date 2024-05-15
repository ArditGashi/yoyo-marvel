import axios from 'axios'

import { MarvelComics } from '../lib/types'
import { getHash, publicKey, baseUrl } from '../lib/utils'

const api = axios.create({
  baseURL: baseUrl,
})

export const getMarvelComics = async (): Promise<MarvelComics[]> => {
  const ts = new Date().getTime().toString()
  const hash = getHash(ts)

  try {
    const response = await api.get('/comics', {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit: 10, // Fetch a limited number of comics for efficiency
      },
    })

    const results = response.data.data.results

    return results.map(
      (comic: {
        id: number
        title: string
        thumbnail: {
          path: string
          extension: string
        }
      }) => ({
        id: comic.id,
        title: comic.title,
        thumbnail: {
          path: comic.thumbnail.path,
          extension: comic.thumbnail.extension,
        },
      })
    )
  } catch (error: any) {
    console.error(
      'Error fetching Marvel comics:',
      error.response?.status,
      error.message
    )
    return []
  }
}
