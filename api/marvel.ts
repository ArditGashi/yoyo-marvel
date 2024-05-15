import axios from 'axios'
import md5 from 'md5'

const publicKey = process.env.EXPO_PUBLIC_MARVEL_PUBLIC_API_KEY
const privateKey = process.env.EXPO_PUBLIC_MARVEL_PRIVATE_API_KEY
const baseUrl = 'https://gateway.marvel.com/v1/public'

const getHash = (ts: string): string => {
  return md5(ts + privateKey + publicKey)
}

const api = axios.create({
  baseURL: baseUrl,
})

export const getMarvelImages = async (): Promise<string[]> => {
  const ts = new Date().getTime().toString()
  const hash = getHash(ts)

  try {
    const response = await api.get('/characters', {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit: 10, // Fetch a limited number of characters for efficiency
      },
    })

    const results = response.data.data.results

    console.log('Marvel images:', results)
    return results.map(
      (character: { thumbnail: { path: string; extension: string } }) =>
        `${character.thumbnail.path}.${character.thumbnail.extension}`
    )
  } catch (error: any) {
    console.error(
      'Error fetching Marvel images:',
      error.response?.status,
      error.message
    )
    return []
  }
}
