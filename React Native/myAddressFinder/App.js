import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Button, TouchableHighlight, Alert } from 'react-native';
import MapView,{ Marker } from 'react-native-maps';

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
      markerLatitude: 60.201373, 
      markerLongitude: 24.934041,
      markerTitle: 'Haaga-Helia',
    };
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
        if(responseJson.status !== "ZERO_RESULTS") {
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
              markerLongitude: responseJson.results[0].geometry.location.lng,
              markerLatitude: responseJson.results[0].geometry.location.lat,
              region: newRegion,
            }
          });
          console.log("setState completed!");
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
    console.log('onRegionChange', newRegion);
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
          customMapStyle={mapStyle}>
          <Marker
            coordinate={{
              latitude: this.state.markerLatitude,
              longitude: this.state.markerLongitude
            }}
            title={this.state.markerTitle}
          />
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

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
];