import { Text, View, TextInput, Pressable } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as LocalAuthentication from 'expo-local-authentication'
import { useEffect, useState } from 'react'

import { colors, styles } from "../Styles"
import Pop from "./Pop"
import { insertUsuarios, selectUsuario } from "../database/Database"
import { SQLiteDatabase } from "expo-sqlite"

async function authenticate() {
  const hasBiometric = await LocalAuthentication.hasHardwareAsync()
  if (!hasBiometric) { return false }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Authenticate to access the app.',
    fallbackLabel: 'Use passcode instead?',
    disableDeviceFallback: true,
    cancelLabel: 'Cancel',
  })

  if (result.success) { return true }

  return false
}

/**
 * @param {Object} args 
 * @param {import("@react-navigation/native").NavigationProp} args.navigation
 * @param {string} args.routeName
 * @param {string} args.secondaryRouteName
 * @param {boolean} args.modal
 * @param {import("./Pop").voidFun} args.setModal
 * @param {string} args.modalText
 * @param {string} args.email
 * @param {import("./Pop").voidFun} args.setEmail
 * @param {string} args.senha
 * @param {import("./Pop").voidFun} args.setSenha
 * @param {import("./Pop").voidFun} args.enter
 */
function EntrarView(args) {
  return <View style={styles.view}>
    <Pop
      text={args.modalText}
      vis={args.modal} 
      setVis={args.setModal} 
    />
    <Text style={styles.title}>
      {args.routeName}
    </Text>
    <TextInput 
      style={styles.input} 
      onChangeText={args.setEmail} 
      value={args.email} 
      placeholder="Email"
      placeholderTextColor={colors.grey}
    />
    <TextInput 
      style={styles.input} 
      onChangeText={args.setSenha} 
      value={args.senha}
      placeholder="Senha"
      placeholderTextColor={colors.grey}
      secureTextEntry={true}
    />
    <Pressable 
      style={styles.button1}
      onPress={args.enter}
    >
      <Text style={styles.buttonText1}>
        {args.routeName}
      </Text>
    </Pressable>
    <Pressable 
      style={styles.button2} 
      onPress={() => args.navigation.navigate(args.secondaryRouteName)}
    >
      <Text style={styles.buttonText2}>
        {args.secondaryRouteName}
      </Text>
    </Pressable>
  </View>
}

/**@param {Object} param 
 * @param {import("@react-navigation/native").NavigationProp} param.navigation 
 * @param {import("../App").setId} param.setId 
 * @param {SQLiteDatabase} param.db 
 */
function Entrar({ navigation, db,  setId }) {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [modalText, setModalText] = useState("")
  const [modal, setModal] = useState(false)

  async function enter() {
    const e = await AsyncStorage.getItem("email")
    const s = await AsyncStorage.getItem("senha")
    // const i = await AsyncStorage.getItem("id")
    const i = await selectUsuario(db, email, senha)

    if (e === email && s === senha && i.id != null) {
      setId(i.id)
      navigation.navigate("Listas")
    } else {
      if (e === null || s === null) {
        setModalText("Email não encontrado, cadastre-se!")
      } else if (i.id == null) {
        setModalText("Error ao entrar!")
      } else {
        setModalText("Email ou senha incorreta!")
      }

      setModal(true)
    }
  }

  useEffect(() => {
    (async function() {
      if (await authenticate())  
        navigation.navigate("Listas") 
    })()
  }, [])

  return <EntrarView
    routeName="Entrar"
    secondaryRouteName="Registrar"
    email={email}
    senha={senha}
    modal={modal}
    modalText={modalText}
    setEmail={(e) => setEmail(e)}
    setSenha={(e) => setSenha(e)}
    setModal={() => setModal(e => !e)}
    enter={enter}
    navigation={navigation}
  />
}

/**@param {Object} param 
 * @param {import("@react-navigation/native").NavigationProp} param.navigation 
 * @param {import("../App").setId} param.setId 
 * @param {SQLiteDatabase} param.db 
 */
function Registrar({ navigation, db, setId }) {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [modal, setModal] = useState(false)
  const [modalText, setModalText] = useState("")

  async function enter() {
    if (senha.includes("react-native")) {
      await insertUsuarios(db, email, senha)
      const id = await selectUsuario(db, email, senha)

      if (id.id === "null"){
        setModalText("Erro ao cadastrar!")
        setModal(true)

      } else {
        AsyncStorage.setItem("email", email)
        AsyncStorage.setItem("senha", senha)
        AsyncStorage.setItem("id", id.id)
        setId(id.id)

        navigation.navigate("Listas")
      }
    } else {
      setModalText("Senha não possui 'react-native', coloque!")
      setModal(true)
    }
  }

  return <EntrarView
    routeName="Registrar"
    secondaryRouteName="Entrar"
    email={email}
    senha={senha}
    modal={modal}
    modalText={modalText}
    setEmail={(e) => setEmail(e)}
    setSenha={(e) => setSenha(e)}
    setModal={() => setModal(e => !e)}
    enter={enter}
    navigation={navigation}
  />
}

export {Entrar, Registrar}
