import React, {ReactElement} from "react";
import {Text, TextProps, StyleSheet} from "react-native";

interface TextGlobalProps extends TextProps {
  size?: "defaut" | "medium" | "bold" | "light";
}

export default function TextGlobal(props: TextGlobalProps): ReactElement {
  const {size = "defaut"} = props;

  let styleType;
  switch (size) {
    case "medium":
      styleType = styles.textMedium;
      break;
    case "bold":
      styleType = styles.textBold;
      break;
    case "light":
      styleType = styles.textLight;
      break;
    default:
      styleType = styles.textDefault;
  }

  return (
    <Text {...props} style={[props.style, styleType]}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  textDefault: {fontFamily: "SFProDisplay-Regular", letterSpacing: 0.5},
  textMedium: {
    fontFamily: "SFProDisplay-Medium",
    letterSpacing: 0.5,
  },
  textBold: {fontFamily: "SFProDisplay-Semibold", letterSpacing: 0.5},
  textLight: {fontFamily: "SFProDisplay-Light", letterSpacing: 0.5},
});
