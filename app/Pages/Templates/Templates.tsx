import { useNavigation } from "@react-navigation/core";
import React, { useContext, useEffect } from "react";
import { StyleSheet, FlatList, Text } from "react-native";
import { StackActions } from "@react-navigation/native";
import MyCard from "../../components/Cards/MyCard";
import { DataContext } from "../../helpers/context/dataContext";
import { TemplatePaths } from "../../helpers/paths";
import { Template } from "../../helpers/types";

const Templates = () => {
  const { templates, selectedTemplateIndex, setSelectedTemplateIndex } =
    useContext(DataContext);
  const navigation = useNavigation();
  useEffect(() => {
    if (selectedTemplateIndex !== -1) {
      const pushAction = StackActions.push(TemplatePaths.list);
      navigation.dispatch(pushAction);
    }
  }, [selectedTemplateIndex]);

  const createCard = (item: Template, index: number) => {
    const { title } = item;
    // on click we set index of list to show, and then we moove to that page
    // we do that beacuse otherwise some error may occur in list component
    const handleClick = () => {
      setSelectedTemplateIndex(index);
      console.log("CHANLGED");
    };
    return (
      <MyCard title={title} desc={""} buttonText="Open" onClick={handleClick} />
    );
  };
  //should add new list to state
  const handleAdd = () => {
    console.log("TODO");
  };

  return (
    <>
      <FlatList
        data={templates}
        renderItem={({ item, index }) => createCard(item, index)}
      />
      <MyCard
        onClick={handleAdd}
        desc=""
        title="NEED TO LIST"
        buttonText="Add Temlate"
        color="yellow"
      />
    </>
  );
};

export default Templates;

const styles = StyleSheet.create({});
