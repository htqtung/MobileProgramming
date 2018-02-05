import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '', data: []}
  }
  
  addItem = () => {
    this.setState(() => {
      return {
        data: [...this.state.data, {key: this.state.text}],
        text: '',
      }
    });
  }

  clearList = () => {
    this.setState(() => {
      return {
        data: [],
        text: '',
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput 
            style={styles.textInput}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <View style={styles.buttonRow}>
            <Button onPress={this.addItem} title="Add" />
            <Button onPress={this.clearList} title="Clear" />
          </View>
        </View>
        <View style={styles.list}>
          <Text style={styles.titleText}>Shopping List</Text>
          <FlatList 
            data={this.state.data}
            renderItem={({item}) => <Text>{item.key}</Text>}
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
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 150,
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },
  list: {
    flex: 2,

  },
  titleText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20,
  }
});
