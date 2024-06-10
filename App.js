import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import Listas from "./telas/Listas"
import Notas from "./telas/Notas"
import * as Database from "./database/Database"
import { Entrar, Registrar } from "./telas/Entrar"
import { colors } from "./Styles"
import { useEffect, useState } from "react"
import { SQLiteDatabase } from "expo-sqlite"

const Stack = createStackNavigator()

/**
 * @typedef {Function} setId
 * @param {number} id 
 * @returns {void}
 */

/** @param {Object} args 
 *  @param {setId} args.setId
 *  @param {SQLiteDatabase} args.db
 */
function Entradas(args) {
  return <Stack.Navigator 
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Entrar">
      {(e) => <Entrar setId={args.setId} db={args.db} navigation={e.navigation}/>}
    </Stack.Screen>
    <Stack.Screen name="Registrar">
      {(e) => <Registrar setId={args.setId} db={args.db} navigation={e.navigation}/>}
    </Stack.Screen>
  </Stack.Navigator>
}

/**@type {import("@react-navigation/native").Theme}*/
const theme = {
  dark: true,
  colors: {
    primary: colors.green,
    background: colors.black,
    card: colors.grey,
    text: colors.white,
    border: colors.yellow,
    notification: colors.blue,
  }
}

function App() {
  const [id, setId] = useState(null)
  const [listaId, setListaId] = useState(null)
  const [db, setDB] = useState(null)

  useEffect(() => {
    async function initDB() {
      const db = await Database.openDB()
      await Database.createUsuario(db)
      await Database.createListas(db)
      await Database.createItens(db)

      setDB(db)
    }

    initDB()
  },[])

  return <NavigationContainer theme={theme}>
    <Stack.Navigator 
      initialRouteName="Entradas"
      screenOptions={{cardStyle: {height: "100%"}}} 
    >
      <Stack.Screen name="Entradas">
        {() => <Entradas setId={(e) => setId(e)} db={db}/>}
      </Stack.Screen>
      <Stack.Screen name="Listas">
          {(e) => <Listas id={id} setListaId={(e) => setListaId(e)} db={db} navigation={e.navigation}/>}
      </Stack.Screen>
      <Stack.Screen name="Notas">
        {() => <Notas db={db} id={listaId}/>}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
}

export default App
