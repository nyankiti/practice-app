// import * as rssParser from "react-native-rss-parser";
const rssParser = require("react-native-rss-parser");

const fetchAudio = async (
  setSongs: React.Dispatch<React.SetStateAction<any>>,
  setTotalAudioCount: React.Dispatch<React.SetStateAction<number>>
) => {
  const data = await fetch("https://anchor.fm/s/67fb36c0/podcast/rss")
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => {
      return rss;
    });
  console.log(data.items);
  setTotalAudioCount(data.items.length);
  setSongs(data.items);
  // return {items: data.items, length: data.items.length};
  return data.items;
};

export const fetchAudioForClassComponent = async (context: any) => {
  const data = await fetch("https://anchor.fm/s/67fb36c0/podcast/rss")
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => {
      return rss;
    });
  // console.log(data.items);
  context.updateState(context, {
    songs: data.items,
    totalAudioCount: data.items.length,
  });
  return;
};

export default fetchAudio;
