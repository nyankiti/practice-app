import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* components */
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
/* screen */
import ReanimatedScreen from "../screens/ReanimatedScreen";
import TabOneScreen from "../screens/TabOneScreen";
/* types */
import { TabOneParamList } from "../types";

export default TabOneNavigator;

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: "Tab One Title" }}
      />
      <TabOneStack.Screen
        name="ReanimatedScreen"
        component={ReanimatedScreen}
      />
    </TabOneStack.Navigator>
  );
}
