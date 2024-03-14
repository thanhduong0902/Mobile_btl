import CONFIG from "src/config";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: CONFIG.LAYOUT_CONFIG.PADDING_HORIZONTAL,
    height: CONFIG.LAYOUT_CONFIG.HEIGHT_HEADER,
    backgroundColor: "red",
  },
});

export default styles;
