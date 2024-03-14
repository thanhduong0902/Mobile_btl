import React, {ReactElement, useRef} from "react";
import {TouchableNativeFeedback, View} from "react-native";
import {isIOS} from "../utils/device";

export default function TouchableCustom({
  onPress,
  onPressIn,
  ...props
}: any): ReactElement {
  const _touchActivatePositionRef = useRef<any>(null);

  const _onPressIn = (e: {nativeEvent: {pageX: any; pageY: any}}): void => {
    const {pageX, pageY} = e.nativeEvent;

    _touchActivatePositionRef.current = {
      pageX,
      pageY,
    };

    onPressIn?.(e);
  };

  const _onPress = (e: {nativeEvent: {pageX: any; pageY: any}}): void => {
    const {pageX, pageY} = e.nativeEvent;

    const absX = Math.abs(_touchActivatePositionRef.current.pageX - pageX);
    const absY = Math.abs(_touchActivatePositionRef.current.pageY - pageY);
    // Chỉ số nhận onpress
    const dragged = absX > 15 || absY > 15;
    if (!dragged) {
      onPress?.(e);
    }
  };

  return (
    <View>
      {isIOS() ? (
        <TouchableNativeFeedback
          onPressIn={_onPressIn}
          onPress={_onPress}
          {...props}
        >
          {props.children}
        </TouchableNativeFeedback>
      ) : (
        <TouchableNativeFeedback
          onPressIn={_onPressIn}
          onPress={_onPress}
          {...props}
        >
          {props.children}
        </TouchableNativeFeedback>
      )}
    </View>
  );
}
