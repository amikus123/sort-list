import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  useNavigation,
  CompositeNavigationProp,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext } from "react";
import { Pressable } from "react-native";
import { Card, Text, Button, Icon } from "react-native-elements";
import { DataContext } from "../../helpers/context/dataContext";
import { List } from "../../helpers/types";

interface CardProps {
  title: string;
  desc: string;
  onClick: () => void;
  handleRemove?: (() => void) | null;
  buttonText: string;
  color?: string;
}

const MyCard = ({
  desc,
  title,
  handleRemove = null,
  onClick,
  buttonText,
  color = "rgb(32, 137, 220)",
}: CardProps) => {
  return (
    <Card>
      <Card.Title>{title}</Card.Title>
      {handleRemove === null ? null : (
        <Pressable onPress={handleRemove}>
          <Icon name="trash" type="font-awesome-5" />
        </Pressable>
      )}
      <Card.Divider />
      <Button
        onPress={onClick}
        buttonStyle={{
          backgroundColor: color,
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
