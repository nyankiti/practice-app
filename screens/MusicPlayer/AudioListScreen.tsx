import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import fetchAudio from "../../utils/fetchAudio";
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
import { AudioContext } from "../../context/AudioProvider";

const AudioListScreen = () => {
  const {
    soundObj,
    setSoundObj,
    playbackObj,
    setPlaybackObj,
    currentAudio,
    setCurrentAudio,
    isPlaying,
    setIsPlaying,
    currentAudioIndex,
    setCurrentAudioIndex,
    totalAudioCount,
    setTotalAudioCount,
    setPlaybackDuration,
    setPlaybackPosition,
    loadPreviousAudio,
  } = useContext(AudioContext);

  const [currentItem, setCurrentItem] = useState<Song>({}); // 現在選択されているSongsオブジェクト
  const [songs, setSongs] = useState<Song[]>([]); // fetchAudioによって取得した全ての音声
  const [optionModalVisible, setOptionModalVisible] = useState(false); // Modalの開閉
  useEffect(() => {
    loadPreviousAudio();
    fetchAudio(setSongs, setTotalAudioCount);
  }, []);

  const onPlaybackStatusUpdate = async (playbackStatus: PlaybackStatus) => {
    if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
      setPlaybackPosition(playbackStatus.positionMillis);
      setPlaybackDuration(playbackStatus.durationMillis);
    }

    if (playbackStatus.didJustFinish && currentAudioIndex !== null) {
      const nextAudioIndex = currentAudioIndex + 1;
      // there is no next audio to play or current audio is the last one
      if (nextAudioIndex >= totalAudioCount) {
        playbackObj.unloadAsync();
        setSoundObj(null);
        setCurrentAudio(songs[0]);
        setCurrentAudioIndex(0);
        setIsPlaying(false);
        setPlaybackDuration(null);
        setPlaybackPosition(null);
        return await storeAudioForNextOpening(songs[0], 0);
      }
      // if next audio is exist
      const nextAudio = songs[nextAudioIndex];
      const status = await playNext(playbackObj, nextAudio.enclosures[0].url);
      setSoundObj(status);
      setCurrentAudio(nextAudio);
      setCurrentAudioIndex(nextAudioIndex);
      setIsPlaying(true);
      return await storeAudioForNextOpening(nextAudio, nextAudioIndex);
    }
  };

  const handleAudioPress = async (audio: Song, index: number) => {
    // playinf audio for the first time
    if (soundObj === null) {
      const playbackObj = new Audio.Sound();
      const status: AVPlaybackStatus = await play(
        playbackObj,
        audio.enclosures[0].url
      );
      setPlaybackObj(playbackObj);
      setCurrentAudio(audio);
      setIsPlaying(true);
      setCurrentAudioIndex(index);
      setSoundObj(status);
      playbackObj.setOnPlaybackStatusUpdate(() => onPlaybackStatusUpdate);
      return storeAudioForNextOpening(audio, index);
    }

    // pause audio
    if (
      soundObj.isLoaded &&
      soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await pause(playbackObj);
      setIsPlaying(false);
      return setSoundObj(status);
    }

    // resume audio
    if (
      soundObj.isLoaded &&
      !soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await resume(playbackObj);
      setIsPlaying(true);
      setCurrentAudioIndex(index);
      return setSoundObj(status);
    }

    // select another audio
    if (soundObj.isLoaded && currentAudio.id !== audio.id) {
      const status = await playNext(playbackObj, audio.enclosures[0].url);
      setCurrentAudio(audio);
      setIsPlaying(true);
      setSoundObj(status);
      return storeAudioForNextOpening(audio, index);
    }
  };

  return (
    <Screen>
      {songs.map((item, index) => {
        return (
          <AudioListItem
            key={item.id}
            title={item.title}
            isPlaying={isPlaying}
            activeListItem={currentAudioIndex === index}
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
