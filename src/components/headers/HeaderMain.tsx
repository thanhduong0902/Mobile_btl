import React, {ReactElement} from "react";
import {StyleSheet, View} from "react-native";
import TextGlobal from "../TextGlobal";

function HeaderMain(): ReactElement {
  return (
    <View style={styles.root}>
      <TextGlobal>Header</TextGlobal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default HeaderMain;
