import { useNavigation } from "@react-navigation/core";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, FlatList, Text } from "react-native";
import MyCard from "../../../components/Cards/MyCard";
import { DataContext } from "../../../helpers/context/dataContext";
import { HomePaths } from "../../../helpers/paths";
import { List } from "../../../helpers/types";
import { StackActions } from "@react-navigation/native";
import HomeTextModal from "./HomeModal";
export type TabParamList = {
  List: { list: List };
};

const HomeHome = () => {
  const {
    lists,
    selectedListIndex,
    setSelectedListIndex,
    listModificationFunctions,
  } = useContext(DataContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [templateIndex, setTemplateIndex] = useState(0);

  const { addList, removeListByIndex } = listModificationFunctions;
  const navigation = useNavigation();
  useEffect(() => {
    if (selectedListIndex !== -1) {
      const pushAction = StackActions.push(HomePaths.list);
      navigation.dispatch(pushAction);
    }
  }, [selectedListIndex]);

  const createCard = (item: List, index: number) => {
    const { description, title } = item;
    // on click we set index of list to show, and then we moove to that page
    // we do that beacuse otherwise some error may occur in list component
    const handleClick = () => {
      setSelectedListIndex(index);
      console.log("CHANLGED");
    };
    const handleRemove = () => {
      removeListByIndex(index);
    };
    return (
      <MyCard
        title={title}
        desc={""}
        handleRemove={handleRemove}
        buttonText="Open"
        onClick={handleClick}
      />
    );
  };
  //should add new list to state

  const handleModalSubmit = () => {
    if (modalText !== "") {
      addList(modalText, templateIndex);
      setModalText("");
      setModalVisible(false);
    } else {
      console.log("E<");
    }
  };

  return (
    <>
      <HomeTextModal
        text={modalText}
        setText={setModalText}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleModalSubmit={handleModalSubmit}
        buttonText="Create List"
        templateIndex={templateIndex}
        setTemplateIndex={setTemplateIndex}
      />
      <FlatList
        data={lists}
        renderItem={({ item, index }) => createCard(item, index)}
      />
      <MyCard
        onClick={() => {
          setModalVisible(true);
        }}
        desc=""
        title="Need more lists?"
        buttonText="Add List"
        color="green"
      />
    </>
  );
};

export default HomeHome;

const styles = StyleSheet.create({});
