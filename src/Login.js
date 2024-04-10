import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, StyleSheet, View, TouchableOpacity, Text, TextInput } from "react-native";
import {UserContext} from './Context/UserContext'

export default function Login(){//Recebendo o setLogado por parâmetro
    //Variável de estado que altera entre o Login e o Cadastro
    const [isRegistering, setIsRegistering] = useState(false);

    const [cadastroMedico, setCadastroMedico] = useState(false)

    const { erro } = useContext(UserContext)

    //Função que altera a variável
    const handleToggleRegister = () => {
        setIsRegistering(!isRegistering);
    };

    const cadastroMedicoFuncao = () =>{
        setCadastroMedico(!cadastroMedico)
    }

    //Controles do estados de login
    const [CPF, setCPF] = useState('')
    const [ senha, setSenha ] = useState('')

    //Controle dos estados de cadastro
    const [ nomeCadastro, setNomeCadastro ] = useState('')
    const [ telefoneCadastro, setTelefoneCadastro ] = useState('')
    const [ emailCadastro, setEmailCadastro ] = useState('')
    const [ idadeCadastro, setIdadeCadastro] = useState('')
    const [ sexoCadastro, setSexoCadastro] = useState('')
    const [tipoUsuario, setTipoUsuario] = useState('Paciente')
    const [senhaCadastro, setSenhaCadastro] = useState('')
    const [confirmSenhaCadastro, setConfirmSenhaCadastro] = useState('')

    //Controle dos estados de cadastro de médico
    const [ crmCadastro, setcrmCadastro] = useState('')
    const [ enderecoConsultorio, setEnderecoConsultorio] = useState('')

    const {Login} = useContext(UserContext)//Puxando a função de login
    const {CadastrarUsuario} = useContext(UserContext)

    async function realizaLogin(){
        Login(CPF,senha)//Chamando a função login e passando por parâmetro o CPF e a senha, para realizar o login
    }

    async function FuncaoCadastrar(){
        if(senhaCadastro === confirmSenhaCadastro){
            CadastrarUsuario(
                nomeCadastro, 
                telefoneCadastro, 
                emailCadastro, 
                CPF, 
                idadeCadastro, 
                sexoCadastro, 
                crmCadastro, 
                enderecoConsultorio, 
                tipoUsuario, 
                senhaCadastro
                )
            setNomeCadastro('');
            setTelefoneCadastro('');
            setEmailCadastro('');
            setIdadeCadastro('');
            setSexoCadastro('');
            setcrmCadastro('');
            setEnderecoConsultorio('');
            setIsRegistering(!isRegistering);
        }
        else{//QUANDO NÃO FOR IGUAL A SENHA

        }
    }

    return(
        <View style={style.container}>
            <Image
                source={require('../assets/img/Logo-2.png')}
                style={style.logo}
            />
            <View>
                <Text style={style.textErro}>{erro}</Text>
            </View>
            <View style={style.containerLogin}>
                <Image
                    source={require('../assets/img/User-Login.png')}
                />
                {cadastroMedico ? (
                    <>
                    <View style={style.containertitle}>
                        <Text style={style.title}>{isRegistering ? 'CADASTRO' : 'LOGIN'}</Text>
                        <Text style={style.title}>{cadastroMedico ? 'MÉDICO' : ''}</Text>
                    </View>
                    </>
                )
                    :
                    (
                        <>
                            <Text style={style.title}>{isRegistering ? 'CADASTRO' : 'LOGIN'}</Text>
                        </>
                    )
                }
            </View>
            <View style={style.containerInput}>
                {!isRegistering ? (
                    <>
                        <TextInput
                            placeholder="Insira seu CPF..."
                            keyboardType='numeric'
                            style={style.input}
                            value={CPF}
                            textInput={CPF} 
                            onChangeText={(digitado) => setCPF(digitado)}
                        />
                        <TextInput
                            placeholder="Insira sua senha..."
                            keyboardType='numeric'
                            style={style.input}
                            value={senha}
                            textInput={senha} 
                            onChangeText={(digitado) => setSenha(digitado)}
                        />
                    </>
                ) : (
                    <>
                        <View style={style.formCadastro}>
                            <View style={style.inputPair}>
                                <TextInput
                                    placeholder="Insira seu nome..."
                                    style={[style.input, style.inputCadastro]}
                                    value={nomeCadastro}
                                    textInput={nomeCadastro}
                                    onChangeText={(digitado)=> setNomeCadastro(digitado)} 
                                />
                                <TextInput
                                    placeholder="Insira seu telefone..."
                                    keyboardType= 'phone-pad'
                                    style={[style.input, style.inputCadastro]}
                                    value={telefoneCadastro}
                                    textInput={telefoneCadastro}
                                    onChangeText={(digitado)=> setTelefoneCadastro(digitado)} 
                                />
                            </View>
                            <View style={style.inputPair}>
                                <TextInput
                                    placeholder="Insira seu email..."
                                    keyboardType= 'email-address'
                                    style={[style.input, style.inputCadastro]}
                                    value={emailCadastro}
                                    textInput={emailCadastro}
                                    onChangeText={(digitado)=> setEmailCadastro(digitado)} 
                                />
                                <TextInput
                                    placeholder="Insira seu CPF..."
                                    keyboardType='numeric'
                                    style={[style.input, style.inputCadastro]}
                                    value={CPF}
                                    textInput={CPF} 
                                    onChangeText={(digitado) => setCPF(digitado)}
                                />
                            </View>
                            <View style={style.inputPair}>
                                <TextInput
                                    placeholder="Insira seu idade..."
                                    keyboardType='numeric'
                                    style={[style.input, style.inputCadastro]}
                                    value={idadeCadastro}
                                    textInput={idadeCadastro}
                                    onChangeText={(digitado)=> setIdadeCadastro(digitado)} 
                                />
                                <TextInput
                                    placeholder="Insira seu sexo..."
                                    style={[style.input, style.inputCadastro]}
                                    value={sexoCadastro}
                                    textInput={sexoCadastro}
                                    onChangeText={(digitado)=> setSexoCadastro(digitado)} 
                                />
                            </View>
                            <View style={style.inputPair}>
                                <TextInput
                                    placeholder="Insira sua senha..."
                                    style={[style.input, style.inputCadastro]}
                                    value={senhaCadastro}
                                    textInput={senhaCadastro}
                                    onChangeText={(digitado)=> setSenhaCadastro(digitado)} 
                                />
                                <TextInput
                                    placeholder="Confirme sua senha..."
                                    style={[style.input, style.inputCadastro]}
                                    value={confirmSenhaCadastro}
                                    textInput={confirmSenhaCadastro}
                                    onChangeText={(digitado)=> setConfirmSenhaCadastro(digitado)} 
                                />
                            </View>
                            {cadastroMedico 
                                ?
                                (
                                    <>
                                        <View style={style.inputPair}>
                                            <TextInput
                                                placeholder="Insira seu CRM..."
                                                keyboardType='numeric'
                                                style={[style.input, style.inputCadastro]}
                                                value={crmCadastro}
                                                textInput={crmCadastro}
                                                onChangeText={(digitado)=> setcrmCadastro(digitado)} 
                                                />
                                            <TextInput
                                                placeholder="Insira o endereço do consultório..."
                                                style={[style.input, style.inputCadastro]}
                                                value={enderecoConsultorio}
                                                textInput={enderecoConsultorio}
                                                onChangeText={(digitado)=> setEnderecoConsultorio(digitado)} 
                                                />
                                        </View>
                                    </>
                                )

                                :
                                (
                                    <>
                                    </>
                                )
                            }
                            <TouchableOpacity onPress={cadastroMedicoFuncao}>
                                    <Text style={style.registerLink}>{!cadastroMedico ? 'Sou Médico!' : 'Sou Paciente!'}</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
                <TouchableOpacity onPress={handleToggleRegister}>
                    <Text style={style.registerLink}>{isRegistering ? 'Já tenho uma conta!' : 'Não tenho uma conta!'}</Text>
                </TouchableOpacity>
                {!isRegistering && (
                    <TouchableOpacity style={style.btn} onPress={realizaLogin}>
                        <Text style={style.btnText}>ENTRAR</Text>
                    </TouchableOpacity>
                )}
                {isRegistering && (
                    <TouchableOpacity style={style.btn} onPress={FuncaoCadastrar}>
                        <Text style={style.btnText}>CADASTRAR</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        width: '100%'
    },
    logo: {
        width: 250,
        height: 90,
        marginBottom: 70,
        marginTop: 100
    },
    containerLogin: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20,
        width: '50%'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    input: {
        width: '100%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        height: 50
    },
    containerInput: {
        width: '80%',
    },
    btn: {
        width: "70%",
        height: 50,
        borderRadius: 10,
        backgroundColor: "#00975C",
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    btnText:{
        lineHeight: 45,
        color: "white",
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        alignContent: "center",
        fontSize: 25,
        fontWeight: "bold"  
    },
    registerLink: {
        marginTop: 10,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        color: 'blue'
    },
    formCadastro: {
        width: '100%',
    },
    inputPair: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    inputCadastro: {
        width: '49%', // Ajuste a largura para acomodar o texto completo do placeholder
    },
    containertitle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textErro: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'red',
    }
})