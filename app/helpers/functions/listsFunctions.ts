import { uid } from "uid";
import { nameList } from "../constants";
import { List, ListItem, Template } from "../types";

export const createList = (title: string, stringTemplate: string[]): List => {
  const content = [];
  for (const x of stringTemplate) {
    const item: ListItem = {
      show: true,
      color: randomShade(),
      text: x,
      id: uid(16),
    };
    content.push(item);
  }
  return {
    content,
    description: "",
    title,
  };
};
export const addFG = (): List => {
  const content = [];
  for (const x of nameList) {
    const item: ListItem = {
      show: true,
      color: randomShade(),
      text: x,
      id: uid(16),
    };
    content.push(item);
  }
  return {
    content,
    description: "TEST",
    title: "3FG",
  };
};

export const addFgTemplate = (): Template => {
  return {
    content: nameList,
    title: "3FG",
  };
};

export const randomShade = () => {
  var newColor =
    "rgb(" +
    (Math.floor((255 - 220) * Math.random()) + 219) +
    "," +
    (Math.floor((195 - 145) * Math.random()) + 144) +
    "," +
    (Math.floor((30 - 0) * Math.random()) + 0) +
    ")";

  return newColor;
};
