import axios from 'axios'

import { MarvelCharacter, MarvelCharacterDetail } from '../lib/types'
import { getHash, publicKey, baseUrl } from '../lib/utils'

const api = axios.create({
  baseURL: baseUrl,
})

const getRandomOffset = (max: number) => {
  return Math.floor(Math.random() * max)
}

export const getMarvelCharacters = async (): Promise<MarvelCharacter[]> => {
  const ts = new Date().getTime().toString()
  const hash = getHash(ts)

  const totalCharacters = 1493 // Total number of characters in the Marvel database
  const limit = 16 // Number of characters to fetch
  const offset = getRandomOffset(totalCharacters - limit) // Ensure the offset doesn't go out of bounds

  try {
    const response = await api.get('/characters', {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit, // Fetch a limited number of characters for efficiency
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

export const getMarvelCharacterDetail = async (
  id: number
): Promise<MarvelCharacterDetail | null> => {
  const ts = new Date().getTime().toString()
  const hash = getHash(ts)

  try {
    const response = await api.get(`/characters/${id}`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
      },
    })

    const character = response.data.data.results[0]

    return {
      id: character.id,
      name: character.name,
      description: character.description,
      thumbnail: {
        path: character.thumbnail.path,
        extension: character.thumbnail.extension,
      },
      comics: {
        available: character.comics.available,
        collectionURI: character.comics.collectionURI,
      },
      series: {
        available: character.series.available,
        collectionURI: character.series.collectionURI,
      },
      stories: {
        available: character.stories.available,
        collectionURI: character.stories.collectionURI,
      },
    }
  } catch (error: any) {
    console.error(
      'Error fetching Marvel character details:',
      error.response?.status,
      error.message
    )
    return null
  }
}
