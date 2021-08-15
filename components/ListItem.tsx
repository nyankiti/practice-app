import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

const ListItem: React.FC<Props> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.rightContainer}>
        <Text numberOfLines={3}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    // height: 100,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    flexDirection: "row",
  },
  leftContainer: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  subText: {
    color: "gray",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default ListItem;
