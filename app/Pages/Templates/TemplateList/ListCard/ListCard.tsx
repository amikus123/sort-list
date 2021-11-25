import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card,Button,Icon } from 'react-native-elements'

const ListCard = () => {
  return (

   <Card>
    <Card.Title>HELLO WORLD</Card.Title>
    <Card.Divider/>
      <Text style={{marginBottom: 10}}>
        The idea with React Native Elements is more about component structure than actual design.
      </Text>
      <Button
        icon={<Icon name='code' color='#ffffff' />}
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='VIEW NOW' />
  </Card> 
  )
}

export default ListCard

const styles = StyleSheet.create({})
