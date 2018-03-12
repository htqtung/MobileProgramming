import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableHighlight,
  Alert
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Location, Permissions } from 'expo';

const LATITUDE_DELTA = 0.0322;
const LONGITUDE_DELTA = 0.0221;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }

  // componentWillMount() {
  //   this.getLocation();
  // }

  getLocation = async () => {
    //Check permission
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('No permission to access location');
    }
    else {
      let currentLocation = await Location.getCurrentPositionAsync({});
      console.log('Before setState');
      console.log(this.state);
      let newRegion = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
      this.setState({ 
        region: newRegion,
       });
      console.log('After setState');
      console.log('location fetched: ', currentLocation);
      console.log(this.state);
    }
  }

  onRegionChange = (newRegion) => {

  }

  render() {
    
    console.log('at render time: ', this.state);
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <MapView style={{ flex: 1, width: 3000, }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
          <Marker
            coordinate={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude,
            }}
            title="You are here"
          />
        </MapView>

        <TouchableHighlight
          onPress={this.getLocation}
          underlayColor="#42bcf4"
          style={styles.button}>
          <Text style={styles.buttonTextStyle}>SHOW YOUR LOCATION</Text>
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
    position: 'absolute',
    bottom: 20,
    borderWidth: 2,
    height: 50,
    width: 200,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#42bcf4',
    backgroundColor: '#53c7fc',
  },
  buttonTextStyle: {
    paddingTop: '8%',
    paddingLeft: '10%',
    width: 200,
    height: 50,
  },
});