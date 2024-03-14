import React, {ReactElement, useCallback} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import RouteList from "./RouteList";
import BottomTabContent from "./BottomTabContent";
import {lightTheme} from "../themes/light";
import {createStackNavigator} from "@react-navigation/stack";
import {StackCardStyleInterpolator} from "@react-navigation/stack/lib/typescript/src/types";
import {Animated} from "react-native";

const customAnimation: {
  cardStyleInterpolator: StackCardStyleInterpolator;
} = {
  cardStyleInterpolator: ({current, next, inverted, layouts: {screen}}) => {
    const progress = Animated.add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: "clamp",
      }),

      next
        ? next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: "clamp",
          })
        : 0
    );

    return {
      cardStyle: {
        transform: [
          {
            translateX: Animated.multiply(
              progress.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [screen.width, 0, -0.3 * screen.width],
                extrapolate: "clamp",
              }),
              inverted
            ),
          },
        ],
      },
    };
  },
};

/*
Bottom Tab
 */

const BottomTab = createBottomTabNavigator();

function BottomTabScreen(): ReactElement {
  const tabBar = useCallback((): ReactElement => <BottomTabContent />, []);

  return (
    <BottomTab.Navigator tabBar={tabBar} screenOptions={{headerShown: false}}>
      {RouteList.map(
        ({name, component, isBottom}) =>
          isBottom && (
            // @ts-ignore
            <BottomTab.Screen name={name} component={component} key={name} />
          )
      )}
    </BottomTab.Navigator>
  );
}

const StackNavigator = createStackNavigator();

function StackScreen(): ReactElement {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="StudyRoute"
    >
      <StackNavigator.Screen name="BottomTab" component={BottomTabScreen} />
      {RouteList.map(({name, component, isBottom}) => {
        if (!isBottom) {
          return (
            <StackNavigator.Screen
              options={customAnimation}
              name={name}
              // @ts-ignore
              component={component}
              key={name}
            />
          );
        }
        return null;
      })}
      <StackNavigator.Screen name="BottomTab_1" component={BottomTabScreen} />
    </StackNavigator.Navigator>
  );
}

/*
App navigator
 */
const config = {
  screens: {
    CourseDetailsRoute: {
      path: "payment/:id",
      parse: {
        id: (value: string): string => `${value}`,
      },
    },
  },
};

const linking = {
  prefixes: ["masterkorean://app"],
  config,
};
function AppNavigator(): ReactElement {
  return (
    <NavigationContainer theme={lightTheme} linking={linking}>
      <StackScreen />
    </NavigationContainer>
  );
}
export default AppNavigator;
