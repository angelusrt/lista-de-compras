import { Text, View, TextInput, TouchableOpacity } from "react-native"
import { useState } from 'react'

function Registrar() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [senha2, setSenha2] = useState("")

  function handleEmail(e) {
    setEmail(e)
  }

  function handleSenha(e) {
    setSenha(e)
  }

  function handleSenha2(e) {
    setSenha2(e)
  }

  return <View>
    <Text>Entrar</Text>
    <Text>email</Text>
    <TextInput onPress={handleEmail} value={email}/>
    <Text>senha</Text>
    <TextInput onPress={handleSenha} value={senha}/>
    <Text>repita senha</Text>
    <TextInput onPress={handleSenha2} value={senha2}/>
    <TouchableOpacity>
      <Text>Registrar</Text>
    </TouchableOpacity>
  </View>
}

export default Registrar
