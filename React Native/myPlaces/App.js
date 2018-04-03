import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import MapContainer from './MapContainer';

export default class App extends React.Component {
  render() {
    return <MyPlacesApp style={styles.container}/>;
  }
}

const MyPlacesApp = StackNavigator({
  Home: { screen: HomeScreen },
  Map: { screen: MapContainer }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
