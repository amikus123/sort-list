/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import BottomTabNavigator from "./app/Pages/Navigation/TabNaviagtion";
import { DataProvider } from "./app/helpers/context/dataContext";

const linking = {
  enabled: true, 
  prefixes: ["https://mychat.com", "mychat://"]
};

export default function App() {
  return (
    <>
      <DataProvider>
        <NavigationContainer linking={linking} >
          <BottomTabNavigator />
        </NavigationContainer>
      </DataProvider>
    </>
  );
}

const styles = StyleSheet.create({});
