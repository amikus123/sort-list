/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
} from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { ListItem } from "../../../types";

interface props {
  setItems: React.Dispatch<React.SetStateAction<ListItem[]>>;
  items: ListItem[];
}

function ItemList({ items, setItems }: props) {
  useEffect(() => {
    console.log(items, '"13123');
  }, [items]);
  const renderItem = useCallback(
    ({ item, index, drag, isActive }: RenderItemParams<ListItem>) => {
      return (
        <Pressable
          style={{
            height: 100,
            width: "100%",
            backgroundColor: isActive ? "red" : item.color,
            alignItems: "center",
            justifyContent: "center",
          }}
          onLongPress={drag}
          delayLongPress={100}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: 32,
            }}
          >
            {item.text}
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
          ></View>
        </Pressable>
      );
    },
    []
  );

  return (
    <View style={{ flex: 1, display: "flex" }}>
      <DraggableFlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => `draggable-item-${item.id}`}
        onDragEnd={({ data }) => {
          setItems(data);
        }}
      />
    </View>
  );
}

export default ItemList;
