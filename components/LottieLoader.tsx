import React, { useRef, useEffect, useState } from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'

interface LottieLoaderProps {
  width?: number
  height?: number
}

const LottieLoader: React.FC<LottieLoaderProps> = ({
  width = 200,
  height = 200,
}) => {
  const animation = useRef<LottieView>(null)

  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    const preload = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500)) // Add a small delay
      setLoaded(true)
    }
    preload()
  }, [])

  return (
    <SafeAreaView style={styles.animationContainer}>
      {loaded && (
        <View style={{ flex: 1 }}>
          <LottieView
            autoPlay
            loop
            ref={animation}
            style={{ width, height }}
            source={require('../assets/loader.json')}
          />
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
})

export default LottieLoader
