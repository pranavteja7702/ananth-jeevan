import React, {Component} from 'react';
import {View, Text, LogBox} from 'react-native';
import AppNavigator from './src/AppNavigator';

class App extends Component {
  componentDidMount() {
    LogBox.ignoreLogs([
      'ViewPropTypes will be removed',
      'ColorPropType will be removed',
      'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
    ]);
  }

  render() {
    return <AppNavigator />;
  }
}

export default App;
