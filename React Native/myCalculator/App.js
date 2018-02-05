import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { num1: '', num2: '', result: '' };
  }

  plusButtonPressed = () => {
    const res = parseInt(this.state.num1) + parseInt(this.state.num2)
    this.setState(() => {
      return {result: res}
    });
  }
  minusButtonPressed = () => {
    const res = parseInt(this.state.num1) - parseInt(this.state.num2)
    this.setState(() => {
      return {result: res}
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'flex-end', padding: 10}}>
          <Text>Result: {this.state.result}</Text>
          <TextInput
            style={{width: 200, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(num1) => this.setState({num1})}
            keyboardType='numeric'
            value={this.state.num1}
          />
          <TextInput
            style={{width: 200, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(num2) => this.setState({num2})}
            keyboardType='numeric'
            value={this.state.num2}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around',
                      alignItems: 'flex-start', width: 150, padding: 10,}}>
          <Button style={[styles.button]} onPress={this.plusButtonPressed} title="+" />
          <Button style={[styles.button]} onPress={this.minusButtonPressed} title="-" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: 'black',
    borderWidth: 1,
  },
  button: {
    width: 48,
    height: 48,
    margin: 12,
    padding: 20,
  },
});
