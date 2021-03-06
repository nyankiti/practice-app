import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import color from "../../data/color";

const convertTime = (time: number) => {
  const minute = Math.floor(time / 60);
  const sec = time % 60;
  if (minute < 10 && sec < 10) {
    return `0${minute}:0${sec}`;
  }
  if (minute < 10) {
    return `0${minute}:${sec}`;
  }
  if (sec < 10) {
    return `${minute}:0${sec}`;
  }
  return `${minute}:${sec}`;
};

type Props = {
  title: string;
  duration: string;
  onOptionPress: any;
  onAudioPress: any;
  isPlaying: boolean;
  activeListItem: boolean;
};

const renderPlayPauseIcon = (isPlaying: boolean) => {
  if (isPlaying)
    return (
      <Entypo name="controller-paus" size={24} color={color.ACTIVE_FONT} />
    );
  return <Entypo name="controller-play" size={24} color={color.ACTIVE_FONT} />;
};

const AudioListItem = ({
  title,
  duration,
  onOptionPress,
  onAudioPress,
  isPlaying,
  activeListItem,
}: Props) => {
  return (
    <>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onAudioPress}>
          <View style={styles.leftContainer}>
            <View
              style={[
                styles.thumbnail,
                {
                  backgroundColor: activeListItem
                    ? color.ACTIVE_BG
                    : color.FONT_LIGHT,
                },
              ]}
            >
              <Text style={styles.thumbnailText}>
                {activeListItem ? renderPlayPauseIcon(isPlaying) : "A"}
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Text numberOfLines={1} style={styles.title}>
                {title}
              </Text>
              <Text numberOfLines={1} style={styles.timeText}>
                {convertTime(Number(duration))}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.rightContainer}>
          <Entypo
            onPress={onOptionPress}
            name="dots-three-vertical"
            size={20}
            color={color.FONT_MEDIUM}
            style={{ padding: 10 }}
          />
        </View>
      </View>
      <View style={styles.separator} />
    </>
  );
};

export default AudioListItem;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    width: width - 80,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rightContainer: {
    flexBasis: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnail: {
    height: 50,
    flexBasis: 50,
    backgroundColor: color.FONT_LIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  thumbnailText: {
    fontSize: 22,
    fontWeight: "bold",
    color: color.FONT,
  },
  titleContainer: {
    width: width - 180,
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    color: color.FONT,
  },
  timeText: {
    fontSize: 14,
    color: color.FONT_LIGHT,
  },
  separator: {
    width: width - 80,
    backgroundColor: "#333",
    opacity: 0.3,
    height: 0.5,
    alignSelf: "center",
    marginVertical: 10,
  },
});
