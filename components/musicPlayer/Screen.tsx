import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import color from "../../data/color";

const Screen: React.FC = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.APP_BG,
    paddingTop: StatusBar.currentHeight,
  },
});

export default Screen;
