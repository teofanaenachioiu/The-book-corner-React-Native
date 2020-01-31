import React, { Component } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View , Image} from 'react-native';

import { getLogger } from '../core';
import { Consumer } from './AuthContext';

const log = getLogger('Login Screen');

export const LoginScreen = ({ navigation }) => {

  log('render');
  const [ username, onChangeUsername ] = React.useState('');
  const [ password, onChangePassword ] = React.useState('');

  return (
    <Consumer>
      {({ onSignIn, signInError, signInInProgress }) => (

        <View style={styles.container}>
          <ActivityIndicator animating={signInInProgress} size="large"/>

          <TextInput
            style={styles.textInput}
            placeholder="Username"
            onChangeText={text => onChangeUsername(text)}
            value={username}
          />

          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={text => onChangePassword(text)}
            secureTextEntry={true}
            value={password}
          />

          <Button style={styles.loginButton} title="Login" onPress={() => {
            onSignIn(username, password)
              .then(() => navigation.navigate('Todo',{user:username}))
          }} />

          <View style={styles.label}>
            {signInError && <Text>{signInError.message || 'Sign in error'}</Text>}
          </View>
        </View>
      )}
    </Consumer>
  );
};

LoginScreen.navigationOptions = () => ({
  headerTitle: 'Please Sign In',
  
});

const styles = StyleSheet.create({
  textInput: {
    marginVertical: 5,
    height: 40,
    borderColor: '#F5F5F5',
    borderWidth: 1,
    paddingHorizontal: 10
  },
  loginButton: {
    padding: 20,
    height: 40,
    borderWidth: 5,
    borderRadius: 25,
  },
  label:{
    padding: 3,
    color: 'red',
    alignSelf:"center"
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    top: 30,
    padding:30,
    backgroundColor: '#ffffff',
  }
});