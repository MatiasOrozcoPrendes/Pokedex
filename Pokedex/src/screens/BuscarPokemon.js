import React from 'react'
import {StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView, ImageBackground} from "react-native";
import { useState} from "react";
import PokeTexto from '../components/PokeTexto';
import PokeEntrada from '../components/PokeEntrada';
import PokeBoton from '../components/PokeBoton';
import PokeImagen from '../components/PokeImagen';
import PokeBotonImagen from '../components/PokeBotonImagen';

const BuscarPokemon = () => {
  const [Pokemon, setPokemon]=useState(5);
  const [Nombre, setNombre]=useState("");
  const [Numero, setNumero]=useState(5);
  const [Tipos, setTipos]=useState();
  const [Primera, setPrimera]=useState(true);
  const DatosAutocompletado = ["Matias", "Melissa"]

  if (Primera) {
    CargoPokemon(Pokemon);
    setPrimera(false);
  }
  function CargoPokemon (pPokemon){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pPokemon}/`)
    .then((res) => res.json())
    .then((data) => {
      setNombre(data.name)
      setNumero(data.id)
      CargoTipos(data.types)})
    .catch(function(error) {
      Alert.alert("El Pokémon no existe");
    });
  }
 
  function CargoTipos(pTipos){
    let AuxTexto = ""
    pTipos.forEach((tipo) => {
      AuxTexto = AuxTexto + "*" + Traducir(tipo.type.name)
    });
    setTipos(AuxTexto)
  }
  function Traducir(pIngles){
    switch (pIngles) {
      case "grass": return("Planta");
      case "water": return("Agua");
      case "fire": return("Fuego");
      case "poison": return("Veneno");
      case "fairy": return("Hada");
      case "flying": return("Volador");
      case "bug": return("Bicho");
      case "normal": return("Normal");
      case "electric": return("Eléctrico");
      case "ground": return("Tierra");
      case "fighting": return("Lucha");
      case "psychic": return("Psíquico");
      case "steel": return("Acero");
      case "rock": return("Piedra");
      case "ice": return("Hielo");
      case "ghost": return("Fantasma");
      case "dragon": return("Dragón");
      case "dark": return("Siniestro");
      default: return(pIngles);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../imagenes/fondo2.jpg')} resizeMode="cover" style={styles.imageBack}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
        <ScrollView>
          <KeyboardAvoidingView style={styles.keyboardView}>
            <View style={styles.unaLinea}>
              <PokeEntrada 
                style={styles.inputStyle}
                placeholder="Pokémon"
                autoCapitalize="none"
                onChangeText={(text) => setPokemon(text.trim())}
              />
              <PokeBoton 
                title="Buscar"
                btnColor="#5858FA"
                style={styles.button}
                customPress={() => CargoPokemon(Pokemon)}
              />
            </View>
            <View style={styles.cartaPrincipal}>
                <PokeTexto 
                  text={`N°: ${Numero} ${Nombre}`}
                  style={styles.text}
                />
                <PokeTexto 
                  text={`Tipo: ${Tipos}`}
                  style={styles.text}
                />
                <View style={styles.unaLinea}>
                  <PokeImagen 
                    source={{uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+ Numero +".png"}}
                    style={styles.image}
                  />
                  </View>
                
            </View>
            <View style={styles.unaLinea}>
              <PokeBotonImagen 
                title={`N°: ${Numero - 1}`}
                style={styles.botonImagen}
                imageWidth= {60}
                imagesHeight= {60}
                btnColor="#819FF7"
                source={{uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+(Numero - 1)+".png"}}
                customPress={() => CargoPokemon(Numero-1)}
              />
              <PokeBotonImagen 
                title={`N°: ${Numero + 1}`}
                style={styles.botonImagen}
                imageWidth= {80}
                imagesHeight= {80}
                btnColor="#819FF7"
                source={{uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+(Numero + 1)+".png"}}
                customPress={() => CargoPokemon(Numero+1)}
              />
            </View>
          
          </KeyboardAvoidingView>
        </ScrollView>
        </View>
      </View>
      </ImageBackground>
   </SafeAreaView>
  )
}

export default BuscarPokemon

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
  },
  generalView: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',

  },
  inputStyle: {
    width: 200, 
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    width: 100, 
    height: 50,
  },
  cartaPrincipal: {
    margin: 5,
    backgroundColor: "#819FF7",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    elevation: 5,
    width: 300, height: 250,
    borderWidth: 5,
    borderColor: '#d3d3d3',
  },
  image: {
    width: 150, height: 150,
  },
  unaLinea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonImagen: {
    margin: 5,
    backgroundColor: "#819FF7",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 5,
    borderColor: '#d3d3d3',
    
  },
  imageBack: {
    flex: 1,
    justifyContent: "center"
  },
})