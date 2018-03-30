import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Button, TouchableHighlight, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default class MapContainer extends React.Component {
    static navigationOptions = {title: 'Map'};
    
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

