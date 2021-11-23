import { useNavigation } from "@react-navigation/core";
import React, { useContext} from "react";
import { StyleSheet,  FlatList,Text, Button } from "react-native";
import MyCard from "../../../components/Cards/MyCard";
import { DataContext } from "../../../helpers/context/dataContext";
import { HomePaths } from "../../../helpers/paths";
import { List } from "../../../helpers/types";

export type TabParamList = {
  List: { list: List };
};
const HomeHome = () => {
  const { lists,setSelectedListIndex } = useContext(DataContext);
  const navigation = useNavigation();

  const createCard = ( item:List,index:number) =>{
    const {description,title} = item
    const handleClick = () =>{
      setSelectedListIndex(index)
      navigation.navigate({key:HomePaths.list})
    }
    return(
<MyCard  title={title} desc={description} buttonText="Open" onClick={handleClick} />
    ) 
  }
  const handleAdd = () =>{

  }

  return (
    <>
      <FlatList
        data={lists}
        renderItem={({ item,index }) => createCard(item,index)}
      />
     <MyCard onClick={handleAdd} desc="" title="NEED TO LIST" buttonText="Add List" color="yellow"/>
    </>
  );
};

export default HomeHome;

const styles = StyleSheet.create({});
