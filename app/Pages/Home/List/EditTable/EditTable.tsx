import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  LayoutAnimation,
  TouchableOpacity,
} from "react-native";
import { ListItem } from "../../types";

interface props {
  items: ListItem[];
  deleteItemById: (key: string) => void;
  openModalForIndex: (index: number) => void;
}

const EditTable = ({ items, deleteItemById, openModalForIndex }: props) => {
  const layoutAnimConfig = {
    duration: 300,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
      duration: 100,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  const renderItem = ({ item, index, separators }) => {
    const { id, color, text } = item;

    return (
      <TouchableOpacity
        onPress={() => {
          openModalForIndex(index);
        }}
      >
        
        <View
          style={{
            height: 100,
            width: "100%",
            backgroundColor: color,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: 32,
            }}
          >
            {index}
            " "
            {text}
          </Text>
          <View
            style={{
              position: "absolute",
              right: 10,
              top: 0,
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Pressable
              onPress={() => {
                deleteItemById(id);
                LayoutAnimation.configureNext(layoutAnimConfig);
              }}
            >
              <Image source={require("../../assets/trash.png")} />
            </Pressable>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default EditTable;

const styles = StyleSheet.create({});
