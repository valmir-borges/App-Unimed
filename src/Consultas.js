import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


export default function Consultas(){

    const [cadastrarConsulta, setCadastrarConsulta] = useState(false);
    const [tipoConsulta, setTipoConsulta] = useState('');
    const [nomeMedico, setNomeMedico] = useState('');
    const [dataConsulta, setDataConsulta] = useState('');
    const [horaConsulta, setHoraConsulta] = useState('');
    const [observacao, setObservacao] = useState('');
    const [data, setData] = useState([]);

    const flatListRef = useRef(null);

    const renderItem = ({ item, index }) => (
        <LinearGradient
        colors={['#F5F5F5', '#1AD990']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={style.boxConsulta}
      >
        <TouchableOpacity onPress={() => excluirConsulta(index)} style={style.deleteIcon}>
            <FontAwesome5 name="trash" size={30} color="black" />        
        </TouchableOpacity>
        <Image source={require('../assets/img/Medico.png')} style={style.medicoImage}/>
        <View style={style.bottomTextContainer}>
          <View style={style.column}>
            <Text style={style.leftText}>Tipo de consulta:</Text>
            <Text style={style.leftText}>Médico:</Text>
            <Text style={style.leftText}>Data:</Text>
            <Text style={style.leftText}>Hora:</Text>
            <Text style={style.leftText}>Observação:</Text>
          </View>
          <View style={style.column}>
            <Text style={style.rightText}>{item.tipo}</Text>
            <Text style={style.rightText}>{item.nomeMedico}</Text>
            <Text style={style.rightText}>{item.data}</Text>
            <Text style={style.rightText}>{item.hora}</Text>
            <Text style={style.rightText}>{item.observacao}</Text>
          </View>
        </View>
      </LinearGradient>
    );
    
    function excluirConsulta(index) {
        const newData = [...data];
        newData.splice(index, 1); // Remove o item do array na posição index
        setData(newData); // Atualiza o estado do array de consultas
    }

    function alternarCadastroConsulta(){
        setCadastrarConsulta(!cadastrarConsulta);
    }

    function cadastrarConsultaFuncao(){
        const novaConsulta = {//Criando o objeto novaConsulta, para que ele seja inserido no array de data
            tipo: tipoConsulta,
            nomeMedico: nomeMedico,
            data: dataConsulta,
            hora: horaConsulta,
            observacao: observacao
        };
        setData([...data, novaConsulta]);//Setando no array data a nova consulta
        alternarCadastroConsulta(); // fechar o formulário de cadastro após o cadastro
    }

    return(
        <View style={style.container}>
            {cadastrarConsulta ? 
            (
                //Condição verdadeira, ou seja, clicou em cadastrar
                <>
                    <TouchableOpacity onPress={alternarCadastroConsulta} style={style.backConsultas}>
                        <AntDesign name="back" size={40} color="black" />
                    </TouchableOpacity>
                    <Image
                        source={require('../assets/img/Logo.png')}
                        style={style.logo}
                    />
                    <View style={style.headerConsultas}>
                        <FontAwesome5 name="calendar-day" size={60} color="#00975C" />              
                        <Text style={style.headerText}>AGENDAR NOVA CONSULTA</Text>
                    </View>
                    <View style={style.formCadastro}>
                            <TextInput
                                placeholder="Insira o tipo de consulta..."
                                style={[style.input, style.inputCadastro]}
                                value={tipoConsulta}
                                onChangeText={setTipoConsulta}
                            />
                            <TextInput
                                placeholder="Insira o nome do médico..."
                                style={[style.input, style.inputCadastro]}
                                value={nomeMedico}
                                onChangeText={setNomeMedico}
                            />
                            <TextInput
                                placeholder="Dia da consulta..."
                                keyboardType= 'phone-pad'
                                style={[style.input, style.inputCadastro]}
                                value={dataConsulta}
                                onChangeText={setDataConsulta}
                            /> 
                            <TextInput
                                placeholder="Hora da consulta..."
                                keyboardType= 'phone-pad'
                                style={[style.input, style.inputCadastro]}
                                value={horaConsulta}
                                onChangeText={setHoraConsulta}
                            /> 
                            <TextInput
                                placeholder="Observação..."
                                keyboardType= 'phone-pad'
                                style={[style.input, style.inputCadastro]}
                                value={observacao}
                                onChangeText={setObservacao}
                            />
                            <TouchableOpacity style={style.btn} onPress={cadastrarConsultaFuncao}>
                                <Text style={style.btnText}>AGENDAR</Text>
                            </TouchableOpacity>
                    </View>
                </>
            )
            :
            (
                //Condição falsa, ou seja, não clicou em cadastrar
                <>
                    <Image
                        source={require('../assets/img/Logo.png')}
                        style={style.logo}
                    />
                    <View style={style.headerConsultas}>
                        <FontAwesome5 name="calendar-day" size={60} color="#00975C" />              
                        <Text style={style.headerText}>SUAS CONSULTAS</Text>
                    </View>
                    {data == '' ?//Se o array de dados estiver vazio, vai aparecer uma mensagem
                        (
                            <>
                                <View style={style.noConsultasContainer}>
                                    <Text style={style.textNoConsultas}>Você não tem consultas!</Text>
                                </View>                            
                            </>
                        )
                        :
                        (
                            <>
                            </>
                        )
                    }
                    <FlatList
                        data={data}
                        ref={flatListRef}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        style={style.flatList}
                        contentContainerStyle={style.flatListConsultas}
                    />
                    <View style={style.containerNewConsulta}>
                        <Text style={style.newConsultaText}>DESEJA AGENDAR UMA NOVA CONSULTA ?</Text>
                        <TouchableOpacity style={style.btn} onPress={alternarCadastroConsulta}>
                            <Text style={style.btnText}>AGENDAR</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )
            }
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: '100%'
    },
    logo: {
        width: 250,
        height: 90,
        marginTop: 20
    },
    headerConsultas: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
        marginTop: 20,
        width: '60%'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    boxConsulta: {
        backgroundColor: '#00975C',
        width: 310,
        height: 235,
        borderRadius: 10,
        justifyContent: 'space-around', // Adicionado para alinhar os elementos verticalmente
        marginBottom: 10
    },
    medicoImage: {
        alignSelf: 'center' // Para centralizar a imagem na horizontal
    },
    bottomTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10 // Adicionado para espaçamento horizontal entre os textos e as bordas
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    },
    leftText: {
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'left', // Alinhamento do texto à esquerda
    },
    rightText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
        marginBottom: 5,
        textAlign: 'right', // Alinhamento do texto à direita
    },
    flatList: {
        width: '100%',
        paddingHorizontal: 10 // Adicionado para espaçamento horizontal entre a FlatList e as bordas
    },
    flatListConsultas: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    containerNewConsulta: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between', // Adicionado para alinhar o texto e o botão
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 10
    },
    newConsultaText: {
        flex: 1,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    },
    btn: {
        height: 50,
        borderRadius: 10,
        backgroundColor: "#00975C",
        marginLeft: 10,
        paddingHorizontal: 20,
        justifyContent: 'center' // Para centralizar o texto verticalmente dentro do botão
    },
    btnText:{
        color: "white",
        fontSize: 18,
        fontWeight: "bold"  
    },
    formCadastro: {
        width: '100%',
        alignItems: 'center'
    },
    input: {
        width: '80%',
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingLeft: 10,
        marginBottom: 15,
    },
    inputCadastro: {
        textAlign: 'left', // Alinhamento do texto do placeholder à esquerda
    },
    backConsultas: {
        marginRight: 'auto',
        marginLeft: 30
    },
    deleteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    noConsultasContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    textNoConsultas: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'red', // Altere a cor conforme necessário
    }
});
