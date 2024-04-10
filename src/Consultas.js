import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TextInput, Keyboard, Platform, Alert } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import * as Calendar from 'expo-calendar';

export default function Consultas(){

    async function getPermissions(){
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
          const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        }
    }

    useEffect(()=>{
        getPermissions();
    }, [])

    const [cadastrarConsulta, setCadastrarConsulta] = useState(false);
    const [tipoConsulta, setTipoConsulta] = useState('');
    const [nomeMedico, setNomeMedico] = useState('');
    const [dataConsulta, setDataConsulta] = useState('');
    const [observacao, setObservacao] = useState('');
    const [data, setData] = useState([]);
    const [dados, setDados] = useState([]);
    const flatListRef = useRef(null);

    const [ error, setError] = useState('')

    const renderItem = ({ item, index }) => (
        <View style={style.boxConsulta}> 
            <TouchableOpacity onPress={() => excluirConsulta(index)} style={style.deleteIcon}>
                <FontAwesome5 name="trash" size={30} color="white" />        
            </TouchableOpacity>
            <Image source={require('../assets/img/Medico.png')} style={style.medicoImage}/>
            <View style={style.bottomTextContainer}>
            <View style={style.column}>
                <Text style={style.leftText}>Tipo de consulta:</Text>
                <Text style={style.leftText}>Médico:</Text>
                <Text style={style.leftText}>Data:</Text>
                <Text style={style.leftText}>Observação:</Text>
            </View>
            <View style={style.column}>
                <Text style={style.rightText}>{item.tipo}</Text>
                <Text style={style.rightText}>{item.nomeMedico}</Text>
                <Text style={style.rightText}>{item.data}</Text>
                <Text style={style.rightText}>{item.observacao}</Text>
            </View>
            </View>
        </View>
    );
    
    function excluirConsulta(index) {
        Alert.alert(
            "Confirmação",
            "Tem certeza que deseja excluir esta consulta?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Confirmar",
                    onPress: () => {
                        const newData = [...data];
                        newData.splice(index, 1);
                        setData(newData);
                    }
                }
            ]
        );
    }

    function alternarCadastroConsulta(){
        setCadastrarConsulta(!cadastrarConsulta);
    }

    async function cadastrarConsultaFuncao() {
        if(tipoConsulta == '' || nomeMedico == '' || dataConsulta == '' || observacao == '')
        {
            setError('Preencha todos os campos para agendar uma consulta')
        }
        else{
            const novaConsulta = {
                tipo: tipoConsulta,
                nomeMedico: nomeMedico,
                data: dataConsulta,
                observacao: observacao
            };
            setData([...data, novaConsulta]);
            alternarCadastroConsulta();
            Keyboard.dismiss();
        
            if (tipoConsulta !== "" && dataConsulta !== "") {
                const evento = {
                    id: uuid.v4(),
                    nome: tipoConsulta,
                    inicio: dataConsulta,
                };
                const novoEvento = [...dados, evento];
                setDados(novoEvento);
        
                const defaultCalendarSource =
                    Platform.OS === 'ios'
                        ? await Calendar.getDefaultCalendarAsync()
                        : { isLocalAccount: true, name: 'Expo Calendar' };
        
                const newCalendarID = await Calendar.createCalendarAsync({
                    title: 'Expo Calendar',
                    color: 'blue',
                    entityType: Calendar.EntityTypes.EVENT,
                    sourceId: defaultCalendarSource.id,
                    source: defaultCalendarSource,
                    name: 'internalCalendarName',
                    ownerAccount: 'personal',
                    accessLevel: Calendar.CalendarAccessLevel.OWNER,
                });
        
                let inicioDataHora = dataConsulta.split(" ");
                let inicioData = inicioDataHora[0].split("-");
                let inicioHora = inicioDataHora[1].split(".");
                
                // Ajuste para a data final ter uma hora a mais
                let endDate = new Date(inicioData[2], inicioData[1] - 1, inicioData[0], inicioHora[0], inicioHora[1]);
                endDate.setHours(endDate.getHours() + 1);
        
                const newEvent = {
                    title: tipoConsulta,
                    startDate: new Date(inicioData[2], inicioData[1] - 1, inicioData[0], inicioHora[0], inicioHora[1]),
                    endDate: endDate,
                    location: 'Consultório Unimed',
                    notes: `Consulta com o: ${nomeMedico}`
                };
                try {
                    await Calendar.createEventAsync(newCalendarID, newEvent);
                    alert('Consulta marcada com sucesso');
                    setTipoConsulta('')
                    setNomeMedico('')
                    setDataConsulta('')
                    setObservacao('')
    
                } catch (error) {
                    console.log(error);
                    alert('Erro ao marcar consulta');
                }
            }
        }
    }
    

    return(
        <View style={style.container}>
            {cadastrarConsulta ? 
            (
                <>
                    <TouchableOpacity onPress={alternarCadastroConsulta} style={style.backConsultas}>
                        <AntDesign name="back" size={40} color="black" />
                    </TouchableOpacity>
                    <Image
                        source={require('../assets/img/Logo-2.png')}
                        style={style.logo}
                    />
                    <View>
                        <Text style={style.textErro}>{error}</Text>
                    </View>
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
                                placeholder="Data da consulta... (DD-MM-AAAA HH.MM)"
                                keyboardType= 'phone-pad'
                                style={[style.input, style.inputCadastro]}
                                value={dataConsulta}
                                onChangeText={setDataConsulta}
                            /> 
                            <TextInput
                                placeholder="Observação..."
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
                <>
                    <Image
                        source={require('../assets/img/Logo-2.png')}
                        style={style.logo}
                    />
                    <View style={style.headerConsultas}>
                        <FontAwesome5 name="calendar-day" size={60} color="#00975C" />              
                        <Text style={style.headerText}>SUAS CONSULTAS</Text>
                    </View>
                    {data == '' ?
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
        justifyContent: 'space-around', 
        marginBottom: 10
    },
    medicoImage: {
        alignSelf: 'center' 
    },
    bottomTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10 
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
        textAlign: 'left', 
    },
    rightText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
        marginBottom: 5,
        textAlign: 'right', 
    },
    flatList: {
        width: '100%',
        paddingHorizontal: 10 
    },
    flatListConsultas: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    containerNewConsulta: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between', 
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
        justifyContent: 'center' 
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
        textAlign: 'left', 
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
        color: 'red', 
    },
    textErro: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'red',
        textAlign: 'center'
    }
});
