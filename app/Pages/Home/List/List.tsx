import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, StatusBar, View, Text, Button } from "react-native";
import ItemList from "./ItemList/ItemList";
import TabCreator from "../../../components/TabCreator/TabCreator";
import { DataContext } from "../../../helpers/context/dataContext";
import { List } from "../../../helpers/types";
import EditTable from "./EditTable/EditTable";
import { useNavigation } from "@react-navigation/core";
import TextModal from "../../../components/TextModal/TextModal";

export const ListList = () => {
  const {
    lists,
    selectedListIndex,
    listModificationFunctions,
    setSelectedListIndex,
  } = useContext(DataContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalEditValue, setModalEditValue] = useState(-1);
  const [tabCreatorText, setTabCreatorText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [list, setList] = useState<List | null>(null);

  const {
    removeFromListById,
    modifyContent,
    addItemToList,
    modifyListItemById,
    removeListByIndex
  } = listModificationFunctions;

  useEffect(() => {
    setList(lists[selectedListIndex]);
  }, [selectedListIndex, lists]);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener("beforeRemove", () => {
      if (selectedListIndex !== -1) {
        setSelectedListIndex(-1);
      }
    });
  }, [navigation, selectedListIndex]);

  const handleTabCreatorSubmit = () => {
    if (tabCreatorText !== "") {
      addItemToList(tabCreatorText);
      setTabCreatorText("");
    }
  };

  // opends modal to edit selected list item
  const openModalForIndex = (index: number) => {
    setModalEditValue(index);
    setModalVisible(true);
    setModalText(list.content[index].text);
  };

  const handleModalSubmit = () => {
    // Modal is opened on list item click during edit mode
    // if text is empty, we remove the item
    // else, we change its text
    if (modalText !== "") {
      modifyListItemById(modalEditValue, modalText);
    } else {
      removeFromListById(list.content[modalEditValue].id);
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

      {list !== undefined && list !== null ? (
        <View style={styles.scrollView}>
          <Button
            onPress={() => {
              setEditMode(!editMode);
            }}
            title={editMode ? "Edit Mode" : "Drag Mode"}
            color={editMode ? "blue" : "red"}
          />
          {editMode ? (
            <EditTable
              removeFromListById={removeFromListById}
              items={list.content}
              openModalForIndex={openModalForIndex}
            />
          ) : (
            <ItemList items={list.content} setItems={modifyContent} />
          )}
          <TabCreator
            text={tabCreatorText}
            setText={setTabCreatorText}
            handleTextSubmit={handleTabCreatorSubmit}
          />
          <View></View>
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

export default ListList;
