import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Chat from "./Screens/Chat.js";
import Login from "./Screens/Login.js";
import ChatList from "./Screens/ChatList.js";
const Stack = createStackNavigator();

export default function Navigate() {
  const mainOptions = {
    headerStyle: { backgroundColor: "#76D7C4", height: 90 },
    headerTitleStyle: {
      fontWeight: "700",
      color: "#FFF",
      fontSize: 24,
    },
    title: "ChatApp",
    justifyContent: "space-around",
    headerTitleAlign: "center",
    headerLeft: ()=> null,
  };

  const chatOptions = {
    headerStyle: { backgroundColor: "#76D7C4", height: 90 },
    headerTitleStyle: {
      fontWeight: "700",
      color: "#FFF",
      fontSize: 24,
    },
    title: "ChatApp",
    justifyContent: "space-around",
    headerTitleAlign: "center",
    headerTintColor: "#FFF"
  };
;

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={ {headerShown : false }}/>
      <Stack.Screen name="ChatList" component={ChatList} options={mainOptions}/>
      <Stack.Screen name="Chat" component={Chat} options={chatOptions}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}