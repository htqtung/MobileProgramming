import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, AsyncStorage } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      numOfGuess: 1, 
      randomNum: Math.floor(Math.random() * 100) + 1, 
      inputNum: '', 
      message: 'Guess a number between 1-100',
      highscore: '',
    };
  }

  async saveHighscore(score) {
    console.log('saveHighscore is called with value: ', score);
    try {
      await AsyncStorage.setItem('myGuessingGameHighScore', JSON.stringify(score));
      console.log('Highscore saved!');
    } catch (error) {
      // Error saving data
      console.log('Error with saving function');
    }
  }

  getHighscore = async () => {
    console.log('getHighscore is called');
    try {
      let value = await AsyncStorage.getItem('myGuessingGameHighScore');
      console.log('value loaded: ', value);
      if (value !== null) {
        // We have data!!
        console.log('We have data: ', this.state.highscore);
        this.setState(() => {
          return {
            highscore: value,
          }
        })
      }
    } catch (error) {
      console.log('enter catch');
      // Error retrieving data
      console.log('Error retrieving data');
    }
  }

  makeGuess = () => {
    console.log('makeGuess is called');
    console.log('right answer: ', this.state.randomNum);
    console.log('numOfGuesses: ', this.state.numOfGuess);
    let msg = 'Your guess ' + this.state.inputNum + ' is';
    this.setState({numOfGuess: this.state.numOfGuess + 1});
    if(isNaN(this.state.inputNum) || this.state.inputNum < 1 || this.state.inputNum > 100) {
      Alert.alert('Invalid guess');
      this.setState(() => {
        return {
          inputNum: '',
          message: 'Guess a number between 1-100',
        }
      });
    }
    else if(this.state.inputNum < this.state.randomNum) {
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
      console.log('Guessed right');
      Alert.alert('You guessed the number in ' + this.state.numOfGuess + ' guesses');
      if(+this.state.highscore > 0 && this.state.numOfGuess < +this.state.highscore) {
        this.setState(() => {
          return {
            highscore: this.state.numOfGuess,
          }
        });
        this.saveHighscore(this.state.numOfGuess);
      }
      else if(+this.state.highscore < 1){
        console.log('no highscore found: ',this.state.highscore);
        this.setState(() => {
          return {
            highscore: this.state.numOfGuess,
          }
        });
        this.saveHighscore(this.state.numOfGuess);
      }
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

  componentDidMount() {
    this.getHighscore();
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
          <Text>Highscore: {this.state.highscore}</Text>
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
