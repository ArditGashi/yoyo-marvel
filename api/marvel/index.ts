import axios from 'axios'
import md5 from 'md5'
import { MarvelCharacter, MarvelSeries } from '../lib/types'
import { getHash, publicKey, baseUrl } from '../lib/utils'
import { getRandomOffset } from '../lib/utils'

export * from './characters'
//export * from './comics'
//export * from './series'
export * from './stories'

const api = axios.create({
  baseURL: baseUrl,
})

export const getMarvelCharacters = async (): Promise<MarvelCharacter[]> => {
  const ts = new Date().getTime().toString()
  const hash = getHash(ts)

  const totalCharacters = 1493
  const limit = 16
  const offset = getRandomOffset(totalCharacters - limit)

  try {
    const response = await api.get('/characters', {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit,
        offset,
      },
    })

    const results = response.data.data.results

    return results
      .filter(
        (character: { thumbnail: { path: string } }) =>
          character.thumbnail.path.indexOf('image_not_available') === -1
      )
      .map(
        (character: {
          id: number
          name: string
          thumbnail: {
            path: string
            extension: string
          }
        }) => ({
          id: character.id,
          name: character.name,
          thumbnail: {
            path: character.thumbnail.path,
            extension: character.thumbnail.extension,
          },
        })
      )
  } catch (error: any) {
    console.error(
      'Error fetching Marvel characters:',
      error.response?.status,
      error.message
    )
    return []
  }
}

/* export const getMarvelSeries = async (): Promise<MarvelSeries[]> => {
  const ts = new Date().getTime().toString()
  const hash = getHash(ts)

  const totalSeries = 1493
  const limit = 10
  const offset = getRandomOffset(totalSeries - limit)

  try {
    const response = await api.get('/series', {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit,
        offset,
      },
    })

    const results = response.data.data.results

    return results
      .filter(
        (series: { thumbnail: { path: string } }) =>
          series.thumbnail.path.indexOf('image_not_available') === -1
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
} */

export const getMarvelSeries = async (
  offset?: number
): Promise<MarvelSeries[]> => {
  const ts = new Date().getTime().toString()
  const hash = getHash(ts)

  const totalSeries = 1493 // Total number of series in the Marvel database
  const limit = 16 // Number of series to fetch
  const calculatedOffset =
    offset !== undefined ? offset : getRandomOffset(totalSeries - limit) // Use the provided offset or a random one

  try {
    const response = await api.get('/series', {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit,
        offset: calculatedOffset,
      },
    })

    const results = response.data.data.results

    return results
      .filter(
        (series: { thumbnail: { path: string } }) =>
          series.thumbnail.path.indexOf('image_not_available') === -1
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

export const fetchDataConcurrently = async (): Promise<{
  characters: MarvelCharacter[]
  series: MarvelSeries[]
}> => {
  try {
    const [characters, series] = await Promise.all([
      getMarvelCharacters(),
      getMarvelSeries(),
    ])
    return { characters, series }
  } catch (error: any) {
    console.error(
      'Error fetching data concurrently:',
      error.response?.status,
      error.message
    )
    return { characters: [], series: [] }
  }
}
