import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

export default function Consultas(){
    
    const data = [
        { id: '1', data: '23/09', tipo: 'Avaliação', paciente: 'Mário Soares', image: require('../assets/img/Medico.png') },
        { id: '2', data: '23/09', tipo: 'Avaliação', paciente: 'Mário Soares', image: require('../assets/img/Medico.png') },
        { id: '3', data: '23/09', tipo: 'Avaliação', paciente: 'Mário Soares', image: require('../assets/img/Medico.png') },  
    ];
    
    const flatListRef = useRef(null);

    const renderItem = ({ item }) => (
        <View style={style.boxConsulta}>
            <Image source={item.image} style={style.medicoImage}/>
            <View style={style.bottomTextContainer}>
                <View style={style.column}>
                    <Text style={style.leftText}>Data da consulta:</Text>
                    <Text style={style.leftText}>Tipo da consulta:</Text>
                    <Text style={style.leftText}>Paciente:</Text>
                </View>
                <View style={style.column}>
                    <Text style={style.rightText}>{item.data}</Text>
                    <Text style={style.rightText}>{item.tipo}</Text>
                    <Text style={style.rightText}>{item.paciente}</Text>
                </View>
            </View>
        </View>
    );

    return(
        <View style={style.container}>
            <Image
                source={require('../assets/img/Logo.png')}
                style={style.logo}
            />
            <View style={style.headerConsultas}>
                <FontAwesome5 name="calendar-day" size={60} color="#00975C" />              
                <Text style={style.headerText}>SUAS CONSULTAS</Text>
            </View>
            <FlatList
                data={data}
                ref={flatListRef}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={style.flatList}
                contentContainerStyle={style.flatListConsultas}
            />
            <View style={style.containerNewConsulta}>
                <Text style={style.newConsultaText}>DESEJA AGENDAR UMA NOVA CONSULTA</Text>
                <TouchableOpacity style={style.btn}>
                    <Text style={style.btnText}>AGENDAR</Text>
                </TouchableOpacity>
            </View>
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
        marginTop: 20
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18
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
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'left', // Alinhamento do texto à esquerda
    },
    rightText: {
        color: '#164432',
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
        paddingHorizontal: 10,
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
});
