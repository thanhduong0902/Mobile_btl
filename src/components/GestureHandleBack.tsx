import {StyleProp, View, ViewStyle} from "react-native";
import React, {ReactElement, useRef} from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";
import Config from "../config";
import {isIOS} from "../utils/device/index";

function GestureHandleBack({
  children,
  style,
  handleBack,
  disable,
}: {
  children: ReactElement;
  style?: StyleProp<ViewStyle>;
  disable?: boolean;
  handleBack?: () => void;
}): ReactElement {
  // Start Gesture handler
  const navigation = useNavigation();
  const {draggingThreshold} = Config;
  const scrollThreshold = 50;
  const startCursorPosition = useRef({
    x: 0,
    y: 0,
  });

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onStart((e) => {
      startCursorPosition.current = {
        x: e.x,
        y: e.y,
      };
    })
    .onEnd((e) => {
      if (Math.abs(e.y - startCursorPosition.current.y) < scrollThreshold) {
        if (e.x - startCursorPosition.current.x > draggingThreshold) {
          if (disable) return null;
          if (handleBack) {
            handleBack();
          } else if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }
      }
    });

  if (isIOS())
    return (
      <GestureHandlerRootView style={style}>
        <GestureDetector gesture={panGesture}>{children}</GestureDetector>
      </GestureHandlerRootView>
    );
  return <View style={style}>{children}</View>;
}

export default GestureHandleBack;
