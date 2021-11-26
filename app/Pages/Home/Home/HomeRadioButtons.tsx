import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ButtonGroup } from "react-native-elements";
import { DataContext } from "../../../helpers/context/dataContext";

interface HomeRadioButtonsProps {
  templateIndex: number;
  setTemplateIndex: React.Dispatch<React.SetStateAction<number>>;
}
const HomeRadioButtons = ({
  templateIndex,
  setTemplateIndex,
}: HomeRadioButtonsProps) => {
  const { templates } = useContext(DataContext);
  const [buttons, setButtons] = useState<string[]>([]);
  useEffect(() => {
    const newButtons: string[] = templates.map((item) => item.title);
    newButtons.unshift("None");
    setButtons(newButtons);
  }, [templates]);

  const updateIndex = (newIndex: number) => {
    setTemplateIndex(newIndex);
  };

  return (
    <ScrollView
      style={{
        height: 200,
        width: 140,
        padding: 10,
      }}
    >
      <ButtonGroup
        vertical={true}
        onPress={updateIndex}
        selectedIndex={templateIndex}
        buttons={buttons}
        buttonStyle={{ height: 15, width: 80 }}
        containerStyle={{
          width: 100,
          flex: 1,
          alignItems: "center",
          flexDirection: "column",
        }}
      />
    </ScrollView>
  );
};

export default HomeRadioButtons;

const styles = StyleSheet.create({});
