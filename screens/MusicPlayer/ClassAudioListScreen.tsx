import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { fetchAudioForClassComponent } from "../../utils/fetchAudio";
import { Audio, AVPlaybackStatus } from "expo-av";
/* components */
import AudioListItem from "../../components/musicPlayer/AudioListItem";
import Screen from "../../components/musicPlayer/Screen";
import OptionModal from "../../components/musicPlayer/OptionModal";
/* types */
import { Song, PlaybackStatus } from "../../types";
/* utils */
import { play, pause, resume, playNext } from "../../utils/AudioController";
import { storeAudioForNextOpening } from "../../utils/helper";
/* context */
import { AudioContext } from "../../context/ClassAudioProvider";

const AudioListScreen = () => {
  const context = useContext(AudioContext);

  const [currentItem, setCurrentItem] = useState<Song>({}); // 現在選択されているSongsオブジェクト
  // const [songs, setSongs] = useState<Song[]>([]); // fetchAudioによって取得した全ての音声
  const [optionModalVisible, setOptionModalVisible] = useState(false); // Modalの開閉
  useEffect(() => {
    context.loadPreviousAudio();
    fetchAudioForClassComponent(context);
  }, []);

  const handleAudioPress = async (audio: Song, index: number) => {
    // playinf audio for the first time
    if (context.soundObj === null) {
      const playbackObj = new Audio.Sound();
      const status: AVPlaybackStatus = await play(
        playbackObj,
        audio.enclosures[0].url
      );
      context.updateState(context, {
        playbackObj: playbackObj,
        currentAudio: audio,
        currentAudioIndex: index,
        isPlaying: true,
        soundObj: status,
      });
      playbackObj.setOnPlaybackStatusUpdate(
        () => context.onPlaybackStatusUpdate
      );
      return storeAudioForNextOpening(audio, index);
    }

    // pause audio
    if (
      context.soundObj.isLoaded &&
      context.soundObj.isPlaying &&
      context.currentAudio.id === audio.id
    ) {
      const status = await pause(context.playbackObj);
      return context.updateState(context, {
        isPlaying: false,
        soundObj: status,
      });
    }

    // resume audio
    if (
      context.soundObj.isLoaded &&
      !context.soundObj.isPlaying &&
      context.currentAudio.id === audio.id
    ) {
      const status = await resume(context.playbackObj);
      return context.updateState(context, {
        isPlaying: true,
        currentAudioIndex: index,
        soundObj: status,
      });
    }

    // select another audio
    if (context.soundObj.isLoaded && context.currentAudio.id !== audio.id) {
      const status = await playNext(
        context.playbackObj,
        audio.enclosures[0].url
      );
      context.updateState(context, {
        currentAudio: audio,
        isPlaying: true,
        soundObj: status,
      });
      return storeAudioForNextOpening(audio, index);
    }
  };

  return (
    <Screen>
      {context.songs.map((item, index) => {
        return (
          <AudioListItem
            key={item.id}
            title={item.title}
            isPlaying={context.isPlaying}
            activeListItem={context.currentAudioIndex === index}
            duration={item.itunes.duration}
            onOptionPress={() => {
              setCurrentItem(item);
              setOptionModalVisible(true);
            }}
            onAudioPress={() => handleAudioPress(item, index)}
          />
        );
      })}
      <OptionModal
        currentItem={currentItem}
        visible={optionModalVisible}
        onClose={() => setOptionModalVisible(false)}
        onPlayPress={() => {}}
        onPlayListPress={() => {}}
      />
    </Screen>
  );
};

export default AudioListScreen;

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
