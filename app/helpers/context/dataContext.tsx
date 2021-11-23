import React, { createContext, useState, useEffect } from "react";
import { uid } from "uid";
import { addFG, randomShade } from "../functions/listsFunctions";
import { getInitialData } from "../functions/storageFunctions";
import { List, ListItem, Template } from "../types";

export const DataContext = createContext(null);

export const DataProvider = ({ children }: { children: any }) => {
  const [lists, setLists] = useState<List[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [finishedFetching, setFinishedFetching] = useState(false);

  const [selectedListIndex, setSelectedListIndex] = useState(-1);

  const initiation = async () => {
    const { lists, templates } = await getInitialData();
    setFinishedFetching(true);
    setLists([addFG()]);
    setTemplates(templates);
    console.log(selectedListIndex)
  };

  const getSelectedList = () =>{
    try{
      if(selectedListIndex !== -1){
        return  lists[selectedListIndex]

      }else{
        console.error("FFFF selected index is 0")
        return lists[0]
      }
    }catch(e){
      console.error("FFFF selected index is 0",e)
    }
  }

  const modifyListById = (newList: List, index = selectedListIndex) => {
    const newState = [...lists];
    newState[index] = newList;
    setLists(newState);
  };

  // remocves item from open list by UID
  const removeFromListById = (id: string, ) => {
    const list = getSelectedList()
    const res = list.content.filter((item) => item.id !== id);
    const newObj = { ...list, content: res };
    modifyListById(newObj);
  };

  const addItemToList = (itemText: string) => {
    const item: ListItem = {
      show: true,
      color: randomShade(),
      text: itemText,
      id: uid(16),
    };
    const newObj  =  getSelectedList()
    newObj.content.push(item)
    modifyListById(newObj)  
  };
  const modifyContent = (newContent : ListItem[]) =>{
    modifyListById({...getSelectedList(),content:newContent})
  }
  // wrapper for all functions related to modifying state
  const listModificationFunctions = {
    modifyListById,
    removeFromListById,
    addItemToList,
    modifyContent
  };
  useEffect(() => {
    initiation();
  }, []);

  const val = {
    lists,
    setLists,
    templates,
    setTemplates,
    setSelectedListIndex,
    selectedListIndex,
    listModificationFunctions,
  };
  return (
    <DataContext.Provider value={{ ...val }}>
      <>{children}</>
    </DataContext.Provider>
  );
};
