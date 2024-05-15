import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  Linking,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { MarvelCharacterDetail } from '@/api/lib/types'
import { getMarvelCharacterDetail } from '@/api/marvel/characters'
import Colors from '@/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProfileHeader } from '@/components/navigation/ProfileHeader'
import YoYoButton from '@/components/Button'
import LottieLoader from '@/components/LottieLoader'
import dimensions from '@/constants/Dimensions'

export default function CharacterDetailScreen() {
  const { id } = useLocalSearchParams()
  const [character, setCharacter] = useState<MarvelCharacterDetail | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCharacter = async () => {
      if (id) {
        const detail = await getMarvelCharacterDetail(Number(id))
        setCharacter(detail)
        setLoading(false)
      }
    }

    fetchCharacter()
  }, [id])

  if (!character) {
    return <LottieLoader />
  }

  if (loading) {
    return <LottieLoader />
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <ProfileHeader />
        <Image
          source={{
            uri: `${character.thumbnail.path}.${character.thumbnail.extension}`,
          }}
          style={styles.image}
        />
        <Text style={styles.title}>{character.name}</Text>
        {character.description && (
          <View>
            <Text style={styles.subtitle}>Description:</Text>
            <Text style={styles.description}>{character.description}</Text>
          </View>
        )}
        <Text style={styles.subtitle}>
          Comics: {character.comics.available}
        </Text>
        <YoYoButton
          title='View Comics'
          onPress={() => Linking.openURL(character.comics.collectionURI)}
        />
        <Text style={styles.subtitle}>
          Series: {character.series.available}
        </Text>
        <YoYoButton
          title='View Series'
          onPress={() => Linking.openURL(character.series.collectionURI)}
        />
        <Text style={styles.subtitle}>
          Stories: {character.stories.available}
        </Text>
        <YoYoButton
          title='View Stories'
          onPress={() => Linking.openURL(character.stories.collectionURI)}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 16,
    alignItems: 'flex-start',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 0,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 2,
    color: Colors.dark.tint,
  },
  description: {
    fontSize: 16,
    textAlign: 'left',

    color: Colors.dark.tint,
  },
  subtitle: {
    color: Colors.dark.tint,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
  },
})
