import {StyleSheet} from "react-native";
import Config from "../../../config";

const {WHITE} = Config.COLOR_CONFIG;

export const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: WHITE,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
});
