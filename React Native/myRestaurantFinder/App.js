import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  KeyboardAvoidingView, 
  TextInput, 
  TouchableHighlight, 
  Alert, 
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      region: {
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
      },
      listOfRestaurant: [],
    };
  }

  componentDidMount() {
    this.getListOfRestaurant();
  }

  getAddress = () => {
    let temp = this.state.input;
    let input = temp.replace(" ", "+");
    console.log(input);
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + input + '&key=AIzaSyD3lUZMf7ipHhnI8gowzjUTvamaPBE3LP8';
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status !== "ZERO_RESULTS") {
          this.setState(() => {
            let newRegion = {
              latitude: responseJson.results[0].geometry.location.lat,
              longitude: responseJson.results[0].geometry.location.lng,
              latitudeDelta: 0.0322,
              longitudeDelta: 0.0221
            };
            return {
              markerTitle: this.state.input,
              input: '',
              region: newRegion,
            }
          });
          this.getListOfRestaurant();
          console.log("Set origin point completed!");
        }
        else {
          Alert.alert("Invalid address.");
        }
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }

  getListOfRestaurant = () => {
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
      + this.state.region.latitude + ',' + this.state.region.longitude 
      + '&radius=500&type=restaurant&key=AIzaSyD2iG--tfLYJbnoV6zisGLJ4WYJMjGCNeA';
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status !== "ZERO_RESULTS") {
          this.setState(() => {
            return {
              listOfRestaurant: responseJson.results,
            }
          });
          console.log("List of restaurant completed!");
        }
        else {
          Alert.alert("Invalid address.");
        }
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }

  onRegionChange = (newRegion) => {
    
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <MapView style={{ flex: 1, width: 3000, }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
          {this.state.listOfRestaurant.map(marker => (
            <Marker
              key={marker.place_id}
              coordinate={{
                latitude: marker.geometry.location.lat,
                longitude: marker.geometry.location.lng,
              }}
              title={marker.name}
              description={marker.vicinity}
            />
          ))}
        </MapView>


        <TextInput
          style={{ width: 300, fontSize: 20, margin: 10, }}
          keyboardType="default"
          onChangeText={(input) => this.setState({ input })} />
        <TouchableHighlight
          onPress={this.getAddress}
          underlayColor="#42bcf4"
          style={styles.button}>
          <Text>FIND</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
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
