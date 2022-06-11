import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const PokeEntrada = (props) => {
    return (
        <View style={[styles.container, props.style]}>
          <TextInput
            underlineColorAndroid="transparent"
            maxLength={props.maxLength}
            minLength={props.minLength}
            onChangeText={props.onChangeText}
            placeholder={props.placeholder}
            placeholderTextColor="#F4FA58"
            keyboardType={props.keyboardType}
            secureTextEntry={props.secureTextEntry}
            returnKeyType={props.returnKeyType}
            numberOfLines={props.numberOfLines}
            multiline={props.multiline}
            onSubmitEditing={props.onSubmitEditing}
            style={[props.style, styles.text]}
            blurOnSubmit={false}
            value={props.value}
            defaultValue={props.defaultValue}
            autoCapitalize={props.autoCapitalize}
          />
        </View>
      );
    };
    
    export default PokeEntrada;
    
    const styles = StyleSheet.create({
      container: {
        marginTop: 15,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 15,
        borderColor: "#d3d3d3",
        borderWidth: 3,
        padding: 5,
        backgroundColor: "#819FF7"
      },
      text: {
        color: 'yellow',
        textShadowColor: 'blue',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
      }
    });
    