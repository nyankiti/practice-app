import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import fetchAudio from "../../utils/fetchAudio";
import { Audio, AVPlaybackStatus } from "expo-av";
/* components */
import AudioListItem from "../../components/musicPlayer/AudioListItem";
import Screen from "../../components/musicPlayer/Screen";
import OptionModal from "../../components/musicPlayer/OptionModal";
/* types */
import { Song } from "../../types";
/* utils */
import { play, pause, resume } from "../../utils/AudioController";
/* context */
import { AudioContext } from "../../context/AudioProvider";

const AudioListScreen = () => {
  const {
    soundObj,
    setSoundObj,
    playbackObj,
    setPalybackObj,
    currentAudio,
    setCurrentAudio,
  } = useContext(AudioContext);
  const [currentItem, setCurrentItem] = useState<Song>({}); // 現在選択されているSongsオブジェクト
  // const [soundObj, setSoundObj] = useState<any>(null); //  playbackObj.setStatusAsync()の返り値
  // const [playbackObj, setPalybackObj] = useState<any>(); // playbackObj (new Audio.Sound();の返り値)
  const [songs, setSongs] = useState<Song[]>([]); // fetchAudioによって取得した全ての音声
  // const [currentAudio, setCurrentAudio] = useState<any>(); // 現在再生（停止）されているSongオブジェクト
  const [optionModalVisible, setOptionModalVisible] = useState(false); // Modalの開閉
  useEffect(() => {
    fetchAudio(setSongs);
  }, []);

  const handleAudioPress = async (audio: Song) => {
    // playinf audio for the first time
    if (soundObj === null) {
      const playbackObj = new Audio.Sound();
      const status: AVPlaybackStatus = await play(
        playbackObj,
        audio.enclosures[0].url
      );
      setPalybackObj(playbackObj);
      setCurrentAudio(audio);
      return setSoundObj(status);
    }

    // pause audio
    if (soundObj.isLoaded && soundObj.isPlaying) {
      const status = await pause(playbackObj);
      return setSoundObj(status);
    }

    // resume audio
    if (
      soundObj.isLoaded &&
      !soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await resume(playbackObj);
      return setSoundObj(status);
    }
  };

  return (
    <Screen>
      {songs.map((item) => {
        return (
          <AudioListItem
            key={item.id}
            title={item.title}
            duration={item.itunes.duration}
            onOptionPress={() => {
              setCurrentItem(item);
              setOptionModalVisible(true);
            }}
            onAudioPress={() => handleAudioPress(item)}
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
