import Colors from '@/constants/Colors'
import dimensions from '@/constants/Dimensions'
import React, { useEffect, useRef } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  Text,
} from 'react-native'
import PagerView from 'react-native-pager-view'

interface MarvelCharacter {
  id: number
  name: string
  thumbnail: {
    path: string
    extension: string
  }
}

interface ImageCarouselProps {
  characters: MarvelCharacter[]
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  characters,
  activeIndex,
  setActiveIndex,
}) => {
  const totalCharacters = characters.length
  const extendedCharacters =
    totalCharacters > 0
      ? [characters[totalCharacters - 1], ...characters, characters[0]]
      : []
  const pagerRef = useRef<PagerView>(null)
  const imageScale = useRef(
    characters.map(() => new Animated.Value(0.9))
  ).current

  useEffect(() => {
    if (characters.length > 0) {
      Animated.spring(imageScale[activeIndex - 1], {
        toValue: 1,
        useNativeDriver: true,
      }).start()

      characters.forEach((_, i) => {
        if (i !== activeIndex - 1) {
          Animated.spring(imageScale[i], {
            toValue: 0.97,
            useNativeDriver: true,
          }).start()
        }
      })
    }
  }, [activeIndex, characters])

  useEffect(() => {
    if (characters.length > 0) {
      const interval = setInterval(() => {
        const nextIndex = activeIndex + 1
        pagerRef.current?.setPage(nextIndex)
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [activeIndex, characters])

  const handlePageSelected = (e: { nativeEvent: { position: number } }) => {
    const position = e.nativeEvent.position

    if (position === 0) {
      setTimeout(() => {
        pagerRef.current?.setPageWithoutAnimation(totalCharacters)
      }, 100)
    } else if (position === totalCharacters + 1) {
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
      {extendedCharacters.map((character, index) => (
        <View
          key={`${character.id}-${index}`}
          style={{ width: dimensions.winWidth }}
        >
          <Animated.Image
            source={{
              uri: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            }}
            style={[
              styles.image,
              {
                transform: [
                  {
                    scale:
                      imageScale[
                        index === 0
                          ? totalCharacters - 1
                          : (index - 1) % totalCharacters
                      ],
                  },
                ],
              },
            ]}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{character.name}</Text>
          </View>
        </View>
      ))}
    </PagerView>
  )
}
const styles = StyleSheet.create({
  pagerView: {
    height: 250,
  },
  imageContainer: {
    width: dimensions.winWidth,
    height: '100%',
    position: 'relative', // Ensure this is positioned relatively
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    position: 'absolute', // Position the text absolutely within the image container
    bottom: 8,
    alignSelf: 'center',
    fontWeight: 100,
    borderRadius: 2,
    backgroundColor: Colors.dark.background, // Optional: Add a semi-transparent background for better readability
    paddingHorizontal: 6, // Ensure the text is above the image
    paddingVertical: 4, // Ensure the text is above the image
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
})

export default ImageCarousel
