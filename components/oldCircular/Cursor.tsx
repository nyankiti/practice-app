import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  add,
  cond,
  lessThan,
  proc,
  set,
  useCode,
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import {
  canvas2Polar,
  cartesian2Polar,
  polar2Canvas,
} from "react-native-redash";
import {
  usePanGestureHandler,
  withOffset,
} from "react-native-redash/lib/module/v1";

interface CursorProps {
  r: number;
  theta: any;
  strokeWidth: number;
  backgroundColor: Animated.Node<number>;
}

type ContextInterface = {
  translateX: number;
  translateY: number;
};

const { PI } = Math;
const { width, height } = Dimensions.get("window");
const CENTER = { x: width / 2, y: height / 2 };

const Cursor = ({ r, theta, strokeWidth, backgroundColor }: CursorProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextInterface
  >({
    onStart: (event, context) => {
      // contextはjesture中に自在にアクセスできるobject 自分が必要な値をstart時にもたせて置くことで、他のeventの際にその値を参照できる
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      // console.log(event);
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: (event) => {},
  });

  const reanimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      theta.value,
      [0, PI, 2 * PI],
      ["#ff3884", "#3884ff", "#38ffb3"]
    );
    return {
      backgroundColor: backgroundColor,
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            width: strokeWidth,
            height: strokeWidth,
            borderRadius: strokeWidth / 2,
            borderColor: "white",
            borderWidth: 5,
          },
          reanimatedStyle,
        ]}
      />
    </PanGestureHandler>
  );
};

export default Cursor;
