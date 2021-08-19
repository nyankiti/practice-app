import React from "react";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { Vector } from "react-native-redash";
import { Circle } from "react-native-svg";

import { STROKE } from "./Constants";

const r = STROKE / 2;
// const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CursorProps {
  pos: Animated.SharedValue<Vector>;
}

const FixedCursor = ({ pos }: CursorProps) => {
  // const animatedProps = useAnimatedProps(() => {
  //   const { x, y } = pos.value;
  //   return {
  //     cx: x,
  //     cy: y,
  //     r,
  //   };
  // });
  return <Circle cx={pos.value.x} cy={pos.value.y} r={r} fill="#FD9F07" />;
};

export default FixedCursor;
