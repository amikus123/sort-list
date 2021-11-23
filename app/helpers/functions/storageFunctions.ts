import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (value: any, key: string) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const getKeys = async () => {
  const templeteKeys = await getData("templeteKeys");
  const listKeys = await getData("listKeys");

  return {
    templeteKeys,
    listKeys,
  };
};

export const getInitialData = async () => {
  const keys = await getKeys();
  const listPromises = [];
  const templatePromises = [];

  for (const x in keys.listKeys) {
    listPromises.push(getData(x));
  }
  for (const x in keys.templeteKeys) {
    templatePromises.push(getData(x));
  }
  const listPromisesSolved = await Promise.all(listPromises);
  const templatePromisesSolved = await Promise.all(templatePromises);

  // setLists(res);
  return {
    lists:listPromisesSolved,
    templates:templatePromisesSolved
  };
};
