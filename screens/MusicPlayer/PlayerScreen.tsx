import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Screen from "../../components/musicPlayer/Screen";
import color from "../../data/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { AudioContext } from "../../context/AudioProvider";
/* components */
import PlayerButton from "../../components/musicPlayer/PlayerButton";

const { width } = Dimensions.get("window");

const PlayerScreen = () => {
  const {
    currentAudioIndex,
    totalAudioCount,
    currentAudio,
    isPlaying,
    playbackPosition,
    playbackDuration,
    loadPreviousAudio,
  } = useContext(AudioContext);

  const calculateSeebBar = () => {
    if (playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration;
    }
    return 0;
  };

  useEffect(() => {
    // AudioListScreenのuseEffectが間に合わずにPlayerScreenを開かれた際にcurrentAudioを登録する処理
    loadPreviousAudio();
  }, []);

  if (!currentAudio) return null;

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.audioCount}>
          {currentAudioIndex
            ? `${currentAudioIndex + 1} / ${totalAudioCount}`
            : null}
        </Text>
        <View style={styles.midBannerContainer}>
          <MaterialCommunityIcons
            name="music-circle"
            size={300}
            color={isPlaying ? color.ACTIVE_BG : color.FONT_MEDIUM}
          />
        </View>
        <View style={styles.audioPlayerContainer}>
          <Text numberOfLines={1} style={styles.audioTitle}>
            {currentAudio.title}
          </Text>
        </View>
        <Slider
          style={{ width: width, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          value={calculateSeebBar()}
          minimumTrackTintColor={color.FONT_MEDIUM}
          maximumTrackTintColor={color.ACTIVE_BG}
        />
        <View style={styles.audioController}>
          <PlayerButton onPress={() => {}} iconType="PREV" />
          <PlayerButton
            onPress={() => {}}
            style={{ marginHorizontal: 25 }}
            iconType={isPlaying ? "PLAY" : "PAUSE"}
          />
          <PlayerButton onPress={() => {}} iconType="NEXT" />
        </View>
      </View>
    </Screen>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  audioCount: {
    textAlign: "right",
    padding: 15,
    color: color.FONT_LIGHT,
    fontSize: 14,
  },
  midBannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  audioPlayerContainer: {},
  audioTitle: {
    fontSize: 16,
    color: color.FONT,
    padding: 15,
  },
  audioController: {
    width,
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,
  },
});
