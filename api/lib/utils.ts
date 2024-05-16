import md5 from 'md5'
import { Image } from 'react-native'

export const publicKey = process.env.EXPO_PUBLIC_MARVEL_PUBLIC_API_KEY
export const privateKey = process.env.EXPO_PUBLIC_MARVEL_PRIVATE_API_KEY
export const baseUrl = 'https://gateway.marvel.com/v1/public'

export const getHash = (ts: string): string => {
  return md5(ts + privateKey + publicKey)
}

export const getRandomOffset = (max: number): number => {
  return Math.floor(Math.random() * max)
}

export const prefetchImage = async (url: string): Promise<void> => {
  try {
    await Image.prefetch(url)
  } catch (error) {
    console.error('Error prefetching image:', error)
  }
}
