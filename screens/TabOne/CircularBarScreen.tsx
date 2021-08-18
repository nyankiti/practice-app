import React, { useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { ReText } from "react-native-redash";

const BACKGROUND_COLOR = "#444B6F";
const BACKGROUND_STROKE_COLOR = "#303858";
const STROKE_COLOR = "#A6E1FA";

const { width, height } = Dimensions.get("window");
// 円周
const CIRCLE_LENGTH = 1000;
// 円周(CIRCLE_LENGTH) = 半径(R) * 2 * PI
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function CircularBarScreen() {
  const progress = useSharedValue(0);

  // useEffect(() => {
  //   progress.value = withTiming(1, { duration: 2000 });
  // }, []);

  const animatedProps = useAnimatedProps(() => ({
    // strokeDashoffsetが0のときprogress barは満タン。 1のときprogress barは空。offsetの意味を考えよう
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });

  const handleOnPress = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 });
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.progressText}>{progressText.value}</Text> */}
      {/* 
      progressText.valueはUI Threadで動いている => javascript Threadで動かさないとここで文字列へ反映されない
      redashが提供するReTextを用いると解決する 
      */}
      <ReText style={styles.progressText} text={progressText} />
      <Svg style={{ position: "absolute" }}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={"round"}
        />
      </Svg>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleOnPress}>
          Run
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontSize: 80,
    color: "rgba(256,256,256,0.7)",
    width: 200,
    textAlign: "center",
  },
  button: {
    position: "absolute",
    bottom: 10,
    width: width * 0.7,
    height: 60,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 25,
    color: "white",
    letterSpacing: 2.0,
  },
});
