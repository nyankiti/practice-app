import React, { Component, createContext, useState } from "react";
import { Text, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { Song, PlaybackStatus } from "../types";
import { storeAudioForNextOpening } from "../utils/helper";
import { playNext } from "../utils/AudioController";

type AudioContextState = {
  songs: Song[]; // fetchAudioによって取得した全ての音声
  soundObj: any;
  playbackObj: any;
  currentAudio: any;
  isPlaying: boolean;
  currentAudioIndex: number | null;
  totalAudioCount: number;
  playbackPosition: any;
  playbackDuration: any;
  // loadPreviousAudio: any;
};

type AudioContextValue = {
  songs: Song[]; // fetchAudioによって取得した全ての音声
  soundObj: any;
  playbackObj: any;
  currentAudio: any;
  isPlaying: boolean;
  currentAudioIndex: number | null;
  totalAudioCount: number;
  playbackPosition: any;
  playbackDuration: any;
  updateState: any;
  loadPreviousAudio: any;
  onPlaybackStatusUpdate: any;
};

export const AudioContext = createContext<AudioContextValue>({
  songs: [],
  soundObj: null,
  playbackObj: undefined,
  currentAudio: undefined,
  isPlaying: false,
  currentAudioIndex: null,
  totalAudioCount: 0,
  playbackPosition: null,
  playbackDuration: null,
  updateState: () => {},
  loadPreviousAudio: () => {},
  onPlaybackStatusUpdate: () => {},
});

export class ClassAudioProvider extends Component<{}, AudioContextState> {
  constructor(props: any) {
    super(props);
    this.state = {
      songs: [],
      soundObj: null,
      playbackObj: null,
      currentAudio: {},
      isPlaying: false,
      currentAudioIndex: 0,
      totalAudioCount: 0,
      playbackPosition: null,
      playbackDuration: null,
      // loadPreviousAudio: () => {},
    };
  }

  // state = {
  //   songs: [],
  //   playbackObj: null,
  //   soundObj: null,
  //   currentAudio: {},
  //   isPlaying: false,
  //   currentAudioIndex: 0,
  //   totalAudioCount: 0,
  //   playbackPosition: null,
  //   playbackDuration: null,
  //   loadPreviousAudio: () => {},
  // };

  componentDidMount() {
    if (this.state.playbackObj === null) {
      this.setState({
        ...this.state,
        playbackObj: new Audio.Sound(),
      });
    }
  }

  updateState = (prevState: any, newState = {}) => {
    this.setState({ ...prevState, ...newState });
  };

  loadPreviousAudio = async () => {
    let previousAudio: any = await AsyncStorage.getItem("previousAudio");

    if (previousAudio === null) {
      // 初回アクセスでstorageになにもない
    } else {
      previousAudio = JSON.parse(previousAudio);
      const currentAudio = previousAudio.audio;
      const currentAudioIndex = previousAudio.index;
      this.setState({ ...this.state, currentAudio, currentAudioIndex });
    }
  };
  onPlaybackStatusUpdate = async (playbackStatus: PlaybackStatus) => {
    console.log(playbackStatus);
    if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
      console.log("ooooooooooooooo");
      this.updateState(this, {
        playbackPosition: playbackStatus.positionMillis,
        playbackDuration: playbackStatus.durationMillis,
      });
    }

    if (playbackStatus.didJustFinish && this.state.currentAudioIndex !== null) {
      const nextAudioIndex = this.state.currentAudioIndex + 1;
      // there is no next audio to play or current audio is the last one
      if (nextAudioIndex >= this.state.totalAudioCount) {
        this.state.playbackObj.unloadAsync();
        this.updateState(this, {
          soundObj: null,
          currentAudio: this.state.songs[0],
          currentAudioIndex: 0,
          isPlaying: false,
          playbackDuration: null,
          playbackPosition: null,
        });
        return await storeAudioForNextOpening(this.state.songs[0], 0);
      }
      // if next audio is exist
      const nextAudio = this.state.songs[nextAudioIndex];
      const status = await playNext(
        this.state.playbackObj,
        nextAudio.enclosures[0].url
      );
      this.updateState(this, {
        soundObj: status,
        currentAudio: nextAudio,
        currentAudioIndex: nextAudioIndex,
        isPlaying: true,
      });
      return await storeAudioForNextOpening(nextAudio, nextAudioIndex);
    }
  };

  render() {
    const {
      songs,
      playbackObj,
      soundObj,
      currentAudio,
      isPlaying,
      currentAudioIndex,
      totalAudioCount,
      playbackPosition,
      playbackDuration,
    } = this.state;
    return (
      <AudioContext.Provider
        value={{
          songs,
          playbackObj,
          soundObj,
          currentAudio,
          isPlaying,
          currentAudioIndex,
          totalAudioCount,
          playbackPosition,
          playbackDuration,
          updateState: this.updateState,
          loadPreviousAudio: this.loadPreviousAudio,
          onPlaybackStatusUpdate: this.onPlaybackStatusUpdate,
        }}
      >
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}
