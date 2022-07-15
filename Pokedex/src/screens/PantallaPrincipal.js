import React, {useEffect} from "react";
import { StyleSheet, ImageBackground, View, SafeAreaView } from 'react-native'
import PokeBoton from '../components/PokeBoton'

import DatabaseConnection from "../database/database-connection";
const db = DatabaseConnection.getConnection();

const PantallaPrincipal = ({ navigation }) => {
  
  useEffect(() => {
    db.transaction( (txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='pokemons'",
        [],
         (tx, res) =>{
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS pokemons', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS pokemons(poke_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(20), numero VARCHAR(40))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../imagenes/fondo1.jpg')} resizeMode="cover" style={styles.imageBack}>
        <View style={styles.viewContainer}>
            <View style={styles.generalView}>
                <View style={styles.generalView}>
                    <PokeBoton 
                    style={styles.button}
                    title="Buscar Pokemon"
                    btnColor="#FF0000"
                    customPress={() => navigation.navigate("BuscarPokemon")}
                    />
                    <PokeBoton 
                    style={styles.button}
                    title="Como Vencerlo?"
                    btnColor="#FF0000"
                    customPress={() => navigation.navigate("ComoVencerlo")}
                    />
                    <PokeBoton 
                    style={styles.button}
                    title="Mi Equipo"
                    btnColor="#FF0000"
                    customPress={() => navigation.navigate("MiEquipo")}
                    />
                    
                </View>
            </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default PantallaPrincipal

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
      },
      imageBack: {
        flex: 1,
        justifyContent: "center"
      },
      button: {
        width: 200, 
        height: 80,
      },
})