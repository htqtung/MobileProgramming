
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, TextInput, FlatList, Alert, StatusBar } from 'react-native';

//
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [], ingredient: '', imgURI: '' };
  }

  getRecipes = () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + this.state.ingredient;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ recipes: responseJson.results });
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }

  listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "90%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <FlatList
          keyExtractor={item => item.title}
          renderItem={({ item }) => <View style={styles.listElement}>
                                      <Image source={{ uri: item.thumbnail }}
                                          style={{ width: 40, height: 40, marginRight: 4, }} />
            <Text style={{ fontSize: 18, flexWrap: 'wrap', }}>{item.title}</Text>
                                    </View>} data={this.state.recipes}
          ItemSeparatorComponent={this.listSeparator} />
        <TextInput style={{ fontSize: 18, width: 200 }} placeholder='ingredient' onChangeText={(ingredient) => this.setState({ ingredient })} />
        <TouchableHighlight onPress={this.getRecipes} underlayColor="#42bcf4" style={styles.button}>
          <Text>Find</Text>
        </TouchableHighlight>
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
    paddingLeft: 4,
    paddingRight: 4,
  },
  listElement: {
    flexDirection: 'row',
    paddingTop: 8,
  },
  button: {
    borderWidth: 2,
    height: 50,
    width: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#42bcf4',
  },
});