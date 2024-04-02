import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
    const [usuario, setUsuario] = useState();
    const [logado, setLogado] = useState(false);
    const [cpfContexto, setCpfContexto] = useState('');
    const [usuarioNome, setUsuarioNome] = useState('');
    const [erro, setErro] = useState(null); // Estado para armazenar erros

    async function Login(CPF, senha) {
        try {
            const usuarioSalvoString = await AsyncStorage.getItem(`usuario_${CPF}`);
            
            setCpfContexto(CPF)
            if (usuarioSalvoString !== null) {
                const usuarioSalvoObjeto = JSON.parse(usuarioSalvoString);

                if (usuarioSalvoObjeto.cpf === CPF && usuarioSalvoObjeto.senha === senha) {
                    setLogado(true);
                } else {
                    setErro('Credenciais inválidas');
                }
                
            } else {
                setErro('Usuário não encontrado');
            }
        } catch (error) {
            console.error("Erro ao acessar AsyncStorage:", error);
            setErro('Erro ao acessar AsyncStorage');
        }
    }

    async function infoUsuario() {
        try {
            const usuarioSalvoString = await AsyncStorage.getItem(`usuario_${cpfContexto}`);
            const usuarioSalvoObjeto = JSON.parse(usuarioSalvoString);
            if (usuarioSalvoString) {
                setUsuario(usuarioSalvoObjeto);
            } 
            else 
            {
                console.log('Nenhum dado encontrado para o usuário')
            }
        } catch (error) {
            console.error('Erro ao obter informações do usuário:', error);
            setErro('Erro ao obter informações do usuário'); // Definir o erro
        }
    }

    useEffect(() => {
        infoUsuario();
    }, [cpfContexto]);

    async function CadastrarUsuario(nomeCadastro, telefoneCadastro, emailCadastro, CPF, idadeCadastro, sexoCadastro, crmCadastro, enderecoConsultorio, tipoUsuario, senhaCadastro) {
        if (crmCadastro != '' && enderecoConsultorio != '') {
            tipoUsuario = 'Medico';
        }
        const novoUsuario = {
            nome: nomeCadastro,
            telefone: telefoneCadastro,
            email: emailCadastro,
            cpf: CPF,
            idade: idadeCadastro,
            sexo: sexoCadastro,
            crm: crmCadastro,
            enderecoConsultorio: enderecoConsultorio,
            tipoUsuario: tipoUsuario,
            senha: senhaCadastro
        };
        await AsyncStorage.setItem(`usuario_${CPF}`, JSON.stringify(novoUsuario));
    }

    return (
        <UserContext.Provider value={{ usuario: usuario, logado: logado, Login, infoUsuario, CadastrarUsuario, erro }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
