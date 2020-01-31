import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

export default class UserLocation extends Component {

  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.paragraph}>
          Here is the map!
        </Text>
        {
          this.state.locationResult === null ?
            <Text>Finding your current location...</Text> :

          this.state.hasLocationPermissions === false ?
            <Text>Location permissions are not granted.</Text> :

          this.state.mapRegion === null ?
            <Text>Map region doesn't exist.</Text> :

          <MapView
            style={{ alignSelf: 'stretch', height: 700 }}
            region={this.state.mapRegion}
            onRegionChange={this.handleMapRegionChange}
          />
        }
      </View>
    );
  }

  async handleMapRegionChange (mapRegion){
    console.log(mapRegion);
    console.disableYellowBox = true;
    this.setState({ mapRegion:mapRegion });
  }

  async getLocationAsync (){
   let { status } = await Permissions.askAsync(Permissions.LOCATION);

   if (status !== 'granted'){
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   } else {
     this.setState({ hasLocationPermissions: true });
   }

   let location = await Location.getCurrentPositionAsync({});
   
   this.setState({ locationResult: JSON.stringify(location) });
   
   // Center the map on the location we just fetched.
    this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
