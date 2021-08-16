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
import InterpolateColorScreen from "../screens/InterpolateColorScreen";
import PinchGestureHandlerScreen from "../screens/PinchGestureHandlerScreen";
/* types */
import { TabOneParamList } from "../types";

export default TabOneNavigator;

export const screens = [
  "Reanimated",
  "PanGesture",
  "Interpolate",
  "InterpolateColor",
  "PinchGestureHandler",
];

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
      <TabOneStack.Screen
        name="InterpolateColorScreen"
        component={InterpolateColorScreen}
      />
      <TabOneStack.Screen
        name="PinchGestureHandlerScreen"
        component={PinchGestureHandlerScreen}
      />
    </TabOneStack.Navigator>
  );
}
