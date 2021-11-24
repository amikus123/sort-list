import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';

interface TopbarProps {
  title: string;
  leftButton: any;
}

const Topbar = ({ title, leftButton }: TopbarProps): React.ReactNode => {
  return (
    <Header
      style={{ width: '100%' }}
      leftComponent={leftButton}
      centerComponent={{ text: title, style: { color: '#fff' } }}
      rightComponent={{ icon: 'home', color: '#fff' }}
    />
  );
};

export default Topbar;

const styles = StyleSheet.create({});

// headerStyle: {
//   backgroundColor: '#9AC4F8',
// },
// headerTintColor: 'white',
// headerBackTitle: 'Back',
