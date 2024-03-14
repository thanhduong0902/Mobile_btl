import React, {PureComponent} from "react";
import {ActivityIndicator, LogBox, View} from "react-native";
import {PersistGate} from "redux-persist/es/integration/react";
import store, {persistor} from "./src/redux/store";
import {Provider} from "react-redux";
import AppNavigator from "./src/routes";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {QueryClient, QueryClientProvider} from "react-query";
import Config from "./src/config";
import "./src/utils/I18n";
import FlashMessage from "react-native-flash-message";
import SplashScreen from "react-native-splash-screen";
import {storage} from "src/storage";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";

LogBox.ignoreAllLogs(true);
// Disable log react-native-gesture-handler
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
]);

function LoadingPersisGate() {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size={30} color="blue" />
    </View>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: Config.NETWORK_CONFIG.RETRY,
    },
  },
});

/**
 *
 */
class App extends PureComponent {
  async componentDidMount(): Promise<void> {
    try {
      // Request permission to show notification for firebase
      messaging().requestPermission();
      messaging().onNotificationOpenedApp(async (remoteMessage) => {
        this.onMessageReceived(remoteMessage);
      });
      messaging().onMessage(async (remoteMessage) => {
        this.onMessageReceived(remoteMessage);
      });
      messaging().setBackgroundMessageHandler(this.onMessageReceived);
      const token = await messaging().getToken();
      storage.set("@device_token", token);
    } catch (e) {
      // TODO Log error
    }

    SplashScreen.hide();
  }

  async onMessageReceived(
    message: FirebaseMessagingTypes.RemoteMessage
  ): Promise<void> {
    if (message.data && message.data.notification) {
      console.log(message);
      // TODO process message
    }
  }

  render() {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={<LoadingPersisGate />} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <View className="flex-1">
                <AppNavigator />
                <FlashMessage position="top" style={{paddingRight: 40}} />
              </View>
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}

export default App;
