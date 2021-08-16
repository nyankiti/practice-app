import React, { useState } from "react";
import { StyleSheet, View, Switch, Dimensions, Text } from "react-native";
// import { Switch } from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  withTiming,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

const Colors = {
  dark: {
    background: "#1E1E1E",
    circle: "#252525",
    text: "#F8F8F8",
  },
  light: {
    background: "#F8F8F8",
    circle: "#FFF",
    text: "#1E1E1E",
  },
};

const SWITCH_TRACK_COLOR = {
  true: "rgba(256, 0, 256, 0.2)",
  false: "rgba(0,0,0,0.1)",
};

const SIZE = Dimensions.get("window").width * 0.7;

type Theme = "light" | "dark";

export default function InterpolateColorScreen() {
  // progressが0のときthimeはlight、progressが1のときthemeはdark
  const [theme, setTheme] = useState<Theme>("light");
  // const progress = useSharedValue(0);
  // sharedValueが任意のstateなどに由来する場合は以下のようにuseDerivedValue()が使える
  const progress = useDerivedValue(() => {
    // withTimingを用いることで値が0と1以外の間の値もとるようになり、スムーズに色が変化するようになる
    // ここでwithTimingを用いることが個人的には一番重要だと感じる
    return theme === "dark" ? withTiming(1) : withTiming(0);
  }, [theme]);

  const reanimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    );
    return {
      backgroundColor: backgroundColor,
    };
  });

  const reanimatedCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle]
    );
    return {
      backgroundColor: backgroundColor,
    };
  });

  const reanimatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text]
    );
    return {
      color: color,
    };
  });

  return (
    <Animated.View style={[styles.container, reanimatedStyle]}>
      <Animated.Text style={[styles.text, reanimatedTextStyle]}>
        THEME
      </Animated.Text>
      <Animated.View style={[styles.circle, reanimatedCircleStyle]}>
        <Switch
          value={theme === "dark"}
          onValueChange={(toggled) => {
            setTheme(toggled ? "dark" : "light");
          }}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor={"violet"}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZE / 2,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 8,
  },
  text: {
    fontSize: 70,
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 14,
    marginBottom: 35,
  },
});
