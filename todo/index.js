import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import { ItemEdit } from './ItemEdit';
import { ItemAdd } from './ItemAdd';
import { ItemList } from './ItemList';
import { Chart } from './chart';
import {LocationGeo} from './LocationScreen'

export const Todo = createStackNavigator({
  ItemList: { screen: ItemList},
  ItemEdit: { screen: ItemEdit },
  ItemAdd: { screen: ItemAdd }, 
  Chart: { screen: Chart },
  LocationGeo: {screen: LocationGeo}
});

export * from './ItemStore';
