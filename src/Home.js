import { View, Button, Text, StyleSheet, Image, FlatList } from "react-native";


export default function Home(){

  const dados = [
    { id: '1', titulo: 'Produto 1', preco: 'R$ 10', categoria: 'Categoria A', data: 'Data A' },
    { id: '2', titulo: 'Produto 2', preco: 'R$ 20', categoria: 'Categoria B', data: 'Data B' },
    { id: '3', titulo: 'Produto 3', preco: 'R$ 30', categoria: 'Categoria C', data: 'Data C' },
    // Adicione mais itens conforme necessário
  ];
  const Produto = ({ titulo, preco, categoria, data }) => (
    <View style={style.produtoContainer}>
      <Text>{titulo}</Text>
      <Text>{preco}</Text>
      <Text>{categoria}</Text>
      <Text>{data}</Text>
    </View>
  );

    return(
        <View style={style.container}>
          <View style={style.header}>
            <View style={style.headerLeft}>
              <Image
                source={require('../assets/img/User.png')}
              />
              <View style={style.containerText}>
                <Text style={[style.textHeader, {color: "#00975C"}]}>Olá,</Text>
                <Text style={style.textHeader}>Paciente</Text>
              </View>
            </View>
            <View>
              <Image
                source={require('../assets/img/Logo.png')}
                style={style.logo}
              />
            </View>
          </View>
          <View style={style.container}>
            <FlatList
              data={dados}
              renderItem={({ item }) => <Produto titulo={item.titulo} preco={item.preco} categoria={item.categoria} data={item.data} />}
              keyExtractor={item => item.id}
              contentContainerStyle={style.flatListContainer}
              horizontal
              pagingEnabled // Ativa o efeito de carrossel
            />
          </View>
          <View style={style.containerMedicos}>
            <View>
              <Text>Conte com os melhores profissionais</Text>
            </View>
            <View style={style.carrosselMedicos}>
              <FlatList
              />
            </View>
          </View>
        </View>
    )
}

const style = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-around',
    width: "100%"
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
    width: 180,
    height: 60
  },
  container: {
    flex: 1,
  },
  flatListContainer: {
    alignItems: 'center',
  },
  produtoContainer: {
    width: 200, // Largura dos itens
    height: 200, // Altura dos itens
    marginHorizontal: 10, // Margem entre os itens
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});