import Colors from '@/constants/Colors'
import dimensions from '@/constants/Dimensions'
import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Dimensions, Animated } from 'react-native'
import PagerView from 'react-native-pager-view'

const images = [
  require('../../assets/images/marvel.jpg'),
  require('../../assets/images/marvel.jpg'),
  require('../../assets/images/marvel.jpg'),
]

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState(1) // Start at the first image duplicate
  const imageScale = useRef(images.map(() => new Animated.Value(0.9))).current // Starting scale
  const dotScale = useRef(images.map(() => new Animated.Value(1))).current
  const pagerRef = useRef<PagerView>(null)

  const totalImages = images.length
  const extendedImages = [images[totalImages - 1], ...images, images[0]] // Duplicate first and last images

  useEffect(() => {
    // Animate the active image to scale up when the active image changes
    Animated.spring(imageScale[activeIndex - 1], {
      toValue: 1,
      useNativeDriver: true,
    }).start()

    // Animate all other images to scale down slightly when the active image changes
    images.forEach((_, i) => {
      if (i !== activeIndex - 1) {
        Animated.spring(imageScale[i], {
          toValue: 0.97,
          useNativeDriver: true,
        }).start()
      }
    })
  }, [activeIndex])

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = activeIndex + 1
      pagerRef.current?.setPage(nextIndex)
    }, 2000) // Change page every 2 seconds

    return () => clearInterval(interval) // Clear the interval on unmount
  }, [activeIndex])

  const handlePageSelected = (e: { nativeEvent: { position: number } }) => {
    const position = e.nativeEvent.position

    if (position === 0) {
      setTimeout(() => {
        pagerRef.current?.setPageWithoutAnimation(totalImages)
      }, 100) // Delay to allow the transition to be smooth
    } else if (position === totalImages + 1) {
      setTimeout(() => {
        pagerRef.current?.setPageWithoutAnimation(1)
      }, 100) // Delay to allow the transition to be smooth
    } else {
      setActiveIndex(position)
    }
  }

  return (
    <View>
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={1} // Start on the first image (with the duplicate images)
        onPageSelected={handlePageSelected}
      >
        {extendedImages.map((image, index) => (
          <View key={index} style={{ width: dimensions.winWidth }}>
            <Animated.Image
              source={image}
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
      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  activeIndex === index + 1 ? Colors.dark.yoyo : 'white',
                transform: [{ scale: dotScale[index] }],
              },
            ]}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  pagerView: {
    height: 250, // Adjust based on your content
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
  },
})
