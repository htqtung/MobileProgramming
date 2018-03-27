import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('shoppingdb.db');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: '', amount: '', data: [] }
  }
  
  componentDidMount() {
    console.log('componentDidMount!');
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoppinglist (id integer primary key not null, product text, amount text);');
    });
    this.updateList();
    //Test data
    this.createTestData('Eggs', '12 pcs');
    this.createTestData('Chicken', '500 grams');
    this.createTestData('Onions', '2 pcs');
  }

  updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoppinglist', [], (_, { rows }) => {
        this.setState({ 
          data: rows._array,
          product: '',
          amount: ''
        })
        // console.log(this.state.data);
      });
    });
  }

  saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shoppinglist (product, amount) values (?, ?)', [this.state.product, this.state.amount]);
    }, null, this.updateList);
  }

  createTestData = (product, amount) => {
    db.transaction(tx => {
      tx.executeSql('insert into shoppinglist (product, amount) values (?, ?)', [product, amount]);
    }, null, this.updateList);
  }

  deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql('delete from shoppinglist where id = ?;', [id]);
    }, null, this.updateList)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput
            style={styles.textInput}
            placeholder='Product'
            onChangeText={(product) => this.setState({ product })}
            value={this.state.product}
          />
          <TextInput
            style={styles.textInput}
            placeholder='Amount'
            onChangeText={(amount) => this.setState({ amount })}
            value={this.state.amount}
          />
          <Button onPress={this.saveItem} title="Save" />
        </View>
        <View style={styles.listandtitle}>
          <Text style={styles.titleText}>Shopping List</Text>
          <FlatList
            style={styles.listcontainer}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <View style={styles.listelement}>
                <Text style={{ fontSize: 18 }}>
                  {item.product}, {item.amount}
                </Text>
                <Text style={{ fontSize: 18, color: '#0000ff', right: 1 }}
                  onPress={() => this.deleteItem(item.id)}>
                   [bought]
                </Text>
              </View>}
            data={this.state.data}
            ItemSeparatorComponent={this.listSeparator}
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
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '80%',
    margin: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  //list and title container
  listandtitle: {
    width: '80%',
    height: '60%',
    flex: 2,
    alignItems: 'center',
  },
  titleText: {
    width: '80%',
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#00796B',
    fontWeight: 'bold',
    fontSize: 20,
  },
  // list elements
  listelement: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  // list element's container
  listcontainer: {
    width: '80%',
  }
});