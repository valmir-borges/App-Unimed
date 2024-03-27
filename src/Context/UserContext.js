import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()//Criei o contexto

function UserProvider({children}){//Estou provendo o contexto

    const [usuario, setUsuario] = useState();
    const [logado, setLogado] = useState(false);

    const [cpfContexto, setCpfContexto] = useState('');
    
    const [usuarioNome, setUsuarioNome] = useState('')

    async function Login(CPF, senha) {
        try {
            const usuarioSalvoString = await AsyncStorage.getItem(`usuario_${CPF}`);
            setCpfContexto(CPF)
            if (usuarioSalvoString !== null) {//Se o que retornar for diferente de nulo, ou seja, retornou algo
                //Convertendo a string do AsyncStorage em um objetoJs
                const usuarioSalvoArray = JSON.parse(usuarioSalvoString);

                //Porém esse objeto retorna dentro de uma array com um único índice, portanto temos que pegar o primeiro
                //Verificação
                if (usuarioSalvoArray.cpf === CPF && usuarioSalvoArray.senha === senha) {
                    // Definir o estado logado como true
                    setLogado(true);
                } else {
                    // Se as credenciais não forem válidas, realizar ações adequadas (por exemplo, exibir uma mensagem de erro)
                    console.log('Credenciais inválidas');
                }
            } else {
                // Se o usuário não for encontrado, exibir mensagem de erro ou tomar a ação apropriada
                console.log('Usuário não encontrado');
            }
        } catch (error) {
            // Lidar com possíveis erros ao acessar AsyncStorage
            console.error("Erro ao acessar AsyncStorage:", error);
        }
    }
    async function infoUsuario() {
        try {
            const usuarioSalvoString = await AsyncStorage.getItem(`usuario_${cpfContexto}`);
            const usuarioSalvoObjeto = JSON.parse(usuarioSalvoString);

            // Se ele retornou algo, quer dizer que tem o usuário
            if (usuarioSalvoString) {
            setUsuario(usuarioSalvoObjeto);
            setLogado(true);

            // Remove chaves, espaços em branco e aspas usando replace
            const limpo = usuarioSalvoString.replace(/[{}"]/g, '');

            // Divida a string pelo separador ','
            const partes = limpo.split(',');

            // Encontre a parte que contém "nome"
            let usuarioNome;
            partes.forEach(item => {
                const [chave, valor] = item.split(':').map(str => str.trim()); // Remove espaços em branco
                if (chave === 'nome') {
                usuarioNome = valor;
                }
            });

            // Defina o valor de usuarioNome
            if (usuarioNome) {
                setUsuarioNome(usuarioNome);
            }
            }
                //Se não encontrar o usuário quer dizer que não está cadastrado
            else {
                console.log("Nenhum dado encontrado para o usuário."); // Adicionar uma mensagem de log para indicar que nenhum dado foi encontrado para o usuário
            }
            //Erro do try catch
        } catch (error) {
            console.error('Erro ao obter informações do usuário:', error);
        }
    }
    
    useEffect(() => {
        infoUsuario();
    }, [cpfContexto]);
    

    async function CadastrarUsuario(nomeCadastro, telefoneCadastro, emailCadastro, CPF, idadeCadastro, sexoCadastro, crmCadastro, enderecoConsultorio, tipoUsuario, senhaCadastro){
        if(crmCadastro != '' && enderecoConsultorio != ''){
            tipoUsuario = 'Medico'
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
        await AsyncStorage.setItem(`usuario_${CPF}`, JSON.stringify( novoUsuario));
        //Interpolei string para que cada usuário seja único
    }
    return(
        <UserContext.Provider value={{usuario: usuario, usuarioNome: usuarioNome , logado: logado, Login, infoUsuario, CadastrarUsuario }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;