import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

import PantallaPrincipal from "../screens/PantallaPrincipal";
import BuscarPokemon from "../screens/BuscarPokemon";
import MiEquipo from "../screens/MiEquipo";
import ComoVencerlo from "../screens/ComoVencerlo";

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="PantallaPrincipal">
                    <Stack.Screen 
                    name="Inicio" 
                    component={PantallaPrincipal} 
                    options={{
                        title: "Pokedex",
                        headerStyle: {
                            backgroundColor: "#B40404"
                        },
                        headerTintColor: "#FFFF00",
                        headerTitleStyle: {
                            color: 'yellow',
                            textShadowColor: 'blue',
                            textShadowOffset: { width: 5, height: 5 },
                            textShadowRadius: 5,
                            fontSize: 25,
                        }
                    }}/>
                    <Stack.Screen 
                    name="BuscarPokemon" 
                    component={BuscarPokemon} 
                    options={{
                        headerStyle: {
                            backgroundColor: "#B40404"
                        },
                        headerTintColor: "#FFFF00",
                        headerTitleStyle: {
                            color: 'yellow',
                            textShadowColor: 'blue',
                            textShadowOffset: { width: 5, height: 5 },
                            textShadowRadius: 5,
                            fontSize: 25,
                        }
                    }}/>
                    <Stack.Screen 
                    name="MiEquipo" 
                    component={MiEquipo} 
                    options={{
                        title: "Mi Equipo",
                        headerStyle: {
                            backgroundColor: "#B40404"
                        },
                        headerTintColor: "#FFFF00",
                        headerTitleStyle: {
                            color: 'yellow',
                            textShadowColor: 'blue',
                            textShadowOffset: { width: 5, height: 5 },
                            textShadowRadius: 5,
                            fontSize: 25,
                        }
                    }}/>
                    <Stack.Screen 
                    name="ComoVencerlo" 
                    component={ComoVencerlo} 
                    options={{
                        title: "Como Vencerlo",
                        headerStyle: {
                            backgroundColor: "#B40404"
                        },
                        headerTintColor: "#FFFF00",
                        headerTitleStyle: {
                            color: 'yellow',
                            textShadowColor: 'blue',
                            textShadowOffset: { width: 5, height: 5 },
                            textShadowRadius: 5,
                            fontSize: 25,
                        }
                    }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStack;