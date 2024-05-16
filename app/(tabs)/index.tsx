import React, { useEffect, useState, useRef } from 'react'
import { View, SafeAreaView, Animated, StyleSheet, Image } from 'react-native'
import Colors from '@/constants/Colors'
import DotsIndicator from '@/components/home/DotsIndicator'
import ImageCarousel from '@/components/home/ImageCarousel'
import LottieLoader from '@/components/LottieLoader'
import RecommendedSeriesSlider from '@/components/home/RecommendedSeriesSlider'
import { fetchDataConcurrently } from '@/api/marvel'
import { MarvelCharacter, MarvelComics, MarvelSeries } from '@/api/lib/types'
import { useLocalSearchParams } from 'expo-router'
import TopComicsSlider from '@/components/home/TopComicsSlider'

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState<number>(1)
  const [characters, setCharacters] = useState<MarvelCharacter[]>([])
  const [series, setSeries] = useState<MarvelSeries[]>([])
  const [comics, setComics] = useState<MarvelComics[]>([])

  const [loading, setLoading] = useState<boolean>(true)
  const [delayed, setDelayed] = useState<boolean>(true)

  const contentOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const fetchCharacterAndSeries = async () => {
      try {
        const { characters, series, comics } = await fetchDataConcurrently()
        setSeries(series)
        setCharacters(characters)
        setComics(comics)
        setActiveIndex(1)

        const images = [
          ...characters.map(
            (character) =>
              `${character.thumbnail.path}.${character.thumbnail.extension}`
          ),
          ...series.map((s) => `${s.thumbnail.path}.${s.thumbnail.extension}`),
          ...comics.map((c) => `${c.thumbnail.path}.${c.thumbnail.extension}`),
        ]

        await Promise.all(images.map((url) => Image.prefetch(url))) // Prefetch images for better performance
      } catch (error) {
        console.error('Error fetching character and series:', error)
      } finally {
        setLoading(false)
        setTimeout(() => {
          setDelayed(false)
        }, 200) // Add 200ms delay after loading is done
      }
    }

    fetchCharacterAndSeries()
  }, [])

  useEffect(() => {
    if (!loading && !delayed) {
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start()
    }
  }, [loading, delayed])

  return (
    <View style={styles.container}>
      {loading || delayed ? (
        <LottieLoader />
      ) : (
        <Animated.ScrollView
          style={{ ...styles.content, opacity: contentOpacity }}
        >
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
            <RecommendedSeriesSlider initialSeries={series} />
            <TopComicsSlider initialComics={comics} />
          </SafeAreaView>
        </Animated.ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
  },
})
