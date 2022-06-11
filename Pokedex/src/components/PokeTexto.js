import React from 'react'
import { StyleSheet, Text } from 'react-native'


const PokeTexto = (props) => {
  return <Text style={[props.style, styles.text]}>{props.text}</Text>;
}

export default PokeTexto

const styles = StyleSheet.create({
    text: {
      color: 'yellow',
      textShadowColor: 'blue',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 5,
    }
})