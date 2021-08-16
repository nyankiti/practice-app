import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from "react-native-reanimated";

const SIZE = 100.0;

export default function ReanimatedScreen() {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const handleRotation = (progress: Animated.SharedValue<number>) => {
    /*
    reanimatedなどのUI Threadで実行される関数は以下のように"worklet"と指定することでUI Threadの関数として実行できる
    これがないとエラーになるのでreanimatedを使う際は注意
    UI Thread と JS Threadの関係については https://www.youtube.com/watch?v=wEVjaXK4sYQ  の動画を参考にするとわかりやすい
    */
    "worklet";
    return `${progress.value * 2 * Math.PI}rad`;
  };

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }],
    };
  }, []);

  useEffect(() => {
    // withTimingよりwithSpringを使った方が良いらしい。
    // withTiming: duration, timingなどに由来
    // withSpring: durationに由来しない。spring animationに由来(animataionを適用するobjectそのものの動きに由来するので、時間だけに依存するwithTimingより安全？？)
    progress.value = withRepeat(withSpring(0.5), 3, true);
    scale.value = withRepeat(withSpring(1), 3, true);
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          { height: SIZE, width: SIZE, backgroundColor: "blue" },
          reanimatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
