import { Modal, Text, TouchableOpacity, View } from "react-native"
import { styles } from "../Styles"

/**
 * @typedef {Function} voidFun
 * @returns {void}
 */

/**
 * @param {Object} param 
 * @param {boolean} param.vis 
 * @param {voidFun} param.setVis 
 * @param {string} param.text 
 */
function Pop({vis, setVis, text}) {
  return <Modal
    visible={vis} 
    animationType="fade"
    transparent={true} 
    onRequestClose={setVis}
    style={styles.modal}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.text}>{text}</Text>
        <TouchableOpacity style={styles.button3} onPress={setVis}>
          <Text style={styles.buttonText1}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
}

export default Pop
