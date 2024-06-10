import { Text, TextInput, Pressable, View, Modal, ScrollView } from "react-native"
import { colors, styles } from "../Styles"
import { useEffect, useState } from "react"
import { insertListas, selectListas } from "../database/Database"
import { SQLiteDatabase } from "expo-sqlite"

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
        <Pressable style={styles.button4} onPress={add}>
          <Text style={styles.buttonText1}>
            Adicionar
          </Text>
        </Pressable>
        <Pressable style={styles.button3} onPress={setVis}>
          <Text style={styles.buttonText1}>
            Voltar
          </Text>
        </Pressable>
      </View>
    </View>
  </Modal>
}

/**@param {Object} args 
 * @param {number} args.id
 * @param {SQLiteDatabase} args.db
 * @param {import("../App").setId} args.setListaId
 * @param {import("@react-navigation/native").NavigationProp} param.navigation 
 */
function Listas({db, id, setListaId, navigation}) {
  const [listas, setListas] = useState([])
  const [nome, setNome] = useState("")
  const [modal, setModal] = useState(false)

  async function getListas() {
    const l = await selectListas(db, id)
    setListas(l)
  }

  async function add() {
    const date = new Date()
    const now = date.toISOString()
    
    await insertListas(db, nome, now, id)
    getListas()
    setNome("")
    setModal(false)
  }

  function goNotas(id) {
    setListaId(id)
    navigation.navigate("Notas")
  }

  useEffect(() => { getListas() },[])

  return <ScrollView style={styles.view}>
    <View style={styles.rowView}>
      <Text style={styles.title2}>Listas</Text>
      <Pressable 
        style={styles.button4} 
        onPress={() => setModal(true)}
      >
        <Text style={styles.buttonText1}>+</Text>
      </Pressable>
    </View>
    <ListaPop
      vis={modal}
      nome={nome}
      setVis={() => setModal(e => !e)}
      setNome={(e) => setNome(e)}
      add={add}
    />
    {listas.lenght != 0 && typeof listas[0] == "object" && listas.map((lista, key) => 
      <View key={key} style={styles.cardView}>
        <Text style={styles.title3}>{lista.nome}</Text>
        <Text style={styles.text}>{lista.data}</Text>
        <Pressable style={styles.button4} onPress={() => goNotas(lista.id)}>
          <Text style={styles.buttonText1}>
            Adicionar
          </Text>
        </Pressable>
      </View>
     )}
  </ScrollView>
}

export default Listas
