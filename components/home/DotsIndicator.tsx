import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'

interface MarvelCharacter {
  id: number
  name: string
  thumbnail: {
    path: string
    extension: string
  }
}

interface DotsIndicatorProps {
  characters: MarvelCharacter[]
  activeIndex: number
  activeColor: string
  inactiveColor: string
}

const DotsIndicator: React.FC<DotsIndicatorProps> = ({
  characters,
  activeIndex,
  activeColor,
  inactiveColor,
}) => {
  const dotScale = useRef(characters.map(() => new Animated.Value(1))).current

  useEffect(() => {
    characters.forEach((_, i) => {
      Animated.spring(dotScale[i], {
        toValue: activeIndex === i + 1 ? 1.2 : 1,
        useNativeDriver: true,
      }).start()
    })
  }, [activeIndex, characters])

  return (
    <View style={styles.dotContainer}>
      {characters.map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor:
                activeIndex === index + 1 ? activeColor : inactiveColor,
              transform: [{ scale: dotScale[index] }],
            },
          ]}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
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

export default DotsIndicator
