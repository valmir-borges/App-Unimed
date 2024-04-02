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
            <Text style={style.subHeaderText}>Exibindo dados do usuário {usuario.tipoUsuario}</Text>
        </View>
        { usuario.tipoUsuario == "Paciente"
          ? (//Se o usuário for paciente exibe isso
            <>
              <View style={style.formCadastro}>
                <View style={style.inputPair}>
                  <TextInput
                      placeholder="Insira seu nome..."
                      style={[style.input, style.inputCadastro]}
                      value={usuario.nome}
                      textInput={usuario.nome}
                  />
                    <TextInput
                        placeholder="Insira seu telefone..."
                        keyboardType= 'phone-pad'
                        style={[style.input, style.inputCadastro]}
                        value={usuario.telefone}
                        textInput={usuario.telefone}
                    />
                </View>
                <View style={style.inputPair}>
                    <TextInput
                        placeholder="Insira seu email..."
                        keyboardType= 'email-address'
                        style={[style.input, style.inputCadastro]}
                        value={usuario.email}
                        textInput={usuario.email}
                    />
                    <TextInput
                        placeholder="Insira seu CPF..."
                        keyboardType='numeric'
                        style={[style.input, style.inputCadastro]}
                        value={usuario.cpf}
                        textInput={usuario.cpf}
                    />
                </View>
                <View style={style.inputPair}>
                    <TextInput
                        placeholder="Insira seu idade..."
                        keyboardType='numeric'
                        style={[style.input, style.inputCadastro]}
                        value={usuario.idade}
                        textInput={usuario.idade}
                    />
                    <TextInput
                        placeholder="Insira seu sexo..."
                        style={[style.input, style.inputCadastro]}
                        value={usuario.sexo}
                        textInput={usuario.sexo}
                    />
                </View>
              </View>
            </>
          )
          :
          (//Se ele for diferente de paciente irá exibir isto, ou seja, ele é médico
            <>
              <View style={style.formCadastro}>
                <View style={style.inputPair}>
                  <TextInput
                      placeholder="Insira seu nome..."
                      style={[style.input, style.inputCadastro]}
                      value={usuario.nome}
                      textInput={usuario.nome}
                  />
                    <TextInput
                        placeholder="Insira seu telefone..."
                        keyboardType= 'phone-pad'
                        style={[style.input, style.inputCadastro]}
                        value={usuario.telefone}
                        textInput={usuario.telefone}
                    />
                </View>
                <View style={style.inputPair}>
                    <TextInput
                        placeholder="Insira seu email..."
                        keyboardType= 'email-address'
                        style={[style.input, style.inputCadastro]}
                        value={usuario.email}
                        textInput={usuario.email}
                    />
                    <TextInput
                        placeholder="Insira seu CPF..."
                        keyboardType='numeric'
                        style={[style.input, style.inputCadastro]}
                        value={usuario.cpf}
                        textInput={usuario.cpf}
                    />
                </View>
                <View style={style.inputPair}>
                    <TextInput
                        placeholder="Insira seu idade..."
                        keyboardType='numeric'
                        style={[style.input, style.inputCadastro]}
                        value={usuario.idade}
                        textInput={usuario.idade}
                    />
                    <TextInput
                        placeholder="Insira seu sexo..."
                        style={[style.input, style.inputCadastro]}
                        value={usuario.sexo}
                        textInput={usuario.sexo}
                    />
                </View>
                <View style={style.inputPair}>
                    <TextInput
                        placeholder="Insira seu idade..."
                        keyboardType='numeric'
                        style={[style.input, style.inputCadastro]}
                        value={usuario.crm}
                        textInput={usuario.crm}
                    />
                    <TextInput
                        placeholder="Insira seu sexo..."
                        style={[style.input, style.inputCadastro]}
                        value={usuario.enderecoConsultorio}
                        textInput={usuario.enderecoConsultorio}
                    />
                </View>
              </View>
            </>
          )
        }
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
    marginTop: 20
  },
  subHeaderText: {
    marginTop: 10, // Espaço acima do texto
    fontWeight: 'bold', // Destaque do texto
    fontSize: 18
  },
  userImage: {
    marginBottom: 10, // Espaço abaixo da imagem
  },
  input: {
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    height: 50
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
})
