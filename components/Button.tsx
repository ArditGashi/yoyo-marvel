import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import Colors from '@/constants/Colors'
import { Play } from 'lucide-react-native'

interface ButtonProps {
  title: string
  onPress: () => void
}

export default function YoYoButton({ title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Play fill={'white'} size={20} color='white' style={styles.icon} />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.dark.yoyo,
    borderRadius: 5,
    width: '100%',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
