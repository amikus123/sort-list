
import React,{ createContext, useState, useEffect } from "react";
import { addFG } from "../functions/listsFunctions";
import { getInitialData } from "../functions/storageFunctions";
import { List, Template } from "../types";


export const DataContext = createContext(null);

export const DataProvider = ({ children }: { children: any }) => {
  const [lists, setLists] = useState<List[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [finishedFetching, setFinishedFetching] = useState(false);
  const [selectedListIndex,setSelectedListIndex] = useState(-1)
  const initiation = async () => {
    const { lists, templates } = await getInitialData();
    setFinishedFetching(true);
    setLists([addFG()]);
    setTemplates(templates);
  };

  useEffect(() => {
    initiation();
  }, []);

  
  const val = { lists, setLists,templates, setTemplates,setSelectedListIndex,selectedListIndex};
  return (
    <DataContext.Provider value={{ ...val }}>
      <>{children}</>
    </DataContext.Provider>
  );
};
