import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* components */
/* screen */
import AudioListScreen from "../screens/MusicPlayer/AudioListScreen";
import PlayListScreen from "../screens/MusicPlayer/PlayListScreen";
import PlayerScreen from "../screens/MusicPlayer/PlayerScreen";
/* types */
import { MusicPlayerParamList } from "../types";

export default MusicPlayerNavigator;

export const screens = [];

const MusicPlayerStack = createStackNavigator<MusicPlayerParamList>();

function MusicPlayerNavigator() {
  return (
    <MusicPlayerStack.Navigator>
      <MusicPlayerStack.Screen
        name="AudioListScreen"
        component={AudioListScreen}
        options={{ headerTitle: "Audio List" }}
      />
      <MusicPlayerStack.Screen
        name="PlayListScreen"
        component={PlayListScreen}
      />
      <MusicPlayerStack.Screen name="PlayerScreen" component={PlayerScreen} />
    </MusicPlayerStack.Navigator>
  );
}
