import { useNavigation } from "@react-navigation/core";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, FlatList, Text } from "react-native";
import { StackActions } from "@react-navigation/native";
import MyCard from "../../components/Cards/MyCard";
import { DataContext } from "../../helpers/context/dataContext";
import { TemplatePaths } from "../../helpers/paths";
import { Template } from "../../helpers/types";
import TextModal from "../../components/TextModal/TextModal";

const Templates = () => {
  const {
    templates,
    selectedTemplateIndex,
    setSelectedTemplateIndex,
    addTemplate,
  } = useContext(DataContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    if (selectedTemplateIndex !== -1) {
      const pushAction = StackActions.push(TemplatePaths.list);
      navigation.dispatch(pushAction);
    }
  }, [selectedTemplateIndex]);

  const createCard = (item: Template, index: number) => {
    const { title } = item;
    // on click we set index of list to show, and then we moove to that page
    // we do that beacuse otherwise some error may occur in list component
    const handleClick = () => {
      setSelectedTemplateIndex(index);
      console.log("CHANLGED");
    };
    return (
      <MyCard title={title} desc={""} buttonText="Open" onClick={handleClick} />
    );
  };
  //should add new list to state
  const handleAdd = () => {
    setModalVisible(true);
  };

  const handleModalSubmit = () => {
    if (modalText !== "") {
      const newTemplateIndex = templates.length;
      addTemplate(modalText);
      setModalText("");
      setModalVisible(false);
      setSelectedTemplateIndex(newTemplateIndex);
    } else {
      console.log("E<");
    }
  };
  return (
    <>
      <TextModal
        text={modalText}
        setText={setModalText}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleModalSubmit={handleModalSubmit}
        buttonText="Create List"
      />

      <FlatList
        data={templates}
        renderItem={({ item, index }) => createCard(item, index)}
      />
      <MyCard
        onClick={handleAdd}
        desc=""
        title="Need more templates?"
        buttonText="Add Template"
        color="green"
      />
    </>
  );
};

export default Templates;

const styles = StyleSheet.create({});
