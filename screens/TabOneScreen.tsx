import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

/* components */
import ListItem from "../components/ListItem";

const SIZE = 100.0;

export default function TabOneScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <ListItem
        title="Reanimated"
        onPress={() => {
          navigation.navigate("ReanimatedScreen");
        }}
      />
      <ListItem
        title="PanGesture"
        onPress={() => {
          navigation.navigate("PanGestureScreen");
        }}
      />
      <ListItem
        title="Interpolate"
        onPress={() => {
          navigation.navigate("InterpolateScreen");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
