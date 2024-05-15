import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { useRouter, Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import { ExternalLink } from '@/components/ExternalLink'

export function Header() {
  return (
    <View style={styles.container}>
      <ExternalLink href='https://www.orderyoyo.com' asChild>
        <Pressable>
          {({ pressed }) => (
            <Image
              source={require('@/assets/images/movie-logo.png')}
              style={{
                height: '100%',
                resizeMode: 'contain',
                opacity: pressed ? 0.5 : 1,
              }}
            />
          )}
        </Pressable>
      </ExternalLink>
      <Link href='/profile' asChild>
        <Pressable>
          {({ pressed }) => (
            <Image
              source={require('@/assets/images/profile.png')}
              style={{
                marginRight: 15,
                height: '100%',
                resizeMode: 'contain',
                opacity: pressed ? 0.5 : 1,
              }}
            />
          )}
        </Pressable>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  logo: {
    height: '100%',
    resizeMode: 'contain',
  },
  profile: {
    height: '100%',
    resizeMode: 'contain',
  },
})
