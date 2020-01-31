import React, { useContext } from 'react';
import {TouchableOpacity, ActivityIndicator, Button, FlatList, Text, View, ScrollView, StyleSheet } from 'react-native';

import { getLogger, navService } from '../core';
import { ItemContext } from './ItemContext';
import { AuthContext } from '../auth/AuthContext';
import Item from './Item';
import * as Network from 'expo-network';

const log = getLogger('ItemList');


export const ItemList = ({ navigation }) => {

  const { onSignOut } = useContext(AuthContext);

  console.log('in item list');

  console.log('render');

  console.disableYellowBox = true;

  return (
    <ScrollView>
      <ItemContext.Consumer>
        {({ isLoading, loadingError, items }) => (
          <View style={styles.container}>
            <ActivityIndicator animating={!!isLoading} size="large"/>

            {loadingError && <Text>{loadingError.message || 'Loading error'}</Text>}

            <View style={styles.containerbuttons}>
              <Button
                onPress={() =>navigateToChart(items)}
                title="Chart"
              />

              <Button
                onPress={() => navService.navigate('ItemAdd')}
                title="Add"
              />

              <Button
                  onPress={() => onSignOut().then(() => navigation.navigate('Auth'))}
                  title="Sign Out"
                />
            </View>
            
            {items && 
              <FlatList
                data={items.map(item => ({ ...item, key: item.id }))}
                renderItem={({ item }) =>
                <TouchableOpacity onPress={ () => actionOnRow(item)}>
                  <Item item={item}/>
                </TouchableOpacity>}
              />}

             
             
          </View>
        )}
      </ItemContext.Consumer>
    </ScrollView>
  )
};


function navigateToChart(items){
  var nrMemories =0;
  var nrHF =0;
  var nrMystery =0;
  var nrYAF =0;
  var nrCL =0;
  var nrReligion =0;
  var nrFantasy =0;
  var nrCF =0;
  var nrThriller =0;
  var nrPoems =0;
  var nrScience =0;

  items.map(item=>{
    switch(item.gene){
      case 'Memories':
        nrMemories = nrMemories+1;
        break;
      case 'Historical Fiction':
        nrHF = nrHF+1;
        break;
      case 'Mystery':
        nrMystery = nrMystery+1;
        break;
      case 'Young Adult Fiction':
        nrYAF = nrYAF+1;
        break;
      case 'Classical Literature':
        nrCL = nrCL+1;
        break;
      case 'Religion':
        nrReligion = nrReligion+1;
        break;
      case 'Fantasy':
        nrFantasy =  nrFantasy+1;
        break;
      case 'Children fiction':
        nrCF =  nrCF+1;
        break;
      case 'Thriller':
        nrThriller = nrThriller+1;
        break;
      case 'Poems':
        nrPoems =  nrPoems+1;
        break;
      case 'Science':
        nrScience =  nrScience+1;
        break;
      default:
        break;
    }
  });

  navService.navigate('Chart',{
    nrMemories : nrMemories,
    nrHF : nrHF, 
    nrMystery : nrMystery,
    nrYAF : nrYAF,
    nrCL : nrCL,
    nrReligion : nrReligion,
    nrFantasy : nrFantasy,
    nrCF : nrCF,
    nrThriller : nrThriller,
    nrPoems : nrPoems,
    nrScience : nrScience
  });
};

function actionOnRow(item){
    console.log(item);
    navService.navigate('ItemEdit',{title:item.title,author:item.author,gene:item.gene,_id:item._id});
 };


ItemList.navigationOptions = {
  headerTitle: 'Books List',
  headerRight: (
    <Button
    onPress={() => navService.navigate('LocationGeo')}
    title="Location"
  />
  )
};

var styles = StyleSheet.create({
  container : {
    flex: 1,
    flexDirection: 'column',  // main axis
    justifyContent: 'flex-start', // main axis
  },
  containerbuttons : {
    flex: 1,
    flexDirection: 'row',  // main axis
    justifyContent: 'space-around', // main axis
    bottom: 20
  }
});