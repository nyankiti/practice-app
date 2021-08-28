import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as MediaLibrary from "expo-media-library";

const AudioListScreen = () => {
  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    console.log(permission);
  };

  useEffect(() => {
    getPermission();
  });

  return (
    <View style={styles.container}>
      <Text>Audio List</Text>
    </View>
  );
};

export default AudioListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
