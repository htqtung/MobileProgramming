import React from 'react';
import { Alert, StyleSheet, Text, View, Image, TouchableHighlight, TextInput, Picker, Item} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '', output: '', chosenCur: '0', currencies: [], kvArr:[]};
  }

  componentDidMount = () => {
    const url = 'https://api.fixer.io/latest';

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ currencies: responseJson.rates });
        console.log('data fetched!');
        //Log the content of the currencies array
        console.log("this.state.currencies: ");
        console.log(this.state.currencies);
        //-----------------------------------------
        let arrCurrencies = Object.keys(this.state.currencies);
        //------------------------------------------------------
        //Push the name - value pair to a better structure
        let arrOfObj = [];
        let length = arrCurrencies.length;
        for (var i = 0; i < length; i++) {
          let stringKey = arrCurrencies[i];
          arrOfObj.push({
            key: arrCurrencies[i],
            value: this.state.currencies[stringKey],
          })
        }
        console.log(arrOfObj);
        this.setState({ kvArr: arrOfObj, });
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }

  getExchangeRates = () => {
    console.log("index: " + this.state.chosenCur);
    let index = this.state.chosenCur;
    console.log("input " + this.state.input);
    console.log("value " + this.state.kvArr[index].value);
    let temp = (+this.state.input / +this.state.kvArr[index].value).toFixed(3);
    console.log("converted to: " + temp + " euro");
    this.setState(() => {
      return {
        output: temp + "€",
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image 
          source={require('./euro-coins.png')} 
          style={styles.topImage} />
        <Text style={{fontSize: 18, fontWeight: "bold",}}> {this.state.output} </Text>
        <View style={styles.rowContainer} >
          <TextInput 
            style={{width: 100, fontSize: 20, margin: 10,}}
            keyboardType='numeric'
            onChangeText={(input) => this.setState({input})} />
          <Picker
            style={{ width: 100, height: 50 }}
            mode="dropdown"
            selectedValue={this.state.chosenCur}
            onValueChange={(itemValue) => this.setState({ chosenCur: itemValue })}>
            {
              Object.keys(this.state.currencies).map((key, value, index) => {
                return <Picker.Item key={index} label={key} value={value} />
              })
            }
          </Picker>
        </View>
        <View style={styles.buttonView} >
          <TouchableHighlight onPress={this.getExchangeRates} underlayColor="#42bcf4" style={styles.button}>
            <Text>Convert</Text>
          </TouchableHighlight>
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
    borderWidth: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  topImage: {
    flex: 2,
    width: 250,
    height: 167,
  },
  buttonView: {
    flex: 3,
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
