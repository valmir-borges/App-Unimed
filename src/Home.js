import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, Button, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, FontAwesome5, FontAwesome, Entypo } from "@expo/vector-icons";
import NetInfo from '@react-native-community/netinfo';
import { useBatteryLevel } from 'expo-battery';

//Importando o contexto
import { UserContext } from './Context/UserContext';

export default function Home() {

  //Pegando o objeto do usuário
  const { usuario } = useContext(UserContext)
  const firstname = usuario && usuario.nome ? usuario.nome.split(' ')[0] : null;

  //Array de dados do primeiro carrossel
  const dados = [
    { id: '1', titulo: 'CUIDANDO DE VOCÊ E DE SUA FAMÍLIA', icon: <FontAwesome5 name="hospital" size={50} color="white" /> },
    { id: '2', titulo: 'CONTE COM O MELHOR ATENDIMENTO PROFISSIONAL', icon: <FontAwesome name="stethoscope" size={50} color="white" /> },
    { id: '3', titulo: 'CUIDE DE SUA SAÚDE, INVISTA EM NOSSOS PLANOS', icon: <Entypo name="v-card" size={50} color="white" /> },
    { id: '4', titulo: 'FIQUE TRANQUILO, NÓS CUIDAMOS DE VOCÊ.', icon: <Entypo name="heart" size={50} color="white" /> },
  ];

  //Box do primeiro carrossel
  const Box = ({ titulo, icon }) => (
    <View style={style.boxContaineritem}>
      <Text style={style.textContaineritem}>{titulo}</Text>
      <View style={style.iconContainer}>{icon}</View>
    </View>
  );

  //Carrossel automático do primeiro carrossel
  const [currentIndexCarrossel1, setCurrentIndexCarrossel1] = useState(0);
  const flatListRefCarrossel1 = useRef(null);
    
  //Carrossel automático do primeiro carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndexCarrossel1 < dados.length - 1) {
        flatListRefCarrossel1.current.scrollToIndex({ animated: true, index: currentIndexCarrossel1 + 1 });
        setCurrentIndexCarrossel1(prevIndex => prevIndex + 1);
      } else {
        flatListRefCarrossel1.current.scrollToIndex({ animated: true, index: 0 });
        setCurrentIndexCarrossel1(0);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndexCarrossel1]);

  //Array de dados do segundo carrossel
  const dadosMedicos = [
    { id: '1', name: 'Dr. Nefário', image: require('../assets/img/Medico.png') },
    { id: '2', name: 'Dr. William', image: require('../assets/img/Medico.png') },
    { id: '4', name: 'Dr. Mateus', image: require('../assets/img/Medico.png') },
    { id: '5', name: 'Dr. Francisco', image: require('../assets/img/Medico.png') },
    { id: '6', name: 'Dra. Poups', image: require('../assets/img/Medico.png') },
    { id: '7', name: 'Dr. Fernando', image: require('../assets/img/Medico.png') },
    { id: '8', name: 'Dr. Antônio', image: require('../assets/img/Medico.png') },
  ];

  //Box do segundo carrossel
  const BoxMedicos = ({ name, image }) => (
    <View style={style.boxContaineritemMedico}>
      <Image source={image} />
      <Text style={style.textContaineritemMedico}>{name}</Text>
    </View>
  );

  //Carrossel automático do segundo carrossel  
  const [currentIndexCarrossel2, setCurrentIndexCarrossel2] = useState(0);
  const flatListRefCarrossel2 = useRef(null);

  //Carrossel automático do segundo carrrossel
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndexCarrossel2 < dadosMedicos.length - 1) {
        flatListRefCarrossel2.current.scrollToIndex({ animated: true, index: currentIndexCarrossel2 + 1 });
        setCurrentIndexCarrossel2(prevIndex => prevIndex + 1);
      } else {
        flatListRefCarrossel2.current.scrollToIndex({ animated: true, index: 0 });
        setCurrentIndexCarrossel2(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [currentIndexCarrossel2]);

  const [isConnected, setIsConnected] = useState(true); //Por padrão já vai vir conectado

    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        setIsConnected(state.isConnected);
      });

      return () => {
        unsubscribe();
      };
    }, []);
  
  //Parte da bateria
  const batteryLevel = useBatteryLevel();
  
  return (
    <ScrollView style={style.container}>
    <View style={style.header}>
      <View style={style.headerLeft}>
        {usuario && usuario.tipoUsuario == "Paciente" ? 
        (
          <>
            <Image
              source={require('../assets/img/Paciente.png')}
            />
          </>
        )
          :
          (
            <>
              <Image
                source={require('../assets/img/Medico.png')}
              />
            </>
          )
        }
        <View style={style.containerText}>
          <Text style={style.textHeader}>Olá,</Text>
          <Text>
            <Text style={[style.textHeader, { color: "#00975C" }]}>
              {usuario && usuario.nome ? `${firstname} !`: "Carregando..."}
            </Text>
          </Text>    
        </View>
      </View>
      <View>
        <Image
          source={require('../assets/img/Logo.png')}
          style={style.logo}
        />
      </View>
    </View>
    <View style={style.containerBox}>
      <FlatList
        ref={flatListRefCarrossel1}
        data={dados}
        renderItem={({ item }) =>
          <Box
            titulo={item.titulo}
            icon={item.icon}
          />
        }
        keyExtractor={item => item.id}
        contentContainerStyle={style.flatListContainer}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false} // Oculta a barra de rolagem horizontal
      />
    </View>
      <View>
        <Text style={style.textMedicos}>CONTE COM OS MELHORES PROFISSIONAIS</Text>
      {isConnected ? 
        (
          <>
            <View style={style.carrosselMedicos}>
              <FlatList
                ref={flatListRefCarrossel2}
                data={dadosMedicos}
                renderItem={({ item }) => (
                  <BoxMedicos
                    name={item.name}
                    image={item.image}
                  />
                )}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={style.flatListContainerMedico}
              />
            </View>
          </>
        )
        : 
          (
            <>
                <View style={style.noInternet}>
                  <Text style={style.textNoInternet}>Você não tem consultas!</Text>
                </View>    
              </>
          )
      }
      {batteryLevel >= 0.2 ? (
        <View style={style.containerLocation}>
          <View style={style.textLocation}>
            <Text style={{color: '#00975C', fontSize: 17, fontWeight: 'bold', marginBottom: 10}}>SEMPRE HÁ UMA UNIDADE PERTINHO DE VOCÊ</Text>
            <Text style={{fontWeight: 'bold', fontSize: 15, marginBottom: 10}}>Temos mais de 1000 unidades por todo o Brasil</Text>
          </View>
          <View style={style.containerFoto}>
            <Image
              source={require('../assets/img/Location.png')}
              style={style.imageLocation}
            />
          </View>
        </View>
      ) : (
        <View style={style.containerLocation}>
          <Text style={{ color: 'red', fontSize: 17, fontWeight: 'bold', marginBottom: 10 }}>Atenção: Bateria baixa</Text>
        </View>
      )}
    </View>
  </ScrollView>
  
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: "100%",
    marginTop: 10,
    alignItems: 'center'
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row'
  },
  containerText: {
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  logo: {
    width: 200,
    height: 60
  },
  container: {
    flex: 1,
  },
  flatListContainer: {
    alignItems: 'center',
  },
  containerBox: {
    marginTop: 20,
  },
  boxContaineritem: {
    width: 231,
    height: 126,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00975C',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  textContaineritem: {
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    fontSize: 18
  },
  iconContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  textMedicos: {
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 20,
  },
  carrosselMedicos: {
    marginTop: 20,
  },
  boxContaineritemMedico: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  textContaineritemMedico: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15
  },
  flatListContainerMedico: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20
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
  btnText: {
    lineHeight: 45,
    color: "white",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    fontSize: 25,
    fontWeight: "bold"
  },
  noInternet: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
    textNoInternet: {
      fontWeight: 'bold',
      fontSize: 20,
      color: 'red',
  },
  containerLocation: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textLocation: {
    alignItems: 'center',
    marginBottom: 10,
  },
  containerFoto: {
    alignItems: 'center',
  },
  imageLocation: {
    borderRadius: 20,
    marginBottom: 20
  }
});
