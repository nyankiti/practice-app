import React from "react";
import Animated, {
  useAnimatedProps,
  interpolate,
  Extrapolate,
  useSharedValue,
} from "react-native-reanimated";
import { Vector, canvas2Polar } from "react-native-redash";
import { Circle, G, Line, Polygon, Path } from "react-native-svg";

import { STROKE, CENTER, SIZE, calcLotation, PI } from "./Constants";

const r = STROKE / 2;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);
const AnimatedGroup = Animated.createAnimatedComponent(G);
const AnimatedPath = Animated.createAnimatedComponent(Path);

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
  const interpolateReanimatedProps = useAnimatedProps(() => {
    const rotate = interpolate(
      theta.value,
      [0.5 * PI, 0, -0.5 * PI, -PI, 0.5 * PI],
      [0, 90, 180, 270, 360],
      Extrapolate.CLAMP
    );
    return {};
  });

  const animatedProps = useAnimatedProps(() => {
    const { x, y } = pos.value;
    return {
      cx: x,
      cy: y,
      r,
    };
  });

  const animatedLineProps = useAnimatedProps(() => {
    const { x, y } = pos.value;
    return {
      x2: x,
      y2: y,
    };
  });

  const animatedPolygonProps = useAnimatedProps(() => {
    const { x, y } = pos.value;
    const rotate = interpolate(
      theta.value,
      [0, 2 * PI],
      [0, 360],
      Extrapolate.CLAMP
    );

    console.log("theta: " + theta.value);
    console.log("rotate: " + rotate);
    console.log(topPos.value);
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
    // const rotate = interpolate(
    //   theta.value,
    //   [0, 2 * PI],
    //   [-90, 360],
    //   Extrapolate.CLAMP
    // );
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
  const animatedPathProps = useAnimatedProps(() => {
    const { x, y } = pos.value;
    const interpolateRotating = interpolate(
      theta.value,
      [0, 1],
      [1, 0],
      Extrapolate.CLAMP
    );
    return {
      d: `M${SIZE / 2} ${SIZE / 2}L${x} ${y}L${x + 20} ${y}`,
    };
  });

  return (
    <>
      <Line
        id="secondHandLine"
        // 中心
        x1={SIZE / 2}
        y1={SIZE / 2}
        // 先
        x2={topPos.value.x}
        y2={topPos.value.y + 60}
        fill="skyblue"
        stroke="skyblue"
        strokeWidth="10"
        markerEnd="url(#arrow)"
      />
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
        {/* <AnimatedCircle animatedProps={animatedProps} fill="#FD9F07" /> */}
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
