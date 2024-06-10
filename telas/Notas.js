import { Text, TextInput, Pressable, View, Modal, ScrollView } from "react-native"
import { colors, styles } from "../Styles"
import { useEffect, useState } from "react"
import { insertItens, insertListas, selectItens, selectListas } from "../database/Database"
import { SQLiteDatabase } from "expo-sqlite"

/**
 * @param {Object} param 
 * @param {boolean} param.vis 
 * @param {voidFun} param.setVis 
 * @param {string} param.nome 
 * @param {voidFun} param.setNome 
 * @param {string} param.valor 
 * @param {voidFun} param.setValor 
 * @param {voidFun} param.add 
 */
function NotasPop({vis, setVis, nome, setNome, valor, setValor, add}) {
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
          Criar nova nota
        </Text>
        <TextInput 
          style={styles.input} 
          onChangeText={setNome} 
          value={nome} 
          placeholder="Nome"
          placeholderTextColor={colors.grey}
        />
        <TextInput 
          style={styles.input} 
          onChangeText={setValor} 
          value={valor} 
          placeholder="Valor"
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
 */
function Notas({db, id}) {
  const [itens, setItens] = useState([])
  const [nome, setNome] = useState("")
  const [valor, setValor] = useState("")
  const [modal, setModal] = useState(false)

  async function getItens() {
    const l = await selectItens(db, id)

    if (l.length > 0 && l[0].nome != undefined) {
      setItens(l)
    }
  }

  async function add() {
    await insertItens(db, nome, valor, id)
    getItens()
    setNome("")
    setModal(false)
  }

  useEffect(() => { 
    getItens() 
  },[])

  return <ScrollView style={styles.view}>
    <View style={styles.rowView}>
      <Text style={styles.title2}>Notas</Text>
      <Pressable 
        style={styles.button4} 
        onPress={() => setModal(true)}
      >
        <Text style={styles.buttonText1}>+</Text>
      </Pressable>
    </View>
    <NotasPop
      vis={modal}
      nome={nome}
      valor={valor}
      setVis={() => setModal(e => !e)}
      setNome={(e) => setNome(e)}
      setValor={(e) => setValor(e)}
      add={add}
    />
    {itens.lenght != 0 && typeof itens[0] == "object" && itens.map((lista, key) => 
      <View key={key} style={styles.cardView}>
        <Text style={styles.title3}>{lista.nome}</Text>
        <Text style={styles.text}>{lista.valor}</Text>
      </View>
     )}
  </ScrollView>
}

export default Notas
