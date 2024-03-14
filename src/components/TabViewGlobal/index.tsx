import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {StyleSheet, View} from "react-native";
import {getWindowWidth} from "src/utils/layout/layout";
import {useTheme} from "@react-navigation/native";
import Config from "src/config";
import {
  Route,
  SceneRendererProps,
  TabBar,
  TabView,
} from "react-native-tab-view";
import {isIOS} from "src/utils/device";
import TextGlobal from "../TextGlobal";
import TabAnimation, {TabAnimationRefProps} from "./component/TabAnimation";

// const width = getWindowWidth();

interface TabViewGlobalProps {
  tabViewListTabs: {
    key: string;
    title: string;
  }[];
  renderScene: (
    props: SceneRendererProps & {
      route: Route;
    }
  ) => React.ReactNode;
  isCenter?: boolean;
  startTab?: number;
  isHidden?: boolean;
  isSwipe?: boolean;
  isLoading?: boolean;
  styles?: any;
  setIndexTab?: (value: any) => void;
}

function TabViewGlobal(props: TabViewGlobalProps): ReactElement {
  const {
    tabViewListTabs,
    renderScene,
    startTab = 0,
    isHidden = false,
    isSwipe = true,
    isLoading = false,
    styles,
    setIndexTab,
  } = props;

  const ref = useRef<TabAnimationRefProps>(null);

  const theme = useTheme();

  const [index, setIndex] = useState(startTab);

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const timeOutDisplay = setTimeout(() => {
      setDisplay(true);
    }, 0);
    return () => {
      clearTimeout(timeOutDisplay);
    };
  }, []);

  // Start render lazy load
  const renderLazyLoadView = (): ReactNode => <View />;

  useEffect(() => {
    if (setIndexTab) {
      setIndexTab(index);
    }
  }, [index]);

  return (
    <TabAnimation ref={ref}>
      <TabView
        navigationState={{
          index,
          routes: tabViewListTabs,
        }}
        lazy
        lazyPreloadDistance={1}
        renderLazyPlaceholder={renderLazyLoadView}
        swipeEnabled={isSwipe}
        renderScene={isLoading || !display ? renderLazyLoadView : renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: getWindowWidth()}}
        renderTabBar={(tabBarProps): ReactElement => (
          <TabBar
            {...tabBarProps}
            pressColor={theme.colors.background}
            indicatorStyle={{display: "none"}}
            tabStyle={style.tabStyle}
            scrollEnabled
            renderLabel={({focused, route}): ReactElement => {
              return (
                <View>
                  <TextGlobal
                    size="medium"
                    style={focused ? style.activeTab : style.normalTab}
                  >
                    {route.title}
                  </TextGlobal>
                  <View style={focused ? style.indicator : null} />
                </View>
              );
            }}
            style={[
              {
                backgroundColor: theme.colors.background,
              },
              style.heightTab,
              isHidden ? {display: "none"} : null,
              styles,
            ]}
          />
        )}
      />
    </TabAnimation>
  );
}

export default TabViewGlobal;

const style = StyleSheet.create({
  activeTab: {
    color: Config.COLOR_CONFIG.BLUE,
    fontSize: 18,
    paddingHorizontal: 5,
  },
  indicator: {
    backgroundColor: Config.COLOR_CONFIG.BLUE,
    height: 2,
    marginTop: 8,
  },
  normalTab: {
    color: Config.COLOR_CONFIG.NEUTRALS_2,
    fontSize: 18,
    paddingHorizontal: 5,
    paddingBottom: 20,
  },
  tabStyle: {
    paddingHorizontal: 7,
    width: "auto",
  },
  heightTab: {
    height: isIOS() ? 42 : 48,
    alignItems: "center",
  },
});
