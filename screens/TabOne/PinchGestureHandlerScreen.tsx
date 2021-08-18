import * as React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const imageUri =
  "https://images.unsplash.com/photo-1628936969837-e3afd8427bd8?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNTF8fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const { width, height } = Dimensions.get("window");

/* ピンチイン => 2本の指を使って画面上をつまむように操作して画面を縮小させる操作のこと
 * ピンチアウト => 2本の指を使って画面上を広げるように操作して画面を拡大させる操作のこと
 * android emulatorではctrlを押しながら操作することでピンチの操作ができる
 */
export default function PinchGestureHandlerScreen() {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: (event) => {
        // console.log(event);
        scale.value = event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      },
      onEnd: () => {
        scale.value = withTiming(1);
      },
    });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ],
    };
  });

  const reanimatedFocalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
    };
  });

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.View style={{ flex: 1 }}>
        <AnimatedImage
          style={[{ flex: 1 }, reanimatedStyle]}
          source={{ uri: imageUri }}
        />
        <Animated.View style={[styles.focalPoint, reanimatedFocalPointStyle]} />
      </Animated.View>
    </PinchGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: "blue",
    borderRadius: 10,
  },
});
