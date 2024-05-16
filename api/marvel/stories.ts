import axios from 'axios'
import { MarvelStories } from '../lib/types'
import { getHash, publicKey, baseUrl, getRandomOffset } from '../lib/utils'

const api = axios.create({
  baseURL: baseUrl,
})

export const getMarvelStories = async (): Promise<MarvelStories[]> => {
  const ts = new Date().getTime().toString()
  const hash = getHash(ts)

  const totalCharacters = 1493 // Total number of characters in the Marvel database
  const limit = 16 // Number of characters to fetch
  const offset = getRandomOffset(totalCharacters - limit) // Ensure the offset doesn't go out of bounds

  try {
    const response = await api.get('/stories', {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit, // Fetch a limited number of stories for efficiency
        offset,
      },
    })

    const results = response.data.data.results

    return results
      .filter(
        (series: { thumbnail: { path: string } }) =>
          series.thumbnail.path.indexOf('image_not_available') === -1 &&
          series.thumbnail.path.indexOf('4c002e0305708') === -1 // Filter out placeholder images
      )
      .map((story: any) => ({
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
