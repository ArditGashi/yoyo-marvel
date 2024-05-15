import React, { useState } from 'react'
import { View } from 'react-native'

import Colors from '@/constants/Colors'
import DotsIndicator from '@/components/home/DotsIndicator'
import ImageCarousel from '@/components/home/ImageCarousel'

const images = [
  require('../../assets/images/marvel.jpg'),
  require('../../assets/images/marvel.jpg'),
  require('../../assets/images/marvel.jpg'),
]

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState<number>(1)

  return (
    <View>
      <ImageCarousel
        images={images}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <DotsIndicator
        images={images}
        activeIndex={activeIndex}
        activeColor={Colors.dark.yoyo}
        inactiveColor={Colors.dark.tabIconDefault}
      />
    </View>
  )
}
