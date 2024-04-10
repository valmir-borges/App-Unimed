import { Image, StyleSheet, View, Text, TextInput } from "react-native";
import React, { useContext } from 'react';
import { UserContext } from './Context/UserContext';

export default function Dados(){

  const { usuario } = useContext(UserContext)

    return(
      <View style={style.container}>
        <Image
          source={require('../assets/img/Logo-2.png')}
          style={style.logo}
        />
        <View style={style.subHeader}>
            {usuario && usuario.tipoUsuario == "Paciente" ? 
            (
              <>
                <Image
                  source={require('../assets/img/Paciente.png')}
                  style={style.userImage}
                />
              </>
            )
              :
              (
                <>
                  <Image
                    source={require('../assets/img/Medico.png')}
                    style={style.userImage}
                  />
                </>
              )
            }
            <Text style={style.subHeaderText}>{usuario.tipoUsuario}: <Text style={style.nomeUser}>{usuario.nome}</Text></Text>
        </View>
        <View style={style.containerDados}>
        <View style={style.row}>
        <Text style={style.label}>Telefone:</Text>
        <Text style={style.dadoUser}>{usuario.telefone}</Text>
      </View>
      <View style={style.row}>
        <Text style={style.label}>Email:</Text>
        <Text style={style.dadoUser}>{usuario.email}</Text>
      </View>
      <View style={style.row}>
        <Text style={style.label}>CPF:</Text>
        <Text style={style.dadoUser}>{usuario.cpf}</Text>
      </View>
      <View style={style.row}>
        <Text style={style.label}>Idade:</Text>
        <Text style={style.dadoUser}>{usuario.idade}</Text>
      </View>
      </View>
      </View>
    )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center', // Centralizar verticalmente
    paddingVertical: 20, // Adicionar espaço nas bordas superior e inferior
    paddingHorizontal: 20, // Adicionar espaço nas bordas laterais
  },
  logo: {
    width: 250,
    height: 90,
    marginTop: 20
  },
  subHeader: {
    flexDirection: 'column', // Mudança para layout em coluna
    alignItems: 'center', // Centralizar horizontalmente
    marginBottom: 20,
    marginTop: 20,
  },
  subHeaderText: {
    marginTop: 10, // Espaço acima do texto
    fontWeight: 'bold', // Destaque do texto
    fontSize: 22
  },
  userImage: {
    marginBottom: 10, // Espaço abaixo da imagem
  },
  nomeUser: {
    color: '#00975C'
  },
  containerDados: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 20
  },
  dadoUser:{
    color: '#00975C',
    fontWeight: 'bold',
    fontSize: 20
  }
})
