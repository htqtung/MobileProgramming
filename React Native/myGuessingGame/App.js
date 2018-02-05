import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      numOfGuess: 1, 
      randomNum: Math.floor(Math.random() * 100) + 1, 
      inputNum: '', 
      message: 'Guess a number between 1-100'
    };
  }

  makeGuess = () => {
    let msg = 'Your guess ' + this.state.inputNum + ' is';
    this.setState({numOfGuess: this.state.numOfGuess + 1});
    if(this.state.inputNum < this.state.randomNum) {
      msg += ' too low';
      this.setState(() => {
        return { 
          message: msg,
          inputNum: '',
         }
      });
    }
    else if (this.state.inputNum > this.state.randomNum) {
      msg += ' too high';
      this.setState(() => {
        return { 
          message: msg,
          inputNum: '',
        }
      });
    }
    else {
      Alert.alert('You guessed the number in ' + this.state.numOfGuess + ' guesses');
      this.setState(() => {
        return {
          numOfGuess: 1, 
          randomNum: Math.floor(Math.random() * 100) + 1, 
          inputNum: '', 
          message: 'Guess a number between 1-100'
        }
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.gameBox}>
          <Text>{this.state.message}</Text>
          <TextInput 
            style={{ width: 50, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(inputNum) => this.setState({ inputNum })}
            keyboardType='numeric'
            value={this.state.inputNum}
          />
          <Button style={styles.button} onPress={this.makeGuess} title="Make Guess" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  gameBox: {
    height: 200,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    top: 500,
    marginTop: 20,
  },
});
