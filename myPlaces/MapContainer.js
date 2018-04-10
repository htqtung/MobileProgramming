import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Button, TouchableHighlight, Alert } from 'react-native';
import MapComp from './MapComp';

export default class MapContainer extends React.Component {
    static navigationOptions = {
        title: 'Map',
    };
    
    render() {
        const { params } = this.props.navigation.state;
        const itemId = params ? params.itemId : null;
        const mapData = params ? params.mapData : null;

        return (
            <View style={styles.container} >
                <MapComp mapData={mapData} />
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
});

