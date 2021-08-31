import React, { Component, createContext, useState } from "react";

type AudioContextValue = {
  soundObj: any;
  setSoundObj: any;
  playbackObj: any;
  setPalybackObj: any;
  currentAudio: any;
  setCurrentAudio: any;
};

export const AudioContext = createContext<AudioContextValue>({
  soundObj: null,
  setSoundObj: () => {},
  playbackObj: undefined,
  setPalybackObj: () => {},
  currentAudio: undefined,
  setCurrentAudio: () => {},
});

export const AudioProvider: React.FC = ({ children }) => {
  const [soundObj, setSoundObj] = useState<any>(null); //  playbackObj.setStatusAsync()の返り値
  const [playbackObj, setPalybackObj] = useState<any>(); // playbackObj (new Audio.Sound();の返り値)
  const [currentAudio, setCurrentAudio] = useState<any>(); // 現在再生（停止）されているSongオブジェクト

  return (
    <AudioContext.Provider
      value={{
        soundObj,
        setSoundObj,
        playbackObj,
        setPalybackObj,
        currentAudio,
        setCurrentAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
