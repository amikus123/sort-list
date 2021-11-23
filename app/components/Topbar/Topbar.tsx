import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "react-native-elements";

interface props {
  children: string;
}

const Topbar = ({ children }: props) => {

  return (
    <Header
style={{ width: "100%" }}
leftComponent={{
  icon: "menu",
  color: "#fff",
  iconStyle: { color: "#fff" },
}}
centerComponent={{ text: children, style: { color: "#fff" } }}
rightComponent={{ icon: "home", color: "#fff" }}
/> 

  );
};

export default Topbar;

const styles = StyleSheet.create({});

