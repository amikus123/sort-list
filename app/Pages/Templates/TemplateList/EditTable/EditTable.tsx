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
import { Icon } from "react-native-elements";

interface props {
  items: string[];
  removeFromTemplateByContent: (key: string) => void;
  openModalForIndex: (index: number) => void;
}

const EditTable = ({
  items,
  removeFromTemplateByContent,
  openModalForIndex,
}: props) => {
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
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          openModalForIndex(index);
        }}
      >
        <View
          style={{
            height: 100,
            width: "100%",
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "black",
              fontSize: 32,
              borderColor: "black",
            }}
          >
            {item}
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
                removeFromTemplateByContent(item);
                LayoutAnimation.configureNext(layoutAnimConfig);
              }}
            >
              <Icon name="trash" type="font-awesome-5" />
            </Pressable>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return <FlatList data={items} renderItem={renderItem} />;
};

export default EditTable;

const styles = StyleSheet.create({});
