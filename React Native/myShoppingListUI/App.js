import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SQLite } from 'expo';
import { FormLabel, FormInput, FormValidationMessage, Button, Header } from 'react-native-elements';
import ShoppingList from './ShoppingList';

const db = SQLite.openDatabase('shoppingdb.db');
const msg = 'This field is required.';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: '', amount: '', data: [], formMessage: '' }
  }
  
  componentDidMount() {
    console.log('componentDidMount!');
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoppinglist (id integer primary key not null, product text, amount text);');
    });
    //Test data
    // this.createTestData('Eggs', '12 pcs');
    // this.createTestData('Chicken', '500 grams');
    // this.createTestData('Onions', '2 pcs');
    this.updateList();
    console.log(this.state.data);
  }

  updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoppinglist', [], (_, { rows }) => {
        this.setState({
          data: rows._array
        })
        console.log(this.state.data);
      });
    });
    console.log('list updated');
    this.clearInputBox();
  }

  saveItem = () => {
    // console.log(this.state.product);
    // console.log(this.state.amount);
    if(this.state.product == '' || this.state.amount == '') {
      this.setState({ formMessage: msg });
    } else {
      db.transaction(tx => {
        tx.executeSql('insert into shoppinglist (product, amount) values (?, ?)', [this.state.product, this.state.amount]);
      }, null, this.updateList);
    }
    console.log('Save() called');
  }

  clearInputBox = () => {
    this.setState({
      product: '',
      amount: '',
      formMessage: '',
    })
  }

  createTestData = (product, amount) => {
    db.transaction(tx => {
      tx.executeSql('insert into shoppinglist (product, amount) values (?, ?)', [product, amount]);
    }, null, this.updateList);
    console.log('created test data');
  }

  deleteItem = (id) => {
    console.log('deleteItem() called');
    db.transaction(tx => {
      tx.executeSql('delete from shoppinglist where id = ?;', [id]);
    }, null, this.updateList)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header 
          style={styles.header}
          outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
          placement="left"
          centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff' } }}
        />
        <View style={styles.body}>
          <View style={styles.input}>
            <FormLabel>PRODUCT</FormLabel>
            <FormInput
              placeholder='Product'
              onChangeText={(product) => this.setState({ product })}
              value={this.state.product}
            />
            <FormValidationMessage>
              {this.state.formMessage}
            </FormValidationMessage>
            <FormLabel>AMOUNT</FormLabel>
            <FormInput
              placeholder='Amount'
              onChangeText={(amount) => this.setState({ amount })}
              value={this.state.amount}
            />
            <FormValidationMessage>
              {this.state.formMessage}
            </FormValidationMessage>
            <Button raised icon={{name: 'save'}} 
              onPress={this.saveItem} title="SAVE"
              buttonStyle={styles.buttonSave}
              borderRadius={5}
            />
          </View>
          <ScrollView style={styles.list}>
            <ShoppingList data={this.state.data} deleteItem={this.deleteItem} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    width: '100%',
  },
  body: {
    flex: 9,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'stretch',

  },
  buttonSave: {
    backgroundColor: '#2979FF',
    
  },
  //list and title container
  list: {
    width: '100%',
    marginTop: 16,
    // borderColor: 'gray',
    // borderWidth: 1
  },
});