import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import Colors from '@/constants/Colors'
import { getMarvelSeries } from '@/api/marvel/series' // Import the API function
import { MarvelSeries } from '@/api/lib/types' // Import the type
import LottieLoader from '@/components/LottieLoader'

export default function RecommendedSeriesSlider() {
  const [series, setSeries] = useState<MarvelSeries[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const fetchedSeries = await getMarvelSeries()
        setSeries(fetchedSeries)
      } catch (error) {
        console.error('Error fetching series:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSeries()
  }, [])

  if (loading) {
    return <LottieLoader />
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
      >
        {series.map((item) => (
          <View key={item.id} style={styles.imageContainer}>
            <Image
              source={{
                uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
              }}
              style={styles.image}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
  },
  titleContainer: {
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.tint,
  },
  headerHighlight: {
    color: Colors.dark.yoyo,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  imageContainer: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  image: {
    width: 256,
    height: 128,
    borderRadius: 8,
  },
})
