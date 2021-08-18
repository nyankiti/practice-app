import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* components */
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
/* screen */
import TabTwoScreen from "../screens/TabTwo/TabTwoScreen";
import SvgCircleScreen from "../screens/TabTwo/SvgCircleScreen";
import BedtimeScreen from "../screens/TabTwo/BedtimeScreen";
/* types */
import { TabTwoParamList } from "../types";

export default TabTwoNavigator;

export const screens = ["SvgCircle", "Bedtime"];

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Tab Two Title" }}
      />
      <TabTwoStack.Screen name="SvgCircleScreen" component={SvgCircleScreen} />
      <TabTwoStack.Screen name="BedtimeScreen" component={BedtimeScreen} />
    </TabTwoStack.Navigator>
  );
}
