import * as React from "react";
import { StyleSheet, View } from "react-native";
/* components */
import Page2 from "../../components/Page2";

const titles = ["what's", "up", "mobile", "devs?"];

export default function ScrollViewByPanGestureScreen() {
  return (
    <View style={styles.container}>
      {titles.map((title, index) => {
        return <Page2 key={index.toString()} title={title} index={index} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
