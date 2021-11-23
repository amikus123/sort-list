import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
interface TabCreatorProps {
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  handleTextSubmit: () => void;
}

const TabCreator = ({ setText, text, handleTextSubmit }: TabCreatorProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleTextSubmit}
        />
        <Button
          onPress={() => {
            try {
              handleTextSubmit();
            } catch (e) {
              console.log(e);
            }
          }}
          title="Add item"
          color="#080808"
        />
      </View>
    </View>
  );
};

export default TabCreator;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  wrapper: {
    width: "80%",
    display: "flex",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
