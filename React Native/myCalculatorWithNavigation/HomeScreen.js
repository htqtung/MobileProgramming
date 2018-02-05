import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, StatusBar, } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class HomeScreen extends React.Component {
  static navigationOptions = {title: 'Home',};

  constructor(props) {
    super(props);
    this.state = { num1: '', num2: '', result: '', data: [] };
  }

  plusButtonPressed = () => {
    const res = parseInt(this.state.num1) + parseInt(this.state.num2)
    if(isNaN(res)) {
      return {
        num1: '',
        num2: '',
      }
    }
    else {
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
  }
  minusButtonPressed = () => {
    const res = parseInt(this.state.num1) - parseInt(this.state.num2)
    if (isNaN(res)) {
      return {
        num1: '',
        num2: '',
      }
    }
    else {
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
        <View style={styles.smallContainer}>
          <View style={styles.buttonContainer}>
            <Button onPress={this.plusButtonPressed} title=" + " />
            <Button onPress={this.minusButtonPressed} title=" - " />
          </View>
          <View style={styles.navigateButton}>
            <Button
              onPress={() => this.props.navigation.navigate('History', {data: this.state.data})} 
              title="History"
            />
          </View>
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
  input: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  smallContainer: {
    flex: 5,
    justifyContent: 'space-around',
  },
  buttonContainer: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-around',
    width: 200, 
    padding: 10,
  },
  navigateButton: {
    flex: 12,
  },
});