import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import color from "../../data/color";
import { Song } from "../../types";

type Props = {
  currentItem: any;
  visible: boolean;
  onClose: () => void;
  onPlayPress: any;
  onPlayListPress: any;
};

const OptionModal = ({
  currentItem,
  visible,
  onClose,
  onPlayPress,
  onPlayListPress,
}: Props) => {
  const { title } = currentItem;
  return (
    <>
      <StatusBar hidden />
      <Modal transparent={true} visible={visible}>
        <View style={styles.modal}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <View style={styles.optionContainer}>
            <TouchableWithoutFeedback onPress={onPlayPress}>
              <Text style={styles.option}>Play</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onPlayListPress}>
              <Text style={styles.option}>Add to Playlist</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBg} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default OptionModal;

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: color.APP_BG,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1000,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 20,
    paddingBottom: 0,
    color: color.FONT_MEDIUM,
  },
  optionContainer: {
    padding: 20,
  },
  option: {
    fontSize: 16,
    fontWeight: "bold",
    color: color.FONT,
    paddingVertical: 10,
    letterSpacing: 1,
  },
  modalBg: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: color.MODAL_BG,
  },
});
