import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* components */
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
/* screen */
import TabOneScreen from "../screens/TabOne/TabOneScreen";
import ReanimatedScreen from "../screens/TabOne/ReanimatedScreen";
import PanGestureScreen from "../screens/TabOne/PanGestureScreen";
import InterpolateScreen from "../screens/TabOne/InterpolateScreen";
import InterpolateColorScreen from "../screens/TabOne/InterpolateColorScreen";
import PinchGestureHandlerScreen from "../screens/TabOne/PinchGestureHandlerScreen";
import ScrollViewByPanGestureScreen from "../screens/TabOne/ScrollViewByPanGestureScreen";
import CircularBarScreen from "../screens/TabOne/CircularBarScreen";
/* types */
import { TabOneParamList } from "../types";

export default TabOneNavigator;

export const screens = [
  "Reanimated",
  "PanGesture",
  "Interpolate",
  "InterpolateColor",
  "PinchGestureHandler",
  "ScrollViewByPanGesture",
  "CircularBar",
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
      <TabOneStack.Screen
        name="ScrollViewByPanGestureScreen"
        component={ScrollViewByPanGestureScreen}
      />
      <TabOneStack.Screen
        name="CircularBarScreen"
        component={CircularBarScreen}
      />
    </TabOneStack.Navigator>
  );
}
