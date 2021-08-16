import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* components */
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
/* screen */
import TabOneScreen from "../screens/TabOneScreen";
import ReanimatedScreen from "../screens/ReanimatedScreen";
import PanGestureScreen from "../screens/PanGestureScreen";
import InterpolateScreen from "../screens/InterpolateScreen";
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
      <TabOneStack.Screen
        name="PanGestureScreen"
        component={PanGestureScreen}
      />
      <TabOneStack.Screen
        name="InterpolateScreen"
        component={InterpolateScreen}
      />
    </TabOneStack.Navigator>
  );
}
