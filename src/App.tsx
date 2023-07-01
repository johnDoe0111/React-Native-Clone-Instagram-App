import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import StackNavigate from "./navigator/Navigator";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { RootSiblingParent } from "react-native-root-siblings";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontLoaded] = useFonts({
    "mt-light": require("./assets/fonts/mt-light.ttf"),
    "mt-regular": require("./assets/fonts/mt-regular.ttf"),
    "mt-medium": require("./assets/fonts/mt-medium.ttf"),
    "mt-bold": require("./assets/fonts/mt-bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }

  return (
    <RootSiblingParent>
      <Provider store={store}>
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
          <StackNavigate />
          <StatusBar style="auto" />
        </SafeAreaView>
      </Provider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
