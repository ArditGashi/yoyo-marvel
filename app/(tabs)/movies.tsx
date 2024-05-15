import { StyleSheet } from 'react-native'

import { Text, View } from '@/components/Themed'

export default function MoviesScreen() {
  return (
    <View style={styles.titleContainer}>
      <Text>Movies</Text>
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
