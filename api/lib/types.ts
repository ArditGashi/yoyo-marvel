export interface MarvelCharacter {
  id: number
  name: string
  thumbnail: {
    path: string
    extension: string
  }
}

export interface MarvelCharacterDetail extends MarvelCharacter {
  description: string
  comics: {
    available: number
    collectionURI: string
  }
  series: {
    available: number
    collectionURI: string
  }
  stories: {
    available: number
    collectionURI: string
  }
}

export interface MarvelComics {
  id: number
  title: string
  thumbnail: {
    path: string
    extension: string
  }
}

export interface MarvelSeries {
  id: number
  title: string
  thumbnail: {
    path: string
    extension: string
  }
}

export interface MarvelStories {
  id: number
  title: string
  thumbnail?: {
    path: string
    extension: string
  }
}
