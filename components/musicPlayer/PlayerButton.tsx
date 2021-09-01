import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import color from "../../data/color";

type Props = {
  iconType: "PLAY" | "PAUSE" | "NEXT" | "PREV";
  size?: number;
  iconColor?: string;
  style?: any;
  onPress: any;
};

const PlayerButton = ({ iconType, size, iconColor, style, onPress }: Props) => {
  const getIconName = (type: string) => {
    switch (type) {
      case "PLAY":
        return "pausecircle";
      case "PAUSE":
        return "playcircleo";
      case "NEXT":
        return "forward";
      case "PREV":
        return "banckward";
    }
  };

  return (
    <AntDesign
      onPress={onPress}
      name={getIconName(iconType)}
      size={size}
      iconColor={color}
      style={style}
    />
  );
};

PlayerButton.defaultProps = { iconColor: color.FONT, size: 40 };

export default PlayerButton;

const styles = StyleSheet.create({});
