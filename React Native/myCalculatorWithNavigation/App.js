import React from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import History from './History';

export default class App extends React.Component {
  render() {
    return <MyCalculator />;
  }
}

const MyCalculator = StackNavigator({
  Home: {screen: HomeScreen},
  History: {screen: History}
});

