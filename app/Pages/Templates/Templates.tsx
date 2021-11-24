import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';

import { Button } from 'react-native-elements';
import { StackActions } from '@react-navigation/native';
import MyCard from '../../components/Cards/MyCard';
import { DataContext } from '../../helpers/context/dataContext';
import { HomePaths } from '../../helpers/paths';
import { List, Template } from '../../helpers/types';

const Templates = () => {
  const { templates, selectedListIndex, setSelectedListIndex } = useContext(DataContext);
  const navigation = useNavigation();
  useEffect(() => {
    if (selectedListIndex !== -1) {
      const pushAction = StackActions.push(HomePaths.list);
      navigation.dispatch(pushAction);
    }
  }, [selectedListIndex]);

  const createCard = (item: Template, index: number) => {
    const { title } = item;
    // on click we set index of list to show, and then we moove to that page
    // we do that beacuse otherwise some error may occur in list component
    const handleClick = () => {
      setSelectedListIndex(index);
      console.log('CHANLGED');
    };
    return <MyCard title={title} desc={''} buttonText="Open" onClick={handleClick} />;
  };
  //should add new list to state
  const handleAdd = () => {
    console.log('TODO');
  };

  return (
    <>
      <Button
        onPress={() => {
          setSelectedListIndex(0);
        }}
        title="reset to -1"
      />
      <FlatList data={templates} renderItem={({ item, index }) => createCard(item, index)} />
      <MyCard
        onClick={handleAdd}
        desc=""
        title="NEED TO LIST"
        buttonText="Add List"
        color="yellow"
      />
    </>
  );
};

export default Templates;

const styles = StyleSheet.create({});
