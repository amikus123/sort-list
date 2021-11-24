import React, { createContext, useState, useEffect } from 'react';
import { uid } from 'uid';
import { addFG, randomShade, addFgTemplate } from '../functions/listsFunctions';
import { getInitialData, storeData } from '../functions/storageFunctions';
import { List, ListItem, Template } from '../types';

export const DataContext = createContext(null);

export const DataProvider = ({ children }: { children: any }) => {
  const [lists, setLists] = useState<List[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [finishedFetching, setFinishedFetching] = useState(false);

  const [selectedListIndex, setSelectedListIndex] = useState(-1);
  useEffect(() => {
    console.log(lists, 'ZMIANA');
  }, [lists]);
  const initiation = async () => {
    const storage = await getInitialData();
    setFinishedFetching(true);
    if (storage.lists !== null && storage.lists.length === 0) {
      setLists([addFG()]);
    } else {
      setLists(storage.lists);
    }
    if (storage.templates !== null && storage.templates.length === 0) {
      setTemplates([addFgTemplate()]);
    } else {
      setTemplates([storage.templates]);
    }
  };

  const getSelectedList = () => {
    try {
      if (selectedListIndex !== -1) {
        return lists[selectedListIndex];
      } else {
        console.error('FFFF selected index is 0');
        return lists[0];
      }
    } catch (e) {
      console.error('FFFF selected index is 0', e);
    }
  };

  const modifyListById = (newList: List, index = selectedListIndex) => {
    const newState = [...lists];
    newState[index] = newList;
    setLists(newState);
    storeData(newState, 'lists');
    console.log('new state dropped');
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
  const addList = (title: string) => {
    const newList: List = { title, content: [], description: '' };
    const newState = [...lists, newList];
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
