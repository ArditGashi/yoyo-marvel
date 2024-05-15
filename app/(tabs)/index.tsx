import React, { useEffect, useState } from 'react'
import { View, SafeAreaView } from 'react-native'

import Colors from '@/constants/Colors'

import DotsIndicator from '@/components/home/DotsIndicator'
import ImageCarousel from '@/components/home/ImageCarousel'
import LottieView from 'lottie-react-native'
import LottieLoader from '@/components/LottieLoader'
import { getMarvelCharacters } from '@/api/marvel/characters'
import RecommendedSeriesSlider from '@/components/home/RecommendedSeriesSlider'

interface MarvelCharacter {
  id: number
  name: string
  thumbnail: {
    path: string
    extension: string
  }
}

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState<number>(1)
  const [characters, setCharacters] = useState<MarvelCharacter[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCharacters = async () => {
      const marvelCharacters = await getMarvelCharacters()
      setCharacters(marvelCharacters)
      setActiveIndex(1)
      setLoading(false)
    }

    fetchCharacters()
  }, [])

  return (
    <View>
      {loading ? (
        <LottieLoader />
      ) : (
        <SafeAreaView>
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
          <RecommendedSeriesSlider />
        </SafeAreaView>
      )}
    </View>
  )
}
