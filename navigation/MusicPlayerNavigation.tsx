import React from "react";
import { TouchableOpacity, Text } from "react-native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
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

function MusicPlayerNavigator({ navigation }) {
  return (
    <MusicPlayerStack.Navigator>
      <MusicPlayerStack.Screen
        name="AudioListScreen"
        component={AudioListScreen}
        options={{
          headerTitle: "Play List",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("PlayListScreen")}
            >
              <Text>PlayList画面へ</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <MusicPlayerStack.Screen
        name="PlayListScreen"
        component={PlayListScreen}
        options={{
          headerTitle: "Player",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("PlayerScreen")}
            >
              <Text>Player画面へ</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <MusicPlayerStack.Screen name="PlayerScreen" component={PlayerScreen} />
    </MusicPlayerStack.Navigator>
  );
}
