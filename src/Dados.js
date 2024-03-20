import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';

export default function Dados(){
    return(
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#006600", fontSize: 40 }}>Home Screen!</Text>
        <Entypo name="user" size={80} color="#006600" />
      </View>
    )
}