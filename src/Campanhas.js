import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { LinearGradient } from 'expo-linear-gradient';

export default function Campanhas(){

  const data = [
    { id: '1', titulo: 'CAMPANHA', image: require('../assets/img/Bairro.png') },
    { id: '2', titulo: 'CAMPANHA', image: require('../assets/img/Bairro.png') },
    { id: '3', titulo: 'CAMPANHA', image: require('../assets/img/Bairro.png') },
    { id: '4', titulo: 'CAMPANHA', image: require('../assets/img/Bairro.png') },
  ];

  const flatListRef = useRef(null);

  const BoxCampanha = ({ titulo, image }) => (
    <View style={style.boxContainerCampanha}>
      <Image source={image} style={style.imageCampanha} />
      <Text style={style.textContainerCampanha}>{titulo}</Text>
    </View>
  );

    return(
      <View style={style.container}>
        <Image
          source={require('../assets/img/Logo.png')}
          style={style.logo}
        />
        <View style={style.headerConsultas}>
          <Ionicons name="newspaper" size={60} color="#00975C" />          
          <Text style={style.headerText}>CAMPANHAS</Text>
        </View>
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={({ item }) =>
            <BoxCampanha
              titulo={item.titulo}
              image={item.image}
            />
          }
          keyExtractor={item => item.id}
          contentContainerStyle={style.flatListContainer}
        />
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
  boxContainerCampanha: {
    width: 300,
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10, // Adicionando espaçamento horizontal
    backgroundColor: '#f2f2f2', // Cor de fundo para melhor visualização
    borderRadius: 10, // Borda arredondada para boxContainerCampanha
    marginBottom: 10 // Espaçamento inferior entre os itens
  },
  imageCampanha: {
    width: 130, // Largura da imagem
    height: 130, // Altura da imagem
    marginRight: 10 // Espaçamento à direita da imagem
  },
  textContainerCampanha: {
    fontWeight: 'bold',
    fontSize: 20
  }
})