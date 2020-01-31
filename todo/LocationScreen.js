import React, { Component } from 'react';

import { getLogger, navService } from '../core';
import  UserLocation  from './LocationUser';

const log = getLogger('LocationGeo');

export const LocationGeo = ({navigation }) => {
  return (
    <UserLocation/>
  );
};

LocationGeo.navigationOptions = () => ({
  headerTitle: 'Your Current Location',
});
