import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
    <View>
      <ButtonGroup
        vertical={true}
        onPress={updateIndex}
        selectedIndex={templateIndex}
        buttons={buttons}
        buttonStyle={{ height: 10, width: 50 }}
        containerStyle={{ height: 100, width: 50 }}
      />
    </View>
  );
};

export default HomeRadioButtons;

const styles = StyleSheet.create({});
