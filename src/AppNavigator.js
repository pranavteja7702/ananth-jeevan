/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Easing} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Login from './Auth/Login';
import Home from './screens/Home';
// import LandingScreen from './LandingScreen';
// import {createDrawerNavigator} from '@react-navigation/drawer';

const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 500,
    easing: Easing.linear,
  },
};

const MainStackScreen = () => (
  <MainStack.Navigator
    initialRouteName="Loading"
    screenOptions={{headerShown: false}}>
    {/* <MainStack.Screen name="Loading" component={LandingScreen} /> */}
    <MainStack.Screen name="AuthStackScreen" component={AuthStackScreen} />
    <MainStack.Screen name="AppStack" component={AppStackScreen} />
  </MainStack.Navigator>
);

const AuthStackScreen = () => (
  <AuthStack.Navigator
    // headerMode="none"
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      transitionSpec: {
        open: config,
        close: closeConfig,
      },
    }}>
    <AuthStack.Screen name="Login" component={Login} />
  </AuthStack.Navigator>
);

const AppStackScreen = () => (
  <AppStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      transitionSpec: {
        open: config,
        close: closeConfig,
      },
    }}>
    <AppStack.Screen name="Home" component={Home} />
  </AppStack.Navigator>
);

class AppNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainStackScreen />
      </NavigationContainer>
    );
  }
}

export default AppNavigator;
