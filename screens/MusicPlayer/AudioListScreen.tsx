import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import fetchAudio from "../../utils/fetchAudio";

/* components */
import AudioListItem from "../../components/musicPlayer/AudioListItem";
import Screen from "../../components/musicPlayer/Screen";
import OptionModal from "../../components/musicPlayer/OptionModal";
/* types */
import { Song } from "../../types";

const AudioListScreen = () => {
  const [currentItem, setCurrentItem] = useState({});
  const [songs, setSongs] = useState<Song[]>([]);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  useEffect(() => {
    fetchAudio(setSongs);
  }, []);

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
