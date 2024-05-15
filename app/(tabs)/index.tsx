import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text, SafeAreaView } from 'react-native'

import Colors from '@/constants/Colors'
import { getMarvelCharacters } from '@/api/marvel'
import DotsIndicator from '@/components/home/DotsIndicator'
import ImageCarousel from '@/components/home/ImageCarousel'
import LottieView from 'lottie-react-native'

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

  const animation = useRef<LottieView>(null)

  return (
    <View>
      {loading ? (
        <SafeAreaView style={styles.animationContainer}>
          <View style={{ flex: 1 }}>
            <LottieView
              autoPlay
              ref={animation}
              style={{
                width: 200,
                height: 200,
              }}
              source={require('../../assets/loader.json')}
            />
          </View>
        </SafeAreaView>
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
        </SafeAreaView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
})
