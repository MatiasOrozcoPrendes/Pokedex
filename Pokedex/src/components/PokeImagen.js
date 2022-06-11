import React from 'react'
import { StyleSheet, Image} from 'react-native'

const PokeImagen = (props) => {
  return (
    <Image
      style={[styles.Image, props.style]}
      source={props.source}
    />
  )
}

export default PokeImagen

const styles = StyleSheet.create({
  Image: {
  
  }
})