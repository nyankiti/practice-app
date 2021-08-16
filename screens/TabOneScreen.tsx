import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { screens } from "../navigation/TabOneNavigation";
/* components */
import ListItem from "../components/ListItem";

export default function TabOneScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {screens.map((screen, index) => {
        return (
          <ListItem
            key={index.toString()}
            title={screen}
            onPress={() => {
              navigation.navigate(`${screen}Screen`);
            }}
          />
        );
      })}
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
