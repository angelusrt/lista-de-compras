import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import Listas from "./telas/Listas"
import Grupos from "./telas/Grupos"
import Notas from "./telas/Notas"
import { Entrar, Registrar } from "./telas/Entrar"
import { colors } from "./Styles"

const Stack = createStackNavigator()

function Entradas() {
  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Entrar" component={Entrar}/>
    <Stack.Screen name="Registrar" component={Registrar}/>
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
  return <NavigationContainer theme={theme}>
    <Stack.Navigator 
      initialRouteName="Listas"
      screenOptions={{ 
        headerShown: false, 
        cardStyle: {height: "100%"}
      }} 
    >
      <Stack.Screen name="Entradas" component={Entradas}/>
      <Stack.Screen name="Listas" component={Listas}/>
      <Stack.Screen name="Grupos" component={Grupos}/>
      <Stack.Screen name="Notas" component={Notas}/>
    </Stack.Navigator>
  </NavigationContainer>
}

export default App
