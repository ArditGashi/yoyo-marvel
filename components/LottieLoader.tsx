import LottieView from 'lottie-react-native'
import { useRef } from 'react'
import { SafeAreaView, View } from 'react-native'
import { StyleSheet } from 'react-native'

export default function LottieLoader() {
  const animation = useRef<LottieView>(null)

  return (
    <SafeAreaView style={styles.animationContainer}>
      <View style={{ flex: 1 }}>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 200,
            height: 200,
          }}
          source={require('../assets/loader.json')}
        />
      </View>
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
