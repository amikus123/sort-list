import { useNavigation } from "@react-navigation/core";
import React, { useContext, useEffect } from "react";
import { StyleSheet, FlatList, Text } from "react-native";
import MyCard from "../../../components/Cards/MyCard";
import { DataContext } from "../../../helpers/context/dataContext";
import { HomePaths } from "../../../helpers/paths";
import { List } from "../../../helpers/types";
import { Button } from "react-native-elements";
import { StackActions } from "@react-navigation/native";

export type TabParamList = {
  List: { list: List };
};

const HomeHome = () => {
  const { lists, selectedListIndex,setSelectedListIndex } = useContext(DataContext);
  const navigation = useNavigation();
  useEffect(() => {
    if (selectedListIndex !== -1) {
      const pushAction = StackActions.push(HomePaths.list);
      navigation.dispatch(pushAction);
    }
  }, [selectedListIndex]);
  const createCard = (item: List, index: number) => {
    const { description, title } = item;
    // on click we set index of list to show, and then we moove to that page
    // we do that beacuse otherwise some error may occur in list component
    const handleClick = () => {
      setSelectedListIndex(index);
      console.log("CHANLGED");
    };
    return (
      <MyCard
        title={title}
        desc={description}
        buttonText="Open"
        onClick={handleClick}
      />
    );
  };
  const handleAdd = () => {};

  return (
    <>
 

      <Button
        onPress={() => {
          setSelectedListIndex(0);
        }}
        title="Toggle mode"
      />
           <Text>ASDsdaasd</Text>

<Text>{selectedListIndex}</Text>
<Text>ASDsdaasd</Text>
      <FlatList
        data={lists}
        renderItem={({ item, index }) => createCard(item, index)}
      />
      <MyCard
        onClick={handleAdd}
        desc=""
        title="NEED TO LIST"
        buttonText="Add List"
        color="yellow"
      />
    </>
  );
};

export default HomeHome;

const styles = StyleSheet.create({});
