import * as React from "react";
import { StyleSheet, View } from "react-native";
import { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

// https://chrizog.com/react-native-rotation-anchor-point  を参考にして実装する

const use2DShareVector = () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  return { x, y };
};

export default function CubeScreen() {
  const vectorFront = use2DShareVector();
  const originCube = {
    x: 0,
    y: 0,
    z: 50,
  };

  const onGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: () => {},
      onActive: ({ translationX, translationY }) => {
        vectorFront.x.value = translationX / 50.0;
        vectorFront.y.value = -translationY / 50.0;
      },
      onEnd: () => {},
    });

  const animatedStyleFront = useAnimatedStyle(() => {
    return {
      transform: [],
    };
  });
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
