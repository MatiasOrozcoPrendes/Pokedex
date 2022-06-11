import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const PokeBoton = (props) => {
  return (
    <TouchableOpacity style={[styles.button, props.style, {backgroundColor: props.btnColor}]} onPress={props.customPress}>
        <View style={styles.text}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default PokeBoton

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 4,
    borderRadius: 50,
    borderColor: "#d3d3d3",
    borderWidth: 5,
    
  },
  text: {
    fontSize: 20,
    color: 'yellow',
    textShadowColor: 'blue',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
})