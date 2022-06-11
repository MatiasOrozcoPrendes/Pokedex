import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'

const PokeBotonImagen = (props) => {
  return (
    <TouchableOpacity style={[styles.button, props.style, {backgroundColor: props.btnColor}]} onPress={props.customPress}>
        <Image
          style={[{width: props.imageWidth}, {height: props.imagesHeight}]}
          source={props.source}
        />
        <View style={styles.text}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default PokeBotonImagen

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
      },
      text: {
        color: 'yellow',
        textShadowColor: 'blue',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        fontSize: 20,
      },
      Image: {
        padding: 5,
      }
})