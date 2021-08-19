import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* components */
/* screen */
import TabTwoScreen from "../screens/TabThree/TabThreeScreen";
import CubeScreen from "../screens/TabThree/CubeScreen";
/* types */
import { TabThreeParamList } from "../types";

export default TabThreeNavigator;

export const screens = ["Cube"];

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Tab Three Title" }}
      />
      <TabThreeStack.Screen name="CubeScreen" component={CubeScreen} />
    </TabThreeStack.Navigator>
  );
}
