import { StyleSheet } from "react-native";
import Config from "../../../config";

const { WHITE } = Config.COLOR_CONFIG;

export const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 0,
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: WHITE,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
});
