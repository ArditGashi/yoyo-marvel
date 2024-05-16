import React, { useEffect, useState, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native'
import Colors from '@/constants/Colors'
import { MarvelComics } from '@/api/lib/types'
import { getMarvelComics } from '@/api/marvel'
import LottieLoader from '@/components/LottieLoader'

interface TopComicsSliderProps {
  initialComics: MarvelComics[]
}

export default function TopComicsSlider({
  initialComics,
}: TopComicsSliderProps) {
  const [comics, setComics] = useState<MarvelComics[]>(initialComics)
  const [loading, setLoading] = useState<boolean>(false)
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const scrollViewRef = useRef<ScrollView>(null)
  const [offset, setOffset] = useState<number>(initialComics.length)

  const fetchMoreComics = async () => {
    if (loading) return

    setLoading(true)
    setShowLoader(true) // Show loader immediately

    const moreComics = await getMarvelComics(offset)
    setComics((prevComics) => [...prevComics, ...moreComics])
    setOffset((prevOffset) => prevOffset + moreComics.length)

    setLoading(false)
    setTimeout(() => {
      setShowLoader(false) // Add delay before hiding loader
    }, 1000) // Adjust the delay as needed
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent
    const paddingToBottom = 20
    if (
      contentOffset.x + layoutMeasurement.width + paddingToBottom >=
      contentSize.width
    ) {
      fetchMoreComics()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>
          <Text style={styles.headerHighlight}>YOYO</Text> - Top Comics
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainer}
      >
        {comics.map((item, index) => (
          <View key={`${item.id}-${index}`} style={styles.imageContainer}>
            <Image
              source={{
                uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
              }}
              style={styles.image}
            />
          </View>
        ))}
        {showLoader && (
          <View style={styles.loaderContainer}>
            <LottieLoader width={64} height={64} />
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    position: 'relative',
  },
  titleContainer: {
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.tint,
    paddingLeft: 10,
  },
  headerHighlight: {
    color: Colors.dark.yoyo,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  contentContainer: {
    paddingRight: 20, // Add padding to the right to provide space for the loader
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 8,
  },
  loaderContainer: {
    width: 150,
    paddingVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
