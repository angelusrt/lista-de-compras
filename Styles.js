import { StyleSheet } from "react-native"

const colors = {
  green: '#39BC75',
  black: '#272C31',
  grey: '#3E4F5F',
  white: '#EFFFFC',
  yellow: '#8BDB84',
  blue: '#398875',
  red: '#C8673E'
}

/**@type {import("react-native").ViewStyle}*/
const borderGreyBase = {
  borderRadius: 10,
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: colors.grey
}

/**@type {import("react-native").ViewStyle}*/
const buttonBase = {
  ...borderGreyBase,
  justifyContent: "center",
  paddingVertical: 10,
  paddingHorizontal: 20,
  marginBottom: 20,
}

const styles = StyleSheet.create({
  view: {
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  rowView: {
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    alignContent: "space-between",
  },
  title: {
    color: colors.white,
    fontFamily: "sans-serif",
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 40
  },
  title2: {
    color: colors.white,
    fontFamily: "sans-serif",
    fontSize: 30,
    marginRight: "auto",
    fontWeight: 700,
  },
  title3: {
    color: colors.white,
    fontFamily: "sans-serif",
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 20
  },
  subtitle: {
    color: colors.white,
    fontFamily: "sans-serif",
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 20
  },
  text: {
    color: colors.white,
    fontFamily: "sans-serif",
    fontSize: 20,
    textAlign: "center"
  },
  buttonText1: {
    color: colors.black,
  },
  buttonText2: {
    color: colors.green,
  },
  input: {
    ...borderGreyBase,
    backgroundColor: "transparent",
    color: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
  },
  button1: {
    ...buttonBase,
    marginTop: 20,
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  button2: {
    ...buttonBase,
    backgroundColor: "transparent",
    borderColor: colors.green,
  },
  button3: {
    ...buttonBase,
    marginTop: 20,
    backgroundColor: colors.red,
    borderColor: colors.red,
  },
  button4: {
    ...buttonBase,
    marginBottom: 0,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  centeredView: {
    flex: 1,
    backgroundColor: colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: colors.black,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.black,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  cardView: {
    ...borderGreyBase,
    borderColor: colors.grey,
    backgroundColor: colors.black,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 20,
    padding: 35,
  }
})

export { colors, styles }
