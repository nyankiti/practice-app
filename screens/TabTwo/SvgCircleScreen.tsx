import * as React from "react";
import { StyleSheet, View, Dimensions, PixelRatio } from "react-native";
import Animated, {
  useSharedValue,
  interpolateColor,
} from "react-native-reanimated";
// import { interpolateColor, useValue } from "react-native-redash/lib/module/v1";
/* components */
import CircularProgress from "../../components/oldCircular/CircularProgress";
import Cursor from "../../components/oldCircular/Cursor";

const { PI } = Math;
const { width } = Dimensions.get("window");
const size = width - 32;
const STROKE_WIDTH = 40;
const r = PixelRatio.roundToNearestPixel(size / 2);

export default function SvgCircleScreen() {
  // const theta = useValue(0);
  const theta = useSharedValue(0);

  const backgroundColor = interpolateColor(
    theta.value,
    [0, PI, 2 * PI],
    ["#ff3884", "#3884ff", "#38ffb3"]
  );
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <CircularProgress
            strokeWidth={STROKE_WIDTH}
            color={backgroundColor}
            {...{ r, theta }}
          />
        </Animated.View>
        <Cursor
          strokeWidth={STROKE_WIDTH}
          r={r - STROKE_WIDTH / 2}
          {...{ backgroundColor, theta }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "-90deg" }],
  },
  content: {
    width: r * 2,
    height: r * 2,
  },
});
