import React, {ReactElement} from "react";
import {View} from "react-native";
import TextGlobal from "../TextGlobal";
import styles from "src/styles/components/headers/HeaderMain";

function HeaderMain(): ReactElement {
  return (
    <View style={styles.root}>
      <TextGlobal>Header</TextGlobal>
    </View>
  );
}

export default HeaderMain;
