import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Template } from "../../helpers/types";

interface Props {
  templates: Template[];
  finishedFetching: boolean;
}
const TemplateCreator = ({ templates, finishedFetching }: Props) => {
  return finishedFetching ? <></> : <Text>Wait</Text>;
};

export default TemplateCreator;

const styles = StyleSheet.create({});
