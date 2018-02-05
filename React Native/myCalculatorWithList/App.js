import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { num1: '', num2: '', result: '', data: [] };
  }

  plusButtonPressed = () => {
    const res = parseInt(this.state.num1) + parseInt(this.state.num2)
    this.setState(() => {
      return {
        result: res,
        num1: '',
        num2: '',
        data: [...this.state.data, 
          {key: this.state.num1 + ' + ' + this.state.num2 + ' = ' + res}],
      }
    });
  }
  minusButtonPressed = () => {
    const res = parseInt(this.state.num1) - parseInt(this.state.num2)
    this.setState(() => {
      return {
        result: res,
        num1: '',
        num2: '',
        data: [...this.state.data,
        { key: this.state.num1 + ' - ' + this.state.num2 + ' = ' + res }],
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
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
        <View style={styles.buttonContainer}>
          <Button onPress={this.plusButtonPressed} title="+" />
          <Button onPress={this.minusButtonPressed} title="-" />
        </View>
        <View style={styles.list}>
          <Text>History</Text>
          <FlatList 
            data={this.state.data} 
            renderItem={({item}) =><Text>{item.key}</Text>}
          />
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
    margin: 5,
  },
  list: {
    flex: 5,
  },
  input: {
    flex: 1, 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 10,
  },
  buttonContainer: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-around',
    alignItems: 'flex-start', 
    width: 150, 
    padding: 10,
  },
});
