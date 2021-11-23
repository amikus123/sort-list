/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, StatusBar, View ,Text} from "react-native";
import { uid } from "uid";
import { Button, ListItem } from "react-native-elements";
import { nameList } from "../../../helpers/constants";
import ItemList from "./ItemList/ItemList";
import TabCreator from "../../../components/TabCreator/TabCreator";
import TextModal from "./TextModal/TextModal";
import { DataContext } from "../../../helpers/context/dataContext";




export const ListMain = () => {
  // text input value
  const { lists,selectedListIndex } = useContext(DataContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditValue, setModalEditValue] = useState(-1);
  const [modalText, setModalText] = useState("");
  const [text, setText] = useState("");
  const [items, setItems] = useState<ListItem[]>([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {}, []);
  const randomShade = () => {
    var newColor =
      "rgb(" +
      (Math.floor((255 - 220) * Math.random()) + 219) +
      "," +
      (Math.floor((195 - 145) * Math.random()) + 144) +
      "," +
      (Math.floor((30 - 0) * Math.random()) + 0) +
      ")";

    return newColor;
  };

  const deleteItemById = (key: string) => {
    const res = items.filter((item) => item.id !== key);
    console.log(res, [...items], "zmiana");
    setItems(res);
  };

  const addItemToState = (itemText: string) => {
    const item: ListItem = {
      show: true,
      color: randomShade(),
      text: itemText,
      id: uid(16),
    };
    setItems([...items, item]);
  };

  const handleTextSubmit = () => {
    if (text !== "") {
      addItemToState(text);
      setText("");
    } else {
      setModalVisible(true);
    }
  };

  const openModalForIndex = (index: number) => {
    setModalEditValue(index);
    setModalVisible(true);
    setModalText(items[index].text);
  };

  const handleModalSubmit = () => {
    const copy = items.slice();
    if (modalText !== "") {
      addItemToState(text);
      setModalText("");
      setModalVisible(false);
      copy[modalEditValue].text = modalText;
    } else {
      copy.splice(modalEditValue, 1);
    }
    setItems(copy);
    setModalVisible(false);
    setModalEditValue(-1);
  };

  const addFG = () => {
    const objects = [];
    for (const x of nameList) {
      const item: ListItem = {
        show: true,
        color: randomShade(),
        text: x,
        id: uid(16),
      };
      objects.push(item);
    }
    setItems([...items, ...objects]);
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
      {/* <SafeAreaView style={styles.container}> */}
      <View style={styles.scrollView}>
        <Text>{list.title}</Text>
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

          <Button
            onPress={() => {
              addFG();
            }}
            title="FG3"
          />
        </View>
        {editMode ? (
          <EditTable
            deleteItemById={deleteItemById}
            items={items}
            openModalForIndex={openModalForIndex}
          />
        ) : (
          <ItemList items={items} setItems={setItems} />
        )}
      </View>
      {/* </SafeAreaView> */}
    </>
  );
}

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

export default ListMain