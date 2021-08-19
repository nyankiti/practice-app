import React from "react";
import Animated, {
  useAnimatedProps,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { Vector } from "react-native-redash";
import { G, Line, Polygon } from "react-native-svg";

import { STROKE, SIZE, PI } from "./Constants";

const r = STROKE / 2;
const AnimatedGroup = Animated.createAnimatedComponent(G);

interface CursorProps {
  pos: Animated.SharedValue<Vector>;
  topPos: Animated.SharedValue<Vector>;
  theta: Animated.SharedValue<number>;
}

/*
theta の値
初め 0.5*PI = 1.57
右 0
左 1+PI = 3.14(-3.14)
下半球はマイナスになる
*/

const Cursor = ({ pos, theta, topPos }: CursorProps) => {
  // 傾きを用いて回転を実現しようとした際のコード 傾きの分母がゼロになる点があるのでうまく行かない
  const animatedPolygonProps = useAnimatedProps(() => {
    const { x, y } = pos.value;
    const rotate = interpolate(
      theta.value,
      [0, 2 * PI],
      [0, 360],
      Extrapolate.CLAMP
    );
    const calcSlope = (x: number, y: number) => {
      return (y - SIZE / 2) / (x - SIZE / 2 + 1);
    };
    const calcVerticalSlope = (x: number, y: number) => {
      return -(x - SIZE / 2) / (y - SIZE / 2 + 1);
    };

    return {
      // rotateは取り敢えず聞いてるっぽい。 あとは調整のみ
      points: `${x + 10},${y + 10 * calcVerticalSlope(x, y)} ${x + 10},${
        y + 10 * calcSlope(x, y)
      } ${x - 10},${y - 10 * calcVerticalSlope(x, y)}`,
      // transform: `rotate(${rotate} ${SIZE / 2} ${SIZE / 2})`,
    };
  });

  const animatedGroupProps = useAnimatedProps(() => {
    const { x, y } = pos.value;
    // 回転具合はinterpokateを用いる
    const calcRotation = () => {
      if (0 <= theta.value && theta.value <= 0.5 * PI) {
        return interpolate(
          theta.value,
          [0, 0.5 * PI],
          [90, 0],
          Extrapolate.CLAMP
        );
      } else {
        return interpolate(
          theta.value,
          [0.5 * PI, 2 * PI],
          [360, 90],
          Extrapolate.CLAMP
        );
      }
    };
    return {
      // 回転中心をtransrateX,Yを使って定めている
      // 詳しくは  https://chrizog.com/react-native-rotation-anchor-point  を参照
      transform: [
        { translateX: SIZE / 2 },
        { translateY: SIZE / 2 },
        { rotate: `${calcRotation()}deg` },
        { translateX: -SIZE / 2 },
        { translateY: -SIZE / 2 },
      ],
    };
  });

  return (
    <>
      <AnimatedGroup animatedProps={animatedGroupProps}>
        <Line
          id="secondHandLine"
          // 中心
          x1={SIZE / 2}
          y1={SIZE / 2}
          // 先
          x2={topPos.value.x}
          y2={topPos.value.y}
          // animatedProps={animatedLineProps}
          fill="skyblue"
          stroke="skyblue"
          strokeWidth="10"
          markerEnd="url(#arrow)"
        />
        <Polygon
          // animatedProps={animatedPolygonProps}
          points={`${topPos.value.x - 10},${topPos.value.y + 10} ${
            topPos.value.x
          },${topPos.value.y - 10} ${topPos.value.x + 10},${
            topPos.value.y + 10
          }`}
          fill="skyblue"
          stroke="skyblue"
          strokeWidth="20"
        />
      </AnimatedGroup>
    </>
  );
};

export default Cursor;
