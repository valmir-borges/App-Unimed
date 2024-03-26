import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, StyleSheet, View, TouchableOpacity, Text, TextInput } from "react-native";

export default function Login({setLogado}){//Recebendo o setLogado por parâmetro
    //Variável de estado que altera entre o Login e o Cadastro
    const [isRegistering, setIsRegistering] = useState(false);

    const [cadastroMedico, setCadastroMedico] = useState(false)

    //Função que altera a variável
    const handleToggleRegister = () => {
        setIsRegistering(!isRegistering);
    };

    const cadastroMedicoFuncao = () =>{
        setCadastroMedico(!cadastroMedico)
    }

    const [CPF, setCPF] = useState('')
    const [ senha, setSenha ] = useState('')

    async function realizaLogin(){
        if( CPF == '123' && senha =='123'){
            await AsyncStorage.setItem("usuario", CPF);
            setLogado(true)
        }
        else{
            setLogado(false)
        }
    }
    return(
        <View style={style.container}>
            <Image
                source={require('../assets/img/Logo.png')}
                style={style.logo}
            />
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
                                />
                                <TextInput
                                    placeholder="Insira seu telefone..."
                                    keyboardType= 'phone-pad'
                                    style={[style.input, style.inputCadastro]}
                                />
                            </View>
                            <View style={style.inputPair}>
                                <TextInput
                                    placeholder="Insira seu email..."
                                    keyboardType= 'email-address'
                                    style={[style.input, style.inputCadastro]}
                                />
                                <TextInput
                                    placeholder="Insira seu CPF..."
                                    keyboardType='numeric'
                                    style={[style.input, style.inputCadastro]}
                                />
                            </View>
                            <View style={style.inputPair}>
                                <TextInput
                                    placeholder="Insira seu idade..."
                                    keyboardType='numeric'
                                    style={[style.input, style.inputCadastro]}
                                />
                                <TextInput
                                    placeholder="Insira seu sexo..."
                                    style={[style.input, style.inputCadastro]}
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
                                            />
                                            <TextInput
                                                placeholder="Insira o endereço do consultório..."
                                                style={[style.input, style.inputCadastro]}
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
                    <TouchableOpacity style={style.btn}>
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
        marginBottom: 70
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
        fontWeight: 'bold'
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
    }
})
