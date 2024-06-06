import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

function Home() {
  return <View style={styles.container}>
    <Text>aaaaaaaaaaa</Text>
  </View>
}

export default function App() {
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}/>
    </Stack.Navigator>
  </NavigationContainer>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
