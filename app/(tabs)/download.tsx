import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Image, Platform } from 'react-native'

import { View, Text } from '@/components/Themed'

export default function DownloadScreen() {
  return (
    <View style={styles.titleContainer}>
      <Text>Download</Text>
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
