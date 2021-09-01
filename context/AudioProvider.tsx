import React, { Component, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// classで書いたほうがよいかも、、、

type AudioContextValue = {
  soundObj: any;
  setSoundObj: any;
  playbackObj: any;
  setPlaybackObj: any;
  currentAudio: any;
  setCurrentAudio: any;
  isPlaying: boolean;
  setIsPlaying: any;
  currentAudioIndex: number | null;
  setCurrentAudioIndex: any;
  totalAudioCount: number;
  setTotalAudioCount: any;
  playbackPosition: any;
  setPlaybackPosition: any;
  playbackDuration: any;
  setPlaybackDuration: any;
  loadPreviousAudio: any;
};

export const AudioContext = createContext<AudioContextValue>({
  soundObj: null,
  setSoundObj: () => {},
  playbackObj: undefined,
  setPlaybackObj: () => {},
  currentAudio: undefined,
  setCurrentAudio: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
  currentAudioIndex: null,
  setCurrentAudioIndex: () => {},
  totalAudioCount: 0,
  setTotalAudioCount: () => {},
  playbackPosition: null,
  setPlaybackPosition: () => {},
  playbackDuration: null,
  setPlaybackDuration: () => {},
  loadPreviousAudio: () => {},
});

export const AudioProvider: React.FC = ({ children }) => {
  const [soundObj, setSoundObj] = useState<any>(null); //  playbackObj.setStatusAsync()の返り値
  const [playbackObj, setPlaybackObj] = useState<any>(); // playbackObj (new Audio.Sound();の返り値)
  const [currentAudio, setCurrentAudio] = useState<any>(); // 現在再生（停止）されているSongオブジェクト
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState<number | null>(
    null
  );
  const [totalAudioCount, setTotalAudioCount] = useState<number>(0); // 取得したAudioの総数
  const [playbackPosition, setPlaybackPosition] = useState<any>(null);
  const [playbackDuration, setPlaybackDuration] = useState<any>(null);

  const loadPreviousAudio = async () => {
    let previousAudio: any = await AsyncStorage.getItem("previousAudio");

    if (previousAudio === null) {
      // 初回アクセスでstorageになにもない
    } else {
      console.log("aaaaaaaaaaaaaaaa");
      previousAudio = JSON.parse(previousAudio);
      const currentAudio = previousAudio.audio;
      const currentAudioIndex = previousAudio.index;
      setCurrentAudio(currentAudio);
      setCurrentAudioIndex(currentAudioIndex);
    }
  };

  return (
    <AudioContext.Provider
      value={{
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
        playbackPosition,
        setPlaybackPosition,
        playbackDuration,
        setPlaybackDuration,
        loadPreviousAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
