import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, StatusBar, View, Text, Button } from "react-native";
import TabCreator from "../../../components/TabCreator/TabCreator";
import { DataContext } from "../../../helpers/context/dataContext";
import { List, Template } from "../../../helpers/types";
import EditTable from "./EditTable/EditTable";
import { useNavigation } from "@react-navigation/core";
import TextModal from "../../../components/TextModal/TextModal";

export const TemplatesList = () => {
  const {
    templates,
    selectedTemplateIndex,
    templateModifcationFunctions,
    setSelectedTemplateIndex,
  } = useContext(DataContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalEditValue, setModalEditValue] = useState(-1);
  const [tabCreatorText, setTabCreatorText] = useState("");
  const [template, setTemplate] = useState<Template | null>(null);

  const {
    addItemToTemplate,
    modifyTemplateById,
    removeFromTemplateByContent,
    modifyTemplateItemById,
  } = templateModifcationFunctions;

  useEffect(() => {
    setTemplate(templates[selectedTemplateIndex]);
  }, [selectedTemplateIndex, templates]);

  useEffect(() => {
    navigation.addListener("beforeRemove", () => {
      if (selectedTemplateIndex !== -1) {
        setSelectedTemplateIndex(-1);
      }
    });
  }, [navigation, selectedTemplateIndex]);

  const handleTabCreatorSubmit = () => {
    if (tabCreatorText !== "") {
      addItemToTemplate(tabCreatorText);
      setTabCreatorText("");
    }
  };

  // opends modal to edit selected list item
  const openModalForIndex = (index: number) => {
    setModalEditValue(index);
    setModalVisible(true);
    setModalText(template.content[index]);
  };

  const handleModalSubmit = () => {
    // Modal is opened on list item click during edit mode
    // if text is empty, we remove the item
    // else, we change its text
    if (modalText !== "") {
      modifyTemplateItemById(modalEditValue, modalText);
    } else {
      removeFromTemplateByContent(template.content[modalEditValue]);
    }
    setModalText("");
    setModalVisible(false);
    setModalEditValue(-1);
  };

  return (
    <>
      <TextModal
        text={modalText}
        setText={setModalText}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleModalSubmit={handleModalSubmit}
      />

      {template !== undefined && template !== null ? (
        <View style={styles.scrollView}>
          <EditTable
            removeFromTemplateByContent={removeFromTemplateByContent}
            items={template.content}
            openModalForIndex={openModalForIndex}
          />
          <TabCreator
            text={tabCreatorText}
            setText={setTabCreatorText}
            handleTextSubmit={handleTabCreatorSubmit}
          />
        </View>
      ) : (
        <Text>loading</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    flex: 1,

    display: "flex",
    flexDirection: "column",
  },
});

export default TemplatesList;
