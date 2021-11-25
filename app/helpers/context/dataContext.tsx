import React, { createContext, useState, useEffect } from "react";
import { uid } from "uid";
import {
  addFG,
  randomShade,
  addFgTemplate,
  createList,
} from "../functions/listsFunctions";
import { getInitialData, storeData } from "../functions/storageFunctions";
import { List, ListItem, Template } from "../types";

export const DataContext = createContext(null);

export const DataProvider = ({ children }: { children: any }) => {
  const [lists, setLists] = useState<List[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [finishedFetching, setFinishedFetching] = useState(false);
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(-1);
  const [selectedListIndex, setSelectedListIndex] = useState(-1);

  useEffect(() => {
    console.log("ZMIANA");
  }, [lists, templates]);

  const initiation = async () => {
    const storage = await getInitialData();
    setFinishedFetching(true);
    if (storage.lists === null || storage.lists.length === 0) {
      setLists([addFG()]);
    } else {
      setLists(storage.lists);
    }
    if (storage.templates === null || storage.templates.length === 0) {
      setTemplates([addFgTemplate()]);
    } else {
      setTemplates(storage.templates);
    }
  };

  const getSelectedList = () => {
    try {
      if (selectedListIndex !== -1) {
        return lists[selectedListIndex];
      } else {
        console.error("FFFF selected index is 0");
        return lists[0];
      }
    } catch (e) {
      console.error("FFFF selected index is 0", e);
    }
  };

  const modifyListById = (newList: List, index = selectedListIndex) => {
    const newState = [...lists];
    newState[index] = newList;
    setLists(newState);
    storeData(newState, "lists");
    console.log("new state dropped");
    // on change save to storage
  };

  // remocves item from open list by UID
  const removeFromListById = (id: string) => {
    const list = getSelectedList();
    const res = list.content.filter((item) => item.id !== id);
    const newObj = { ...list, content: res };
    modifyListById(newObj);
  };

  const modifyListItemById = (id: number, newValue: string) => {
    const list = getSelectedList();
    list.content[id].text = newValue;
    modifyListById(list);
  };
  const addItemToList = (itemText: string) => {
    const item: ListItem = {
      show: true,
      color: randomShade(),
      text: itemText,
      id: uid(16),
    };
    const newObj = getSelectedList();
    newObj.content.push(item);
    modifyListById(newObj);
  };
  const modifyContent = (newContent: ListItem[]) => {
    modifyListById({ ...getSelectedList(), content: newContent });
  };
  const addList = (title: string, selectedTemplateIndex = 0) => {
    // selectedTemplateIndex is decremendted, if it is equal to -1 we dont use one
    selectedTemplateIndex -= 1;
    let chosenTemplate: string[] = [];
    if (selectedTemplateIndex !== -1) {
      chosenTemplate = templates[selectedTemplateIndex].content;
    }
    const newList: List = createList(title, chosenTemplate);
    const newState = [...lists, newList];
    setLists(newState);
  };
  const removeListByIndex = (indexToRemove: number) => {
    const newState = lists.filter((item, index) => index !== indexToRemove);
    setLists(newState);
  };
  // wrapper for all functions related to modifying state
  const listModificationFunctions = {
    modifyListById,
    removeFromListById,
    addItemToList,
    modifyContent,
    addList,
    modifyListItemById,
    removeListByIndex,
  };
  // TEMPLATE FUNCTIONS
  const getSelectedTemplate = (): Template => {
    try {
      if (selectedTemplateIndex !== -1) {
        return templates[selectedTemplateIndex];
      } else {
        console.error("FFFF selected index is 0");
        return templates[0];
      }
    } catch (e) {
      console.error("FFFF selected index is 0", e);
      return templates[0];
    }
  };
  const removeFromTemplateByContent = (text: string) => {
    const template = getSelectedTemplate();
    const res = template.content.filter((item) => item !== text);
    const newObj = { ...template, content: res };
    modifyTemplateById(newObj);
  };
  const modifyTemplateItemById = (id: number, newValue: string) => {
    const template = getSelectedTemplate();
    template.content[id] = newValue;
    modifyTemplateById(template);
  };
  const modifyTemplateById = (
    newTemplate: Template,
    index = selectedTemplateIndex
  ) => {
    const newState = [...templates];
    newState[index] = newTemplate;
    setTemplates(newState);
    storeData(newState, "templates");
    console.log("new state dropped");
    // on change save to storage
  };
  const addItemToTemplate = (itemText: string) => {
    const newObj = getSelectedTemplate();
    newObj.content.push(itemText);
    modifyTemplateById(newObj);
  };

  const addTemplate = (title: string) => {
    const newList: Template = { title, content: [] };
    const newState = [...templates, newList];
    setTemplates(newState);
  };
  const removeTemplateByIndex = (indexToRemove: number) => {
    const newState = templates.filter((item, index) => index !== indexToRemove);
    setTemplates(newState);
  };
  const templateModifcationFunctions = {
    addItemToTemplate,
    modifyTemplateById,
    getSelectedTemplate,
    removeFromTemplateByContent,
    modifyTemplateItemById,
    addTemplate,
    removeTemplateByIndex,
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
    selectedTemplateIndex,
    setSelectedTemplateIndex,
    templateModifcationFunctions,
    addTemplate,
  };
  return (
    <DataContext.Provider value={{ ...val }}>
      <>{children}</>
    </DataContext.Provider>
  );
};
