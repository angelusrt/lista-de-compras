import { Text, TextInput, Pressable, View, Modal, ScrollView } from "react-native"
import { colors, styles } from "../Styles"
import { useState } from "react"

/**
 * @param {Object} param 
 * @param {boolean} param.vis 
 * @param {voidFun} param.setVis 
 * @param {string} param.nome 
 * @param {voidFun} param.setNome 
 * @param {voidFun} param.add 
 */
function ListaPop({vis, setVis, nome, setNome, add}) {
  return <Modal
    visible={vis} 
    animationType="fade"
    transparent={false} 
    onRequestClose={setVis}
    style={styles.modal}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.subtitle}>
          Criar nova lista
        </Text>
        <TextInput 
          style={styles.input} 
          onChangeText={setNome} 
          value={nome} 
          placeholder="Nome"
          placeholderTextColor={colors.grey}
        />
        <Pressable
          style={styles.button4}
          onPress={add}
        >
          <Text style={styles.buttonText1}>
            Adicionar
          </Text>
        </Pressable>
      </View>
    </View>
  </Modal>
}

function Listas() {
  const [listas, setListas] = useState([])
  const [nome, setNome] = useState("")
  const [modal, setModal] = useState(false)

  function handleNome(e) {
    setNome(e)
  }

  function handleModal() {
    setModal(e => !e)
  }

  function pop() {
    setModal(true)
  }

  function add() {
    function appendToListas(oldState) {
      let newState = oldState
      console.log(oldState)
      
      newState.push({
        nome: nome,
        data: Date.now()
      })

      return newState
    }

    setListas(appendToListas)
    setNome("")
    setModal(false)
  }


  return <ScrollView style={styles.view}>
    <View style={styles.rowView}>
      <Text style={styles.title2}>Listas</Text>
      <Pressable style={styles.button4} onPress={pop}>
        <Text style={styles.buttonText1}>+</Text>
      </Pressable>
    </View>
    <ListaPop
      vis={modal}
      nome={nome}
      setVis={handleModal}
      setNome={handleNome}
      add={add}
    />
    {listas.map((lista, key) => 
      <View key={key} style={styles.cardView}>
        <Text style={styles.title3}>{lista.nome}</Text>
        <Text style={styles.text}>{lista.data}</Text>
      </View>
     )}
  </ScrollView>
}

export default Listas
