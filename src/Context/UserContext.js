import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()//Criei o contexto

function UserProvider({children}){//Estou provendo o contexto

    const [usuario, setUsuario] = useState(null)
    const [logado, setLogado] = useState(false)

    async function Login(CPF, senha) {
        if(CPF =='123' && senha ==='123'){//Salvando o usuário
            await AsyncStorage.setItem('usuario' , 'Valmir')
            setLogado(true)
        }
    }
    async function infoUsuario(){//Pegando o usuário
        const usuario = await AsyncStorage.getItem("usuario")
        if(usuario){//Se encontrou usuário, quer dizer que ele está logado
            setUsuario(usuario)
            setLogado(true)
        }
        setUsuario(usuario)
    }
    useEffect(()=>{//Ao carregar o usuário, irmeos pegar as informações dele
        infoUsuario()
    }, [])
    return(
        <UserContext.Provider value={{usuario: usuario , logado: logado, Login, infoUsuario}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;