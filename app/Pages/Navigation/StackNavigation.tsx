// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Home/Home/Home";
import TemplateCreator from "../Templates/TempleteCreator";
import { HomePaths,TemplatePaths} from "../../helpers/paths"

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};



const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name={HomePaths.home} component={Home} />
      {/* <Stack.Screen name={HomePaths.list} component={ListPage} /> */}
    </Stack.Navigator>
  );
};

const TemplateStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name={TemplatePaths.home} component={TemplateCreator} />
    </Stack.Navigator>
  );
};

export { HomeStackNavigator, TemplateStackNavigator };