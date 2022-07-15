import React from 'react'
import {StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView, ImageBackground} from "react-native";
import { useState, useEffect} from "react";
import PokeTexto from '../components/PokeTexto';
import PokeImagen from '../components/PokeImagen';
import PokeBotonImagen from '../components/PokeBotonImagen';
import SearchableDropdown from 'react-native-searchable-dropdown';


const BuscarPokemon = () => {
  const [Pokemon, setPokemon]=useState(5);
  const [Nombre, setNombre]=useState("");
  const [Numero, setNumero]=useState(5);
  const [Tipos, setTipos]=useState();
  const [serverData, setServerData] = useState([]);
  useEffect(() => {
    CargoPokemon(Pokemon);
    fetch('https://pokeapi.co/api/v2/pokemon?limit=898')
      .then(response => response.json())
      .then(json => {
        setServerData(json.results);
      }
      );
      
  }, []);
  function CargoPokemon (pPokemon){
    setPokemon(pPokemon);
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
              <SearchableDropdown
                onTextChange={(text) => console.log(text)}
                //On text change listner on the searchable input
                onItemSelect={(item) => CargoPokemon(item.name)}
                //onItemSelect called after the selection from the dropdown
                containerStyle={{ padding: 5 }}
                //suggestion container style
                textInputStyle={{
                  //inserted text style
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  backgroundColor: '#FAF7F6',
                }}
                itemStyle={{
                  //single dropdown item style
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#FAF9F8',
                  borderColor: '#bbb',
                  borderWidth: 1,
                }}
                itemTextStyle={{
                  //text style of a single dropdown item
                  color: '#222',
                }}
                itemsContainerStyle={{
                  //items container style you can pass maxHeight
                  //to restrict the items dropdown hieght
                  maxHeight: '50%',
                }}
                items={serverData}
                //mapping of item array
                defaultIndex={1}
                //default selected item index
                placeholder="Pokemon"
                //place holder for the search input
                resetValue={false}
                //reset textInput Value with true and false state
                underlineColorAndroid="transparent"
                //To remove the underline from the android input
              />
              <View style={[{justifyContent: 'center'}, {alignItems: 'center'} ]}>
                <View style={styles.cartaPrincipal}>
                  <PokeTexto 
                    text={`N°: ${Numero} ${Nombre}`}
                    style={styles.text}
                  />
                  <PokeTexto 
                    text={`Tipo: ${Tipos}`}
                    style={styles.text}
                  />
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
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',

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
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 8,
  },
})