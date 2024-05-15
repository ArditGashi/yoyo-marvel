// dimensions.js
import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

interface DimensionsType {
  winWidth: number
  winHeight: number
}

const dimensions: DimensionsType = {
  winWidth: width,
  winHeight: height,
}

export default dimensions
