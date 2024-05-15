import { StyleSheet } from 'react-native'
import { Text, View } from '@/components/Themed'

export default function FindScreen() {
  return (
    <View>
      <Text>Find</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
})
