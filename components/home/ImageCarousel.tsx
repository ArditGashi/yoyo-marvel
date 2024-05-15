import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Dimensions, Animated, Image } from 'react-native'
import PagerView from 'react-native-pager-view'

const screenWidth = Dimensions.get('window').width

interface ImageCarouselProps {
  images: string[]
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  activeIndex,
  setActiveIndex,
}) => {
  const totalImages = images.length
  const extendedImages =
    totalImages > 0 ? [images[totalImages - 1], ...images, images[0]] : []
  const pagerRef = useRef<PagerView>(null)
  const imageScale = useRef(images.map(() => new Animated.Value(0.9))).current

  useEffect(() => {
    if (images.length > 0) {
      Animated.spring(imageScale[activeIndex - 1], {
        toValue: 1,
        useNativeDriver: true,
      }).start()

      images.forEach((_, i) => {
        if (i !== activeIndex - 1) {
          Animated.spring(imageScale[i], {
            toValue: 0.97,
            useNativeDriver: true,
          }).start()
        }
      })
    }
  }, [activeIndex, images])

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        const nextIndex = activeIndex + 1
        pagerRef.current?.setPage(nextIndex)
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [activeIndex, images])

  const handlePageSelected = (e: { nativeEvent: { position: number } }) => {
    const position = e.nativeEvent.position

    if (position === 0) {
      setTimeout(() => {
        pagerRef.current?.setPageWithoutAnimation(totalImages)
      }, 100)
    } else if (position === totalImages + 1) {
      setTimeout(() => {
        pagerRef.current?.setPageWithoutAnimation(1)
      }, 100)
    } else {
      setActiveIndex(position)
    }
  }

  return (
    <PagerView
      ref={pagerRef}
      style={styles.pagerView}
      initialPage={1}
      onPageSelected={handlePageSelected}
    >
      {extendedImages.map((image, index) => (
        <View key={index} style={{ width: screenWidth }}>
          <Animated.Image
            source={{ uri: image }}
            style={[
              styles.image,
              {
                transform: [
                  {
                    scale:
                      imageScale[
                        index === 0
                          ? totalImages - 1
                          : (index - 1) % totalImages
                      ],
                  },
                ],
              },
            ]}
          />
        </View>
      ))}
    </PagerView>
  )
}

const styles = StyleSheet.create({
  pagerView: {
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
})

export default ImageCarousel
