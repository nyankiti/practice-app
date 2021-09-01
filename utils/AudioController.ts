// play adudio
export const play = async (playbackObj: any, uri: string) => {
  try {
    return await playbackObj.loadAsync({ uri: uri }, { shouldPlay: true });
  } catch (error) {
    console.log("error inside play helper method: " + error.message);
  }
};

// pause audio
export const pause = async (playbackObj: any) => {
  try {
    return await playbackObj.setStatusAsync({ shouldPlay: false });
  } catch (error) {
    console.log("error inside pause helper method: " + error.message);
  }
};

// resume audio
export const resume = async (playbackObj: any) => {
  try {
    return await playbackObj.playAsync();
  } catch (error) {
    console.log("error inside resume helper method: " + error.message);
  }
};
// select another audio
export const playNext = async (playbackObj: any, uri: string) => {
  try {
    await playbackObj.stopAsync();
    await playbackObj.unloadAsync();
    return await play(playbackObj, uri);
  } catch (error) {
    console.log("error inside playNext helper method: " + error.message);
  }
};
