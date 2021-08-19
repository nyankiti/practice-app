import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import CircularSlider from "../../components/bedtime/CircularSlider";
import { PADDING } from "../../components/bedtime/Constants";
import Container from "../../components/bedtime/components/Container";

const BedtimeScreen = () => {
  const start = useSharedValue(0.5 * Math.PI);
  const end = useSharedValue(0.5 * Math.PI);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>今日の勉強時間</Text>
      <Container start={start} end={end}>
        <CircularSlider start={start} end={end} />
      </Container>
    </View>
  );
};

export default BedtimeScreen;

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
