import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

function Entradas() {
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Entrar" component={Entrar}/>
      <Stack.Screen name="Registrar" component={Registrar}/>
    </Stack.Navigator>
  </NavigationContainer>
}

export default function App() {
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Entradas" component={Entradas}/>
      <Stack.Screen name="Listas" component={Listas}/>
      <Stack.Screen name="Grupos" component={Grupos}/>
      <Stack.Screen name="Notas" component={Notas}/>
    </Stack.Navigator>
  </NavigationContainer>
}
