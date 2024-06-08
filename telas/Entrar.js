import { Text, View, TextInput, TouchableOpacity } from "react-native"
import { useState } from 'react'

function Entrar({ navigation }) {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  function handleEmail(e) {
    setEmail(e)
  }

  function handleSenha(e) {
    setSenha(e)
  }

  return <View>
    <Text>Entrar</Text>
    <Text>email</Text>
    <TextInput onPress={handleEmail} value={email}/>
    <Text>senha</Text>
    <TextInput onPress={handleSenha} value={senha}/>
    <TouchableOpacity>
      <Text>Entrar</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
      <Text>Cadastrar</Text>
    </TouchableOpacity>
  </View>
}

export default Entrar
