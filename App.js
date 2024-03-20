import 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';

//Importando as páginas
import Home from './src/Home'
import Dados from './src/Dados'
import Consultas from './src/Consultas'
import Campanhas from './src/Campanhas'
import Login from './src/Login'

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
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
                <Tab.Screen 
                name="Login" 
                component={Login} 
                options={{
                    tabBarIcon: (tabInfo) => {
                        return (<Ionicons
                        name=""
                        size={24}
                        color={tabInfo.focused ? "#006600" : "#8e8e93"}
                      />)
                    }
                }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
