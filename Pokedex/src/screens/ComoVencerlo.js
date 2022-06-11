import React, { useState, useEffect } from "react";
import {StyleSheet, View, SafeAreaView, FlatList, Alert, KeyboardAvoidingView, Keyboard, ImageBackground, TouchableWithoutFeedback} from "react-native";
import PokeTexto from '../components/PokeTexto';
import PokeEntrada from '../components/PokeEntrada';
import PokeBoton from '../components/PokeBoton';
import PokeImagen from '../components/PokeImagen';

import DatabaseConnection from "../database/database-connection";
const db = DatabaseConnection.getConnection();

const ComoVencerlo = () => {
  const [Busqueda, setBusqueda] = useState()
  const [Pokemon, setPokemon]=useState(25);
  const [Nombre, setNombre]=useState("");
  const [Numero, setNumero]=useState();
  const [Tipos, setTipos]=useState([]);
  const [equipo, setEquipo] = useState([]);
  
  useEffect(() => {
    CargoPokemon(Pokemon);
  }, [Pokemon]);
     
  function CambioPokemon (pBusqueda){
    setEquipo([])
    setPokemon(pBusqueda);
  }
  function CargoPokemon (pPokemon){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pPokemon}/`)
        .then((res) => res.json())
        .then((data) => {
      setNombre(data.name)
      setNumero(data.id)
      CargoTipos(data.types)
      CargoEquipoRecomendado(data.types)})
      .catch(function(error) {
        Alert.alert("El Pokémon no existe");
      });
  }
  function CargoEquipoRecomendado(pTipos) {
    pTipos.forEach((tipo)=>{
      let Debilidades = esDebil(tipo.type.name);
      Debilidades.forEach((debilidad)=>{
        CargoEquipo(debilidad);
      });
    });
  }
  function CargoEquipo(pDebilidad){
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM pokemons`, [], (tx, results) => {
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
          temp.forEach((unPoke)=>{
            devuelvoPokemon(unPoke.nombre, pDebilidad);
          })
        }});
    });
  }
  function devuelvoPokemon(pPokemon, pDebilidad){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pPokemon}/`)
        .then((res) => res.json())
        .then((data) => {
          let auxTipos = data.types;
          auxTipos.forEach((unTipo)=>{
            if (unTipo.type.name == pDebilidad) {
              TesteoRepetidos(data.name, data.id);
            }
          })
        });
  }
  function TesteoRepetidos(pNombre, pNumero){
    if (equipo.length >= 0) {
      setEquipo([])
    }
    let auxEquipo = equipo;
    let existe = "no"
    auxEquipo.forEach((unPoke)=>{
      if (unPoke.numero == pNumero) {
        existe = "si"
      }
    })
    if (existe == "no"){
      auxEquipo.push({numero:pNumero, nombre:pNombre});
    }
    setEquipo(auxEquipo);
  }
  function CargoTipos(pTipos){
    setTipos([]);
    let temp = []; 
    let aux = 0;
    pTipos.forEach((tipo) => {
      temp.push({texto: "Tipo: "+Traducir(tipo.type.name), id:aux});
      aux += 1;
      let cadenaDebil = "";
      let Debilidades = esDebil(tipo.type.name);
      Debilidades.forEach((unDebil) =>{
        cadenaDebil = cadenaDebil + " " + Traducir(unDebil)
      })
      temp.push({texto:"Débil contra:"+cadenaDebil, id:aux});
      aux += 1;
    });
    setTipos(temp);
  }
  function esDebil (pIngles){
    switch (pIngles) {
      case "grass": return(["fire", "ice", "poison", "flying", "bug"]);
      case "water": return(["grass", "electric"]);
      case "fire": return(["water", "ground", "rock"]);
      case "poison": return(["ground", "psychic"]);
      case "fairy": return(["poison", "steel"]);
      case "flying": return(["electric", "ice", "rock"]);
      case "bug": return(["flying", "rock", "fire"]);
      case "normal": return(["fighting"]);
      case "electric": return(["ground"]);
      case "ground": return(["water", "grass", "ice"]);
      case "fighting": return(["flying", "psychic", "fairy"]);
      case "psychic": return(["bug", "ghost", "dark"]);
      case "steel": return(["fire", "fighting", "ground"]);
      case "rock": return(["water", "grass", "fighting", "ground", "steel"]);
      case "ice": return(["fire", "fighting", "rock", "steel"]);
      case "ghost": return(["ghost", "dark"]);
      case "dragon": return(["ice", "dragon", "fairy"]);
      case "dark": return(["fighting", "bug", "fairy"]);
      default: return(pIngles);
    }
  }
  const listoTiposView = (item) => {
    return (
      <View key={item.id} style={styles.listoTiposView}>
        <PokeTexto 
          text={item.texto}
          style={styles.text2}
        />
      </View>
    );
  };
  const listoEquipoView = (item) => {
    return (
      <View style={styles.listoEquipoView}>
        <PokeTexto 
          text={item.nombre}
          style={styles.text}
         />
        <PokeImagen 
          source={{uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+Math.trunc(item.numero)+".png"}}
          style={styles.image2}
        />
      </View>
    );
  };
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
      case "rock": return("Roca");
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
          <KeyboardAvoidingView style={styles.keyboardView}>
            <View style={styles.unaLinea}>
              <PokeEntrada 
                style={styles.inputStyle}
                placeholder="Pokémon"
                autoCapitalize="none"
                onChangeText={(text) => setBusqueda(text.trim())}
              />
              <PokeBoton 
                title="Buscar"
                btnColor="#5858FA"
                style={styles.button}
                customPress={() => CambioPokemon(Busqueda)}
              />
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.cartaPrincipal}>
                <PokeTexto 
                  text={Nombre}
                  style={styles.text}
                />
                <PokeImagen 
                  source={{uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+Numero+".png"}}
                  style={styles.image}
                />
              <FlatList
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={Tipos}
                  renderItem={({ item }) => listoTiposView(item)}
                />
            </View>
            </TouchableWithoutFeedback>
            <FlatList
              numColumns={2}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={equipo}
              renderItem={({ item }) => listoEquipoView(item)}
            />
          </KeyboardAvoidingView>
        </View>
      </View>
      </ImageBackground>
   </SafeAreaView>
  )
}

export default ComoVencerlo

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
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  text2: {
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  inputStyle: {
    width: 200, 
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
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
    width: 300, 
    borderWidth: 5,
    borderColor: '#d3d3d3',
  },
  image: {
    width: 150, height: 150,
  },
  cartaSecundaria: {
    margin: 5,
    backgroundColor: "grey",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 120, height: 120,
    borderWidth: 5,
    borderColor: '#11009E',
  },
  image2: {
    width: 80, height: 80,
  },
  unaLinea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonImagen: {

  },
  listoTiposView: {

  },
  listoEquipoView: {
    margin: 5,
    backgroundColor: "#819FF7",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 5,
    width: 130, 
    borderWidth: 5,
    borderColor: '#d3d3d3',
  },
  imageBack: {
    flex: 1,
    justifyContent: "center"
  },
})