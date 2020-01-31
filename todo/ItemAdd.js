import React, { Component } from 'react';
import { Picker,View, TextInput, Button, Text, StyleSheet } from 'react-native';

import { getLogger, navService } from '../core';
import { ItemContext } from "./ItemContext";

const log = getLogger('ItemAdd');

export const ItemAdd = ({ title = '', author='', gene='', navigation }) => {
  const [ value1, onChangeText1 ] = React.useState(title);
  const [ value2, onChangeText2 ] = React.useState(author);
  const [ value3, onChangeText3 ] = React.useState(gene);
  return (
    <ItemContext.Consumer>
      {({ onSubmit }) => (
        <View style={styles.container}>
            <Text>Titlu</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5 }}
            onChangeText={title => onChangeText1(title)}
            value1={value1}
          />
          <Text>Autor</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5 }}
            onChangeText={author => onChangeText2(author)}
            value2={value2}
          />
          <Text>Gen</Text>
          <Picker
            selectedValue = {value3} onValueChange = {gene=>onChangeText3(gene)} 
            style={{height: 50, width: 400}}>
            <Picker.Item label="Memories" value="Memories" />
            <Picker.Item label="Historical Fiction" value="Historical Fiction" />
            <Picker.Item label="Mystery" value="Mystery" />
            <Picker.Item label="Young Adult Fiction" value="Young Adult Fiction" />
            <Picker.Item label="Classical Literature" value="Classical Literature" />
            <Picker.Item label="Religion" value="Religion" />
            <Picker.Item label="Fantasy" value="Fantasy" />
            <Picker.Item label="Children fiction" value="Children fiction<" />
            <Picker.Item label="Thriller" value="Thriller" />
            <Picker.Item label="Poems" value="Poems" />
            <Picker.Item label="Science" value="Science" />
          </Picker>
          <Button
            title="Add"
            onPress={() => {
              onSubmit(value2,value3,value1, "user")
                .then(() => navigation.goBack())
            }}
          />
        </View>
      )}
    </ItemContext.Consumer>
  );
};

ItemAdd.navigationOptions = () => ({
  headerTitle: 'New book',
});

var styles = StyleSheet.create({
  container : {
    flex: 1,
    flexDirection: 'column',  // main axis
    justifyContent: 'flex-start', // main axis
    margin: 30,
    backgroundColor: '#F5F5F5',
    padding: 10,
    height: 'auto'
  },
});
