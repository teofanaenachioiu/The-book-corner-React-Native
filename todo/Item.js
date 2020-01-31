import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { getLogger } from '../core';

const log = getLogger('Item');

export default ({ item = {} }) => {
  log('render');
  return (
   <View style={styles.rowStyle}>
    <View style={styles.row_cell_timeplace}>
     <Text style={styles.titleStyle}>{item.title}</Text>
     <Text>{item.author}</Text>
    </View>
    <Text style={styles.row_cell_temp}>{item.gene}</Text>
 </View>);
};

var styles = StyleSheet.create({
  titleStyle : {
    textAlignVertical: 'top',
    includeFontPadding: false,
    flex: 0,
    fontSize: 14,
    fontWeight: "bold"
  },
  authorStyle: {
  },
  geneStyle: {
  },
  rowStyle: {
    elevation: 1,
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
    flex: 1,
    flexDirection: 'row',  // main axis
    justifyContent: 'flex-start', // main axis
    alignItems: 'center', // cross axis
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 18,
    paddingRight: 16,
    marginLeft: 14,
    marginRight: 14,
    marginTop: 0,
    marginBottom: 6,
  },
  row_cell_timeplace: {
    flex: 1,
    flexDirection: 'column',
  },
  row_cell_temp: {
    paddingLeft: 16,
    flex: 0,
  },
})