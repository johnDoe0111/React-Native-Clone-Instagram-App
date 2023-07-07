import React, { useEffect } from "react";
import Autorization from "../screens/AutorizationScreen";
import Homepage from "../screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { checkAutorization } from "../redux/user/authorizationAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function Navigate() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("user");
        if (token) {
          dispatch(checkAutorization());
        }
      } catch (error) {
        console.log("Ошибка при получении токена:", error);
        return null;
      }
    };
    getToken();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Authorization"
          component={Autorization}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Homepage"
          component={Homepage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfilePage"
          component={Profile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
