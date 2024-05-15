import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import Colors from '@/constants/Colors'
import { getMarvelImages } from '@/api/marvel'
import DotsIndicator from '@/components/home/DotsIndicator'
import ImageCarousel from '@/components/home/ImageCarousel'

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState<number>(1)
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    const fetchImages = async () => {
      const marvelImages = await getMarvelImages()
      setImages(marvelImages)
      setActiveIndex(1)
    }

    fetchImages()
  }, [])

  return (
    <View>
      {images.length > 0 && (
        <>
          <ImageCarousel
            images={images}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
          <DotsIndicator
            images={images}
            activeIndex={activeIndex}
            activeColor={Colors.dark.yoyo}
            inactiveColor='white'
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({})
