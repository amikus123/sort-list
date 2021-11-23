/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { ListItem } from "../../../../helpers/types";
interface props {
  setItems: React.Dispatch<React.SetStateAction<ListItem[]>>;
  items: ListItem[];
}

function ItemList({ items, setItems }: props) {
  // we should  have state in this components, prevents jumping
  // duting moving elements
  const [listItems, setListItems] = useState<ListItem[]>(items)
  // useEffect(() => {
    
  //   console.log(items, '"13123');
  //   setListItems(listItems);
  // }, [items]);

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
        data={listItems}
        renderItem={renderItem}
        keyExtractor={(item) => `draggable-item-${item.id}`}
        onDragEnd={(data) => {
          setListItems(data.data);
          setItems(data.data);
        }}
      />
    </View>
  );
}

export default ItemList;
