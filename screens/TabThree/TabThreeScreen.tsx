import * as React from "react";
import { StyleSheet, View } from "react-native";
/* components */
import ListItem from "../../components/ListItem";
import { screens } from "../../navigation/TabThreeNavigation";

export default function TabThreeScreen({ navigation }: any) {
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
});
