import React, { useState, useEffect } from "react";
import {StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, FlatList, ImageBackground} from "react-native";
import PokeBoton from '../components/PokeBoton';
import PokeBotonImagen from '../components/PokeBotonImagen';
import DatabaseConnection from "../database/database-connection";
import SearchableDropdown from 'react-native-searchable-dropdown';
const db = DatabaseConnection.getConnection();

const MiEquipo = () => {
    const [pokemon, setPokemon]= useState('');
    const [pokemons, setPokemons] = useState([]);
    const [serverData, setServerData] = useState([]);

    useEffect(() => {
      cargoLista();
      fetch('https://pokeapi.co/api/v2/pokemon?limit=898')
        .then(response => response.json())
        .then(json => {
          setServerData(json.results);
        }
        );
    }, []);
    const cargoLista = () => {
      setPokemons([]);
      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM pokemons`, [], (tx, results) => {
          if (results.rows.length > 0) {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
              setPokemons(temp);
          }});
      });
    }
    const listItemView = (item) => {
      return (
        <View style={styles.listItemView}>
          <PokeBotonImagen 
              title={item.nombre}
              style={styles.botonImagen}
              imageWidth= {50}
              imagesHeight= {50}
              btnColor="819FF7"
              source={{uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+Math.trunc(item.numero)+".png"}}
              customPress={() => borrarPokemon(item.nombre)}
            />
        </View>
      );
    };
    const esEquipo = (pNombre, pNumero) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM pokemons WHERE nombre = ?",
            [pNombre],
            (tx, results) => {
              if (results.rows.length > 0) {
                Alert.alert("El Pokemon ya esta en el Equipo");
              } else {
                agregarPokemon(pNombre, pNumero);
                cargoLista();
              }
            }
          );
        });
      };
    function CargoPokemon (pPokemon){
      setPokemon(pPokemon);
        fetch(`https://pokeapi.co/api/v2/pokemon/${pPokemon}/`)
        .then((res) => res.json())
        .then((data) => {
          Alert.alert(`Agregar al equipo ${pPokemon}`, "Esta seguro?", [
            {
              text: "SI",
              onPress() {
                esEquipo(data.name, data.id)
              },
            },
            {
              text: "No",
            },
          ]);
        })
          .catch(function(error) {
            Alert.alert("El Pokémon no existe");
        });
    }      
    const agregarPokemon = (pNombre, pNumero) => {
        db.transaction((tx) => {
          tx.executeSql(
            `INSERT INTO pokemons (nombre, numero) VALUES (?, ?)`,
            [pNombre, pNumero],
            (tx, results) => {
              // validar resultado
              if (results.rowsAffected > 0) {
                Alert.alert("Exito", "Pokemon agregado al equipo!!!",
                  [{text: "Ok",},],
                  { cancelable: false }
                );
              } else {
                Alert.alert("Error al agregar el Pokemon");
              }
            }
          );
        });
      };
    const borrarPokemon = (pNombre) => {
      Alert.alert("Quitar del equipo", "Esta seguro?", [
        {
          text: "SI",
          onPress() {
            db.transaction((tx) => {
              tx.executeSql(
                `DELETE FROM pokemons WHERE nombre = ?`,
                [pNombre],
                (tx, results) => {
                  // validar resultado
                  if (results.rowsAffected > 0) {
                    Alert.alert("Pokemon Eliminado");
                    cargoLista();
                  } else {
                    Alert.alert("El Pokemon no esta en el equipo");
                  }
                }
              );
            });
          },
        },
        {
          text: "No",
        },
      ]);
        
      };
     const limpiarEquipo = () => {
      Alert.alert("Eliminar el equipo completo", "Esta seguro?", [
        {
          text: "SI",
          onPress() {
            db.transaction( (txn) => {
              txn.executeSql('DELETE FROM pokemons', [], (tx, results) => {
                // validar resultado
                if (results.rowsAffected > 0) {
                  Alert.alert("Equipo Eliminado");
                  setPokemons([]);
                  cargoLista();
                } else {
                  Alert.alert("Error eliminar");
                }
              });
            });
          },
        },
        {
          text: "No",
        },
      ]);
      
      }
  return (
    <SafeAreaView style={styles.container}>
     <ImageBackground source={require('../imagenes/fondo2.jpg')} resizeMode="cover" style={styles.imageBack}>
        <View style={styles.viewContainer}>
        <KeyboardAvoidingView >
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
           <FlatList
              numColumns={2}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={pokemons}
              renderItem={({ item }) => listItemView(item)}
            />
            <View style={[{justifyContent: 'center'}, {alignItems: 'center'} ]}>
              <PokeBoton 
                title="Eliminar Equipo"
                btnColor="#FE642E"
                style={styles.button}
                customPress={() => limpiarEquipo()}
              />
            </View>
          </View>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default MiEquipo

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
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
  button: {
    width: 200, 
    height: 50,
  },
  listItemView: {
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
  botonImagen: {
    width: 110,
    height: 80,
  },
  imageBack: {
    flex: 1,
    justifyContent: "center"
  },

})