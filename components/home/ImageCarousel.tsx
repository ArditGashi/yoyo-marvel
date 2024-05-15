import React, { useEffect, useRef } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
} from 'react-native'
import PagerView from 'react-native-pager-view'
import { useRouter } from 'expo-router'

const screenWidth = Dimensions.get('window').width

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
  const router = useRouter()

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

  const handleImagePress = (character: MarvelCharacter) => {
    router.push(`/character/${character.id}`)
  }

  return (
    <PagerView
      ref={pagerRef}
      style={styles.pagerView}
      initialPage={1}
      onPageSelected={handlePageSelected}
    >
      {extendedCharacters.map((character, index) => (
        <TouchableOpacity
          key={`${character.id}-${index}`}
          style={styles.imageContainer}
          onPress={() => handleImagePress(character)}
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
        </TouchableOpacity>
      ))}
    </PagerView>
  )
}

const styles = StyleSheet.create({
  pagerView: {
    height: 250,
  },
  imageContainer: {
    width: screenWidth,
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    fontWeight: 100,
    borderRadius: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
})

export default ImageCarousel
