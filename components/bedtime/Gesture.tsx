import React from "react";
import { StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler } from "react-native-reanimated";
import { canvas2Polar, Vector } from "react-native-redash";

import { CENTER, normalize, STROKE } from "./Constants";
import CursorOverlay from "./CursorOverlay";

const containedInSquare = (value: Vector, center: Vector, side: number) => {
  "worklet";
  const topLeft = { x: center.x - side / 2, y: center.y - side / 2 };
  return (
    value.x >= topLeft.x &&
    value.y >= topLeft.y &&
    value.x <= topLeft.x + side &&
    value.y <= topLeft.y + side
  );
};

enum Region {
  START,
  END,
  MAIN,
}

interface GestureProps {
  // 円の上を移動する要素の中心角がstart endに格納されている
  start: Animated.SharedValue<number>;
  end: Animated.SharedValue<number>;
  // 各posには円の上を移動する要素のx,y座標が格納されている
  startPos: Animated.SharedValue<Vector>;
  endPos: Animated.SharedValue<Vector>;
}

const Gesture = ({ start, end, startPos, endPos }: GestureProps) => {
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    // 以下はcontext(ctx)の型定義
    { offset: number; region: Region }
  >({
    onStart: ({ x, y }, ctx) => {
      // スタートを持っているか、エンドを持っているか、パスのどこかを持っているかで場合分け。
      // スタート or エンドを持っている場合はパスを伸ばすような処理。パスのどこかを持っている場合はパス全体を動かす処理をする
      if (containedInSquare({ x, y }, startPos.value, STROKE)) {
        // context(ctx)はgesture中に自在にアクセスできるobject。 自分が必要な値をstart時にもたせて置くことで、他のeventの際にその値を参照できる
        ctx.region = Region.START;
        ctx.offset = start.value;
      } else if (containedInSquare({ x, y }, endPos.value, STROKE)) {
        // ctx.region = Region.END;
        ctx.offset = end.value;
      } else {
        // ctx.region = Region.MAIN;
        // canvas2Polarはx,y座標を受け取って極の情報(中心角度、半径、中心座標)を返す。日本語にすると 座標 to 極
        const { theta } = canvas2Polar({ x, y }, CENTER);
        ctx.offset = theta;
      }
    },
    onActive: ({ x, y }, ctx) => {
      const { theta } = canvas2Polar({ x, y }, CENTER);
      // offsetは中心角(theta)の値をもたせている
      const delta = theta - ctx.offset;
      if (ctx.region === Region.START || ctx.region === Region.MAIN) {
        start.value = normalize(start.value + delta);
      }
      if (ctx.region === Region.END || ctx.region === Region.MAIN) {
        end.value = normalize(end.value + delta);
      }
      ctx.offset = theta;
    },
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        {/* CursorOverlayはカーソルの円の上に乗っているアイコンを描画するcomponent */}
        {/* <CursorOverlay position={startPos} icon="bed" /> */}
        {/* <CursorOverlay position={endPos} icon="bell" /> */}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Gesture;
