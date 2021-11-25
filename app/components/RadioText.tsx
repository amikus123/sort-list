import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ButtonGroup } from "react-native-elements";

const RadioText = () => {
  const buttons = [
    "Hello",
    "World",
    "Buttons",
    "Buttons",
    "Buttons",
    "Buttons",
    "Buttons",
  ];
  const [index, setIndex] = useState(1);
  const updateIndex = (newIndex: number) => {
    setIndex(newIndex);
  };
  return (
    <View>
      <ButtonGroup
        vertical={true}
        onPress={updateIndex}
        selectedIndex={index}
        buttons={buttons}
        buttonStyle={{ minHeight: 40 }}
      />
    </View>
  );
};

export default RadioText;

const styles = StyleSheet.create({});
