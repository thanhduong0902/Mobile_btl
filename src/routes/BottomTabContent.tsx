import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Icon from "../utils/Icon";
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
  useTheme,
} from "@react-navigation/native";
import RouteList from "./RouteList";
import Config from "../config";
import {useTranslation} from "react-i18next";
import {isIOS} from "../utils/device";
import {isIphoneX} from "react-native-iphone-x-helper";
import TextGlobal from "../components/TextGlobal";

const {NEUTRALS_5, LIGHT_PRIMARY_1} = Config.COLOR_CONFIG;

const BottomTabContent = React.memo(function BottomTabContent() {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const theme = useTheme().colors;
  const route = useRoute();
  const currentRoute = getFocusedRouteNameFromRoute(route) ?? "StudyRoute";

  const getColor = (name: string, index: number): string => {
    if (currentRoute === undefined) {
      return index === 0 ? LIGHT_PRIMARY_1 : NEUTRALS_5;
    }

    if (name === currentRoute) {
      return LIGHT_PRIMARY_1;
    }

    return NEUTRALS_5;
  };

  return (
    <View style={[styles.main, {backgroundColor: theme.background}]}>
      {RouteList.map(
        ({name, title, icon, isBottom}, index) =>
          isBottom && (
            <TouchableOpacity
              key={name}
              onPress={(): void => {
                // @ts-ignore
                navigation.navigate(name);
              }}
              style={styles.itemContainer}
            >
              <Icon
                icon={icon ?? "question"}
                size={24}
                color={getColor(name, index)}
              />
              <TextGlobal
                style={{
                  color: getColor(name, index),
                  fontSize: 16,
                }}
              >
                {t(title)}
              </TextGlobal>
            </TouchableOpacity>
          )
      )}
    </View>
  );
});

export default BottomTabContent;

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    height: "100%",
    paddingVertical: 7,
    borderTopWidth: 0.5,
    borderColor: NEUTRALS_5,
  },
  main: {
    alignItems: "center",
    bottom: 0,
    display: "flex",
    elevation: 5,
    flexDirection: "row",
    height: isIphoneX() ? 75 : isIOS() ? 65 : 55,
    justifyContent: "space-around",
    left: 0,
    position: "absolute",
    right: 0,
  },
});
