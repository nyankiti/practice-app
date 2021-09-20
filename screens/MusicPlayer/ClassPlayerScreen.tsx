import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Screen from "../../components/musicPlayer/Screen";
import color from "../../data/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { AudioContext } from "../../context/ClassAudioProvider";
import { play, pause, resume, playNext } from "../../utils/AudioController";
/* components */
import PlayerButton from "../../components/musicPlayer/PlayerButton";
import { storeAudioForNextOpening } from "../../utils/helper";

const { width } = Dimensions.get("window");

const PlayerScreen = () => {
  // const {
  //   currentAudioIndex,
  //   totalAudioCount,
  //   currentAudio,
  //   isPlaying,
  //   playbackPosition,
  //   playbackDuration,
  //   loadPreviousAudio,
  // } = useContext(AudioContext);
  const context = useContext(AudioContext);

  const calculateSeebBar = () => {
    console.log("totalAudioCount: " + context.totalAudioCount);
    console.log("playbackDuration: " + context.playbackDuration);
    if (
      context.playbackPosition !== null &&
      context.playbackDuration !== null
    ) {
      return context.playbackPosition / context.playbackDuration;
    }
    return 0;
  };

  useEffect(() => {
    // AudioListScreenのuseEffectが間に合わずにPlayerScreenを開かれた際にcurrentAudioを登録する処理
    context.loadPreviousAudio();
  }, []);

  const handlePlayPause = async () => {
    //play
    console.log("aaa");
    if (context.soundObj === null) {
      console.log("aa");
      const audio = context.currentAudio;
      const status = await play(context.playbackObj, audio.enclosures[0].url);
      context.playbackObj.setOnPlaybackStatusUpdate(
        context.onPlaybackStatusUpdate
      );
      return context.updateState(context, {
        soundObj: status,
        currentAudio: audio,
        currentAudioIndex: context.currentAudioIndex,
        isPlaying: true,
      });
    }
    //pause
    if (context.soundObj && context.soundObj.isPlaying) {
      const status = await pause(context.playbackObj);
      return context.updateState(context, {
        soundObj: status,
        isPlaying: false,
      });
    }
    //resume
    if (context.soundObj && !context.soundObj.isPlaying) {
      const status = await resume(context.playbackObj);
      return context.updateState(context, {
        soundObj: status,
        isPlaying: true,
      });
    }
  };

  const handlePrevious = async () => {
    // await changeAudio(context, 'previous');
    const { isLoaded } = await context.playbackObj.getStatusAsync();
    if (context.currentAudioIndex !== null) {
      const isFirstAudio = context.currentAudioIndex <= 0;
      let audio = context.songs[context.currentAudioIndex - 1];
      let index;
      let status;

      if (!isLoaded && !isFirstAudio) {
        index = context.currentAudioIndex - 1;
        status = await play(context.playbackObj, audio.enclosures[0].url);
      }

      if (isLoaded && !isFirstAudio) {
        index = context.currentAudioIndex - 1;
        status = await playNext(context.playbackObj, audio.enclosures[0].url);
      }

      if (isFirstAudio) {
        index = context.totalAudioCount - 1;
        audio = context.songs[index];
        if (isLoaded) {
          status = await playNext(context.playbackObj, audio.enclosures[0].url);
        } else {
          status = await play(context.playbackObj, audio.enclosures[0].url);
        }
      }

      context.updateState(context, {
        currentAudio: audio,
        playbackObj: context.playbackObj,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
        playbackPosition: null,
        playbackDuration: null,
      });
      storeAudioForNextOpening(audio, index);
    }
  };

  const handleNext = async () => {
    const { isLoaded } = await context.playbackObj.getStatusAsync();
    if (context.currentAudioIndex !== null) {
      const isLastAudio =
        context.currentAudioIndex + 1 === context.totalAudioCount;
      let audio = context.songs[context.currentAudioIndex + 1];
      let index;
      let status;
      if (!isLoaded && !isLastAudio) {
        index = context.currentAudioIndex + 1;
        status = await play(context.playbackObj, audio.enclosures[0].url);
      }

      if (isLoaded && isLastAudio) {
        index = context.currentAudioIndex + 1;
        status = await playNext(context.playbackObj, audio.enclosures[0].url);
      }

      if (isLastAudio) {
        index = 0;
        audio = context.songs[index];
        if (isLoaded) {
          status = await playNext(context.playbackObj, audio.enclosures[0].url);
        } else {
          status = await play(context.playbackObj, audio.enclosures[0].url);
        }
      }

      context.updateState(context, {
        currentAudio: audio,
        playbackObj: context.playbackObj,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
        playbackPosition: null,
        playbackDuration: null,
      });
      storeAudioForNextOpening(audio, index);
    }
  };

  if (!context.currentAudio) return null;

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.audioCount}>
          {context.currentAudioIndex
            ? `${context.currentAudioIndex + 1} / ${context.totalAudioCount}`
            : null}
        </Text>
        <View style={styles.midBannerContainer}>
          <MaterialCommunityIcons
            name="music-circle"
            size={300}
            color={context.isPlaying ? color.ACTIVE_BG : color.FONT_MEDIUM}
          />
        </View>
        <View style={styles.audioPlayerContainer}>
          <Text numberOfLines={1} style={styles.audioTitle}>
            {context.currentAudio.title}
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
          <PlayerButton onPress={handlePrevious} iconType="PREV" />
          <PlayerButton
            onPress={handlePlayPause}
            style={{ marginHorizontal: 25 }}
            iconType={context.isPlaying ? "PLAY" : "PAUSE"}
          />
          <PlayerButton onPress={handleNext} iconType="NEXT" />
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
