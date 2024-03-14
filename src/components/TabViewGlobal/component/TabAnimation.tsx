import React, {
  useCallback,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {Dimensions, StyleSheet} from "react-native";
import {getWindowHeight, getScreenWidth} from "../../../utils/layout/layout";

const MAX_TRANSLATE_Y = -getWindowHeight();
type TabAnimationProps = {
  children?: React.ReactNode;
  top?: number;
};

export type TabAnimationRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const TabAnimation = React.forwardRef<TabAnimationRefProps, TabAnimationProps>(
  ({children, top = 40}, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(true);

    const scrollTo = useCallback((destination: number) => {
      "worklet";

      active.value = destination !== MAX_TRANSLATE_Y;

      translateY.value = withSpring(destination, {overshootClamping: true});
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({scrollTo, isActive}), [
      scrollTo,
      isActive,
    ]);

    const rTabAnimationStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP
      );
      return {
        borderRadius,
        transform: [{translateY: translateY.value}],
      };
    });

    // screen
    const [widthScreen, setWidthScreen] = useState(getScreenWidth());

    useEffect(() => {
      Dimensions.addEventListener("change", ({window: {width, height}}) => {
        setWidthScreen(getScreenWidth());
      });
    }, []);

    return (
      <Animated.View
        style={[
          styles.tabNews,
          rTabAnimationStyle,
          {top: top, width: widthScreen},
        ]}
      >
        {children}
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  root: {
    height: "100%",
    width: "100%",
  },
  tabNews: {
    flex: 1,
    height: "100%",
    position: "absolute",
  },
});

TabAnimation.displayName = "TabAnimation";
export default TabAnimation;
