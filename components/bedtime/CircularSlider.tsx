import React from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { polar2Canvas } from "react-native-redash";
import Svg, { Defs, Mask, Path } from "react-native-svg";

import {
  SIZE,
  STROKE,
  R,
  PI,
  CENTER,
  arc,
  absoluteDuration,
} from "./Constants";
import Cursor from "./Cursor";
import FixedCursor from "./FixedCursor";
import Gesture from "./Gesture";
import Quadrant from "./components/Quadrant";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface CircularProps {
  // numberには中心角が入る startなら0.5 * Math.PI(一番上の点)
  start: Animated.SharedValue<number>;
  end: Animated.SharedValue<number>;
}

/*
redash公式サイトより
export declare const polar2Canvas: ({ theta, radius }: PolarPoint, center: Point) => {
    x: Animated.Node<number>;
    y: Animated.Node<number>;
};
*/

const CircularSlider = ({ start, end }: CircularProps) => {
  // 各posには右のような型が適用されている SharedValue<Vector<number>>
  // Vecotr型はredashによって提供される polar2Canvasは{theat(角度),radisu(半径)}とCENTER(中心)を引数として渡すことで、その極のx,y座標を持ったVector型を返す 日本語にすると 極 to 座標
  const startPos = useDerivedValue(() =>
    polar2Canvas({ theta: start.value, radius: R }, CENTER)
  );
  // const startPos = useSharedValue(
  //   polar2Canvas({ theta: start.value, radius: R }, CENTER)
  // );

  const endPos = useDerivedValue(() =>
    // polar2Canvasは極(円)の情報を渡すことで、x,y座標を返す。それがSharedValue形式でposに格納される
    polar2Canvas({ theta: end.value, radius: R }, CENTER)
  );

  const animatedProps = useAnimatedProps(() => {
    // polar2Canvasの返り値である各posのvalueであるp1,p2にはx,y座標が格納されている
    const p1 = startPos.value;
    const p2 = endPos.value;
    const duration = absoluteDuration(start.value, end.value);
    return {
      d: `M ${p1.x} ${p1.y} ${arc(p2.x, p2.y, duration > PI)}`,
    };
  });
  return (
    <View>
      <Svg width={SIZE} height={SIZE}>
        <Defs>
          <Mask id="mask">
            {/* 以下のAnimatedPathがスタートとストップの間の線。それぞれのポジションによって長さが変わる。その長さの情報をreanimatedPropsによって受け渡している */}
            <AnimatedPath
              stroke="#FD9F07"
              strokeWidth={STROKE}
              animatedProps={animatedProps}
            />
          </Mask>
        </Defs>
        <Quadrant />
        <Cursor pos={startPos} topPos={endPos} theta={start} />
        {/* <FixedCursor pos={endPos} /> */}
      </Svg>
      <Gesture start={start} end={end} startPos={startPos} endPos={endPos} />
    </View>
  );
};

export default CircularSlider;
