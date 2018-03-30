import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import MapContainer from './MapContainer';

export default class HomeScreen extends React.Component {
    static navigationOptions = { title: 'Home' };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Button onPress={() => navigate('Map')} title="SHOW" />
            </View>
        );
    }
}
