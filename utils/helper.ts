import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeAudioForNextOpening = async (audio: any, index: number) => {
  await AsyncStorage.setItem("previousAudio", JSON.stringify({ audio, index }));
};
