import { StyleSheet } from 'react-native';
import UserProvider from './src/Context/UserContext';

//Importando a página de Rotas
import Rotas from './src/Rotas';

export default function App() {

    return (//O provider está abraçando todas as rotas do meu app, portanto o contexto está disponível para todos
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
