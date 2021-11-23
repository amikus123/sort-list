/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, StatusBar, View, Text } from "react-native";
import { Button } from "react-native-elements";
import ItemList from "./ItemList/ItemList";
import TabCreator from "../../../components/TabCreator/TabCreator";
import TextModal from "./TextModal/TextModal";
import { DataContext } from "../../../helpers/context/dataContext";
import { ListItem, List } from "../../../helpers/types";
import EditTable from "./EditTable/EditTable";
import { useNavigation } from "@react-navigation/core";

export const ListList = () => {
  const {
    lists,
    selectedListIndex,
    listModificationFunctions,
    setSelectedListIndex,
  } = useContext(DataContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditValue, setModalEditValue] = useState(-1);
  const [modalText, setModalText] = useState("");
  const [text, setText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [list, setList] = useState<List | null>(null);

  const { modifyListById, removeFromListById, modifyContent, addItemToList } =
    listModificationFunctions;
  useEffect(() => {
    setList(lists[selectedListIndex]);
  }, [selectedListIndex, lists]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (selectedListIndex !== -1) {
        setSelectedListIndex(-1);
      }
    });
  }, [navigation, selectedListIndex]);

  const handleTextSubmit = () => {
    if (text !== "") {
      addItemToList(text);
      setText("");
    } else {
      setModalVisible(true);
    }
  };

  // opends modal to edit selected list item
  const openModalForIndex = (index: number) => {
    setModalEditValue(index);
    setModalVisible(true);
    setModalText(list.content[index].text);
  };

  const handleModalSubmit = () => {
    const copy = list.content.slice();
    if (modalText !== "") {
      addItemToList(text);
      setModalText("");
      setModalVisible(false);
      setModalEditValue(-1);
      copy[modalEditValue].text = modalText;
    } else {
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
      />

      {list !== undefined && list !== null ? (
        <View style={styles.scrollView}>
          <Text>{list.title} </Text>
          <TabCreator
            text={text}
            setText={setText}
            handleTextSubmit={handleTextSubmit}
          />
          <View>
            <Button
              onPress={() => {
                setEditMode(!editMode);
              }}
              title="Toggle mode"
            />
          </View>

          {editMode ? (
            <EditTable
              removeFromListById={removeFromListById}
              items={list.content}
              openModalForIndex={openModalForIndex}
            />
          ) : (
            <ItemList items={list.content} setItems={modifyContent} />
          )}
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
    backgroundColor: "pink",
  },
});

export default ListList;
