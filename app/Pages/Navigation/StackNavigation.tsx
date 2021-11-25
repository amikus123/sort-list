// ./navigation/StackNavigator.js

import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getHeaderTitle } from "@react-navigation/elements";

import Home from "../Home/Home/Home";
import List from "../Home/List/List";

import Templates from "../Templates/Templates";
import { HomePaths, TemplatePaths } from "../../helpers/paths";
import { Button } from "react-native";
import Topbar from "../../components/Topbar/Topbar";
import { DataContext } from "../../helpers/context/dataContext";
import TemplatesList from "../Templates/TemplateList/TemplateList";
const Stack = createStackNavigator();
const screenOptionStyle = {};

const HomeStackNavigator = () => {
  const { selectedListIndex, lists } = useContext(DataContext);
  const getHeaderTitle = () => {
    if (selectedListIndex !== -1) {
      return lists[selectedListIndex].title;
    }
    return HomePaths.list;
  };
  const listPageOptions = {
    headerTitle: getHeaderTitle(),
  };
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name={HomePaths.home} component={Home} />
      <Stack.Screen
        name={HomePaths.list}
        component={List}
        options={listPageOptions}
      />
    </Stack.Navigator>
  );
};

const TemplateStackNavigator = () => {
  const { selectedTemplateIndex, templates } = useContext(DataContext);

  const getHeaderTitle = () => {
    if (selectedTemplateIndex !== -1) {
      return templates[selectedTemplateIndex].title;
    }
    return TemplatePaths.list;
  };
  const listPageOptions = {
    headerTitle: getHeaderTitle(),
  };
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name={TemplatePaths.home} component={Templates} />
      <Stack.Screen
        name={TemplatePaths.list}
        options={listPageOptions}
        component={TemplatesList}
      />
    </Stack.Navigator>
  );
};

export { HomeStackNavigator, TemplateStackNavigator };
