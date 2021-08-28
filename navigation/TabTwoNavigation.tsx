import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* screen */
import TabTwoScreen from "../screens/TabTwo/TabTwoScreen";
import SvgCircleScreen from "../screens/TabTwo/SvgCircleScreen";
import ClockScreen from "../screens/TabTwo/ClockScreen";
import CubeScreen from "../screens/TabTwo/CubeScreen";
/* types */
import { TabTwoParamList } from "../types";

export default TabTwoNavigator;

export const screens = ["SvgCircle", "Clock", "Cube"];

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
      <TabTwoStack.Screen name="ClockScreen" component={ClockScreen} />
      <TabTwoStack.Screen name="CubeScreen" component={CubeScreen} />
    </TabTwoStack.Navigator>
  );
}
