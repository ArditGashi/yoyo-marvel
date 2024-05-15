import axios from 'axios'
import { MarvelStories } from '../lib/types'
import { getHash, publicKey, baseUrl } from '../lib/utils'

const api = axios.create({
  baseURL: baseUrl,
})

export const getMarvelStories = async (): Promise<MarvelStories[]> => {
  const ts = new Date().getTime().toString()
  const hash = getHash(ts)

  try {
    const response = await api.get('/stories', {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit: 10, // Fetch a limited number of stories for efficiency
      },
    })

    const results = response.data.data.results

    return results.map((story: any) => ({
      id: story.id,
      title: story.title,
      thumbnail: {
        path: story.thumbnail?.path,
        extension: story.thumbnail?.extension,
      },
    }))
  } catch (error: any) {
    console.error(
      'Error fetching Marvel stories:',
      error.response?.status,
      error.message
    )
    return []
  }
}
