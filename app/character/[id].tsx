import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { MarvelCharacterDetail } from '@/api/lib/types'
import {
  getMarvelCharacterDetail,
  getMarvelComics,
  getMarvelSeries,
  getMarvelStories,
} from '@/api/marvel'
import Colors from '@/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProfileHeader } from '@/components/navigation/ProfileHeader'
import YoYoButton from '@/components/Button'
import LottieLoader from '@/components/LottieLoader'
import { prefetchImage } from '@/api/lib/utils'

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

        // Prefetch additional data and images
        if (detail) {
          prefetchAdditionalData(detail)
        }
      }
    }

    const prefetchAdditionalData = async (character: MarvelCharacterDetail) => {
      if (character.thumbnail && character.thumbnail.path) {
        const imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`
        await prefetchImage(imageUrl) // Prefetch character image
      }

      if (character.comics.available > 0) {
        getMarvelComics(character.id) // Prefetch comics data
      }
      if (character.series.available > 0) {
        getMarvelSeries(character.id) // Prefetch series data
      }
      if (character.stories.available > 0) {
        getMarvelStories() // Prefetch stories data
      }
    }

    fetchCharacter()
  }, [id])

  if (!character || loading) {
    return <LottieLoader />
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <ProfileHeader />
        {character.thumbnail && character.thumbnail.path && (
          <Image
            source={{
              uri: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            }}
            style={styles.image}
          />
        )}
        <View style={styles.contentContainer}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'flex-start',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 0,
    marginBottom: 16,
  },
  contentContainer: {
    padding: 16,
    width: '100%',
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
