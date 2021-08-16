import React from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface PageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const { width, height } = Dimensions.get("window");
const SIZE = width * 0.7;

const Page: React.FC<PageProps> = ({ title, index, translateX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const reanimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    );

    return {
      borderRadius: borderRadius,
      transform: [{ scale: scale }],
    };
  });

  const reanimatedTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP
    );

    return {
      opacity: opacity,
      transform: [
        {
          translateY: translateY,
        },
      ],
    };
  });

  return (
    <View
      style={[
        style.pageContainer,
        { backgroundColor: `rgba(0,0,256,0.${index + 2})` },
      ]}
    >
      <Animated.View style={[style.square, reanimatedStyle]} />
      <Animated.View style={[{ position: "absolute" }, reanimatedTextStyle]}>
        <Text style={style.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const style = StyleSheet.create({
  pageContainer: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "rgba(0,0,256,0.4)",
  },
  text: {
    fontSize: 70,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "700",
  },
});

export default Page;
