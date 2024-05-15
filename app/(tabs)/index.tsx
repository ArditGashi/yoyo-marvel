import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import Colors from '@/constants/Colors'
import { getMarvelCharacters } from '@/api/marvel'
import DotsIndicator from '@/components/home/DotsIndicator'
import ImageCarousel from '@/components/home/ImageCarousel'

interface MarvelCharacter {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState<number>(1)
  const [characters, setCharacters] = useState<MarvelCharacter[]>([])

  useEffect(() => {
    const fetchCharacters = async () => {
      const marvelCharacters = await getMarvelCharacters()
      setCharacters(marvelCharacters)
      setActiveIndex(1)
    }

    fetchCharacters()
  }, [])

  return (
    <View>
      {characters.length > 0 && (
        <>
          <ImageCarousel
            characters={characters}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
          <DotsIndicator
            characters={characters}
            activeIndex={activeIndex}
            activeColor={Colors.dark.yoyo}
            inactiveColor='white'
          />
        </>
      )}
    </View>
  )
}
