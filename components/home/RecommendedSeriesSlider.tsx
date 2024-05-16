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
import { MarvelSeries } from '@/api/lib/types'
import { getMarvelSeries } from '@/api/marvel'
import LottieLoader from '@/components/LottieLoader'

interface RecommendedSeriesSliderProps {
  initialSeries: MarvelSeries[]
}

export default function RecommendedSeriesSlider({
  initialSeries,
}: RecommendedSeriesSliderProps) {
  const [series, setSeries] = useState<MarvelSeries[]>(initialSeries)
  const [loading, setLoading] = useState<boolean>(false)
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const scrollViewRef = useRef<ScrollView>(null)
  const [offset, setOffset] = useState<number>(initialSeries.length)

  const fetchMoreSeries = async () => {
    if (loading) return

    setLoading(true)
    setShowLoader(true) // Show loader immediately

    const moreSeries = await getMarvelSeries(offset)
    setSeries((prevSeries) => [...prevSeries, ...moreSeries])
    setOffset((prevOffset) => prevOffset + moreSeries.length)

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
      fetchMoreSeries()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>
          <Text style={styles.headerHighlight}>YOYO</Text> - Recommended Series
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
        {series.map((item, index) => (
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
    paddingVertical: 50,
    width: 150, // Ensure loader takes full width of the viewport
    justifyContent: 'center',
    alignItems: 'center',
  },
})
