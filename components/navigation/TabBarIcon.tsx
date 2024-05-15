import React from 'react'
import { View } from 'react-native'
import { LucideProps } from 'lucide-react-native'

interface TabBarIconProps {
  Icon: React.ComponentType<LucideProps>
  color: string
}

export function TabBarIcon({ Icon, color }: TabBarIconProps) {
  return (
    <View>
      <Icon color={color} size={24} />
    </View>
  )
}
