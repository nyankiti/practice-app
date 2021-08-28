import React, { Component } from "react";
import { Alert, Text, View } from "react-native";
import * as MediaLibrary from "expo-media-library";

// type Permission = {
//   canAskAgain: boolean;
//   expires: string;
//   granted: boolean;
//   status: string;
// };

export class AyduiProvider extends Component {
  constructor(props: any) {
    super(props);
  }

  permissionAlert = () => {
    Alert.alert("Permission Required", "This app needs to read audio files", [
      {
        text: "I am ready",
        onPress: () => this.getPermission(),
      },
      {
        text: "cancel",
        onPress: () => this.permissionAlert(),
      },
    ]);
  };

  getPermission = async () => {
    const permission: MediaLibrary.PermissionResponse =
      await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      //get audio
    }
    if (permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
      if (status === "denied" && canAskAgain) {
        // permissionが必要であることをalertする
        this.permissionAlert();
      }
      if (status === "granted") {
        // get audio
      }
      if (status === "denied" && !canAskAgain) {
        // permissionが必要であることをalertする
      }
    }
  };

  componentDidMount() {
    this.getPermission();
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default AyduiProvider;
