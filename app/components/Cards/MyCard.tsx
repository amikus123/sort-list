import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  useNavigation,
  CompositeNavigationProp,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext } from "react";
import { Card,  Text, Button } from "react-native-elements";
import { DataContext } from "../../helpers/context/dataContext";
import { List } from "../../helpers/types";

interface CardProps {
  title:string,
  desc:string,
  onClick:()=>void,
  buttonText:string,
  color?:string,
}

const MyCard = ({desc,title,onClick,buttonText,color="rgb(32, 137, 220)"}: CardProps) => {

  return (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
      <Text style={{ marginBottom: 10 }}>{desc}</Text>
      <Button
        onPress={onClick}
        buttonStyle={{
          backgroundColor:color,
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title={buttonText}
      />
    </Card>
  );
};

export default MyCard;
