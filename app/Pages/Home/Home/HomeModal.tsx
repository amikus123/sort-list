import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import TabCreator from "../../../components/TabCreator/TabCreator";
import HomeTabCreator from "./HomeTabCreator";
import HomeRadioButtons from "./HomeRadioButtons";

interface props {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleModalSubmit: () => void;
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  buttonText?: string;
  templateIndex: number;
  setTemplateIndex: React.Dispatch<React.SetStateAction<number>>;
}

const TextModal = ({
  modalVisible,
  setModalVisible,
  text,
  setText,
  handleModalSubmit,
  buttonText = "Add Item",
  templateIndex,
  setTemplateIndex,
}: props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View
        style={styles.centeredView}
        onTouchStart={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={styles.modalView}
          onTouchStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Text>Name the list</Text>
          <HomeTabCreator
            text={text}
            setText={setText}
            handleTextSubmit={handleModalSubmit}
            buttonText={buttonText}
          />
          <Text>Choose template</Text>
          <HomeRadioButtons
            templateIndex={templateIndex}
            setTemplateIndex={setTemplateIndex}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,1,0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default TextModal;
