import {Alert} from "react-native";

function alert(title: string, message: string): void {
  Alert.alert(title, message);
}

export default {
  alert,
};
