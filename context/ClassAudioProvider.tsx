import React, { Component, createContext, useState } from "react";

export const AudioContext = createContext();
export class AudioProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playbackObj: null,
      soundObj: null,
      currentAudio: {},
      isPlaying: false,
      currentAudioIndex: 0,
      playbackPosition: null,
      playbackDuration: null,
    };
    this.totalAudioCount = 0;
  }
}
