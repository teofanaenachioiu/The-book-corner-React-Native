import { createStackNavigator } from 'react-navigation-stack';

import { LoginScreen } from './LoginScreen';

export const Auth = createStackNavigator({
  Login: { 
    screen: LoginScreen,  
    navigationOptions: {
      header: null,
    } 
  },
});

export * from './AuthLoading';
export * from './AuthStore';
