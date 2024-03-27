import { View, Text, StyleSheet, Image } from "react-native";
import { Entypo } from '@expo/vector-icons';

export default function Dados(){
    return(
      <View style={style.container}>
        <Image
          source={require('../assets/img/Logo.png')}
          style={style.logo}
        />
        <View>
          <Image source={require('../assets/img/Paciente.png')}/>
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
    justifyContent: 'center',
    gap: 10,
    width: '100%'
  },
  logo: {
    width: 250,
    height: 90,
    marginTop: 20
},
})