import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserProvider from './src/Context/UserContext';

//Importando a página de Rotas
import Rotas from './src/Rotas';

const Tab = createBottomTabNavigator();

export default function App() {

    return (
        <UserProvider>
            <Rotas/>
        </UserProvider>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
