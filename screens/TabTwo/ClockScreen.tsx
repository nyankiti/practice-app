import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import CircularSlider from "../../components/clock/CircularSlider";
import { PADDING } from "../../components/clock/Constants";
import Container from "../../components/clock/components/Container";

const ClockScreen = () => {
  const hand = useSharedValue(0.5 * Math.PI);
  const top = useSharedValue(0.5 * Math.PI);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>今日の勉強時間</Text>
      <Container hand={hand} top={top}>
        <CircularSlider hand={hand} top={top} />
      </Container>
    </View>
  );
};

export default ClockScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C1B1D",
    padding: PADDING,
  },
  title: {
    fontSize: 36,
    color: "white",
    marginBottom: 32,
  },
});
