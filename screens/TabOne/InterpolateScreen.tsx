import * as React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Page from "../../components/Page";

const WORDS = ["what's", "up", "mobile", "devs?"];

export default function InterpolateScreen() {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    // console.log(event.contentOffset.x);
    translateX.value = event.contentOffset.x;
  });

  return (
    // ScrollView に horizontal属性を与えると横にスライドするようになる
    <Animated.ScrollView
      // pagingEnabledを指定するとページの間で止まらなくなる
      pagingEnabled
      onScroll={scrollHandler}
      // scrollイベントが生じている16ミリ秒ごとにonScrollのコールバックを実行することを指定している
      scrollEventThrottle={16}
      horizontal
      style={styles.container}
    >
      {WORDS.map((title, index) => {
        return (
          <Page
            key={index.toString()}
            title={title}
            index={index}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
