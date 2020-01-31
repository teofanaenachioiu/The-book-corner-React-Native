import React, { Component } from 'react';
import {Picker, View, TextInput, Button, Text, StyleSheet} from 'react-native';
import { getLogger, navService } from '../core';
import { ItemContext } from "./ItemContext";
const log = getLogger('ItemEdit');

export const ItemEdit = ({ title='', author='', gene='', _id='',navigation }) => {
  title = title+ navigation.state.params.title;
  author = author+ navigation.state.params.author;
  gene = gene+ navigation.state.params.gene;
  _id = _id + navigation.state.params._id;
  console.log(navigation);
  console.log(author)
  console.log(title)
  console.log(gene)
  console.log(_id)
  const [ value1, onChangeText1 ] = React.useState(title);
  const [ value2, onChangeText2 ] = React.useState(author);
  const [ value3, onChangeText3 ] = React.useState(gene);
  const [ value4, onChangeText4 ] = React.useState(_id);
  return (
    <ItemContext.Consumer>
      {({ onSubmit, onDelete, onEdit, getData }) => (
        <View style={styles.container}>
            <Text>Titlu</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 , paddingLeft: 5}}
            onChangeText={title => onChangeText1(title)}
            value={value1}
          />
          <Text>Autor</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5 }}
            onChangeText={author => onChangeText2(author)}
            value={value2}
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
          <Text></Text>
          <Button
            title="Edit"
            onPress={() => {
              onEdit(value2,value3,value1,value4, "user"),navigation.goBack();
            }}
          />
          <Text></Text>
          <Button
            title="Delete"
            onPress={() => { onDelete(value4), getData(), navigation.goBack();
            }}
          />
        </View>
      )}
    </ItemContext.Consumer>
  );
};


ItemEdit.navigationOptions = () => ({
  headerTitle: 'Item Edit',
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