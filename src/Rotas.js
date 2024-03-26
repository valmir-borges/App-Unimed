import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './Context/UserContext';

//Importando as páginas
import Home from './Home'
import Dados from './Dados'
import Consultas from './Consultas'
import Campanhas from './Campanhas'
import Login from './Login'

const Tab = createBottomTabNavigator();

export default function Rotas(){

    const {logado} = useContext(UserContext)

    if(logado == false){
        return( <Login/> )
    }
    return(
        <NavigationContainer>
                <Tab.Navigator initialRouteName='Home'>
                    <Tab.Screen 
                    name="Home" 
                    component={Home} 
                    options={{
                        tabBarIcon: (tabInfo) => {
                            return (<Ionicons
                            name="home"
                            size={24}
                            color={tabInfo.focused ? "#006600" : "#8e8e93"}
                        />)
                        }
                    }}
                    />
                    <Tab.Screen 
                    name="Dados" 
                    component={Dados}
                    options={{
                        tabBarIcon: (tabInfo) => {
                            return (<Entypo
                            name="user"
                            size={24}
                            color={tabInfo.focused ? "#006600" : "#8e8e93"}
                        />)
                        }
                    }}
                    />
                    <Tab.Screen 
                    name="Consultas" 
                    component={Consultas}
                    options={{
                        tabBarIcon: (tabInfo) => {
                            return (<Ionicons
                            name="calendar"
                            size={24}
                            color={tabInfo.focused ? "#006600" : "#8e8e93"}
                        />)
                        }
                    }}
                    />
                    <Tab.Screen 
                    name="Campanhas" 
                    component={Campanhas} 
                    options={{
                        tabBarIcon: (tabInfo) => {
                            return (<Ionicons
                            name="newspaper"
                            size={24}
                            color={tabInfo.focused ? "#006600" : "#8e8e93"}
                        />)
                        }
                    }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
    )
}