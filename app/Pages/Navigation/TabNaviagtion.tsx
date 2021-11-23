// ./navigation/TabNavigator.js

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeStackNavigator, TemplateStackNavigator } from "./StackNavigation";
import { Icon } from "react-native-elements";
import { HomePaths,TemplatePaths} from "../../helpers/paths"

const Tab = createBottomTabNavigator();




const BottomTabNavigator = () => {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === HomePaths.home) {
          iconName = "home";
        } else if (route.name === TemplatePaths.home) {
          iconName = "dashboard";
        }
        return (
          <Icon
            type="material"
            name={iconName}
            color={focused ? "orange" : "black"}
          />
        );
      },
      tabBarActiveTintColor: "orange",
      tabBarInactiveTintColor: "gray",
    })}
  >
      <Tab.Screen name={HomePaths.home} component={HomeStackNavigator} />
      <Tab.Screen name={TemplatePaths.home} component={TemplateStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

