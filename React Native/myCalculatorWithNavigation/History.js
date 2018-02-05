import React from 'react';
import { StyleSheet, Text, View, FlatList, } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class History extends React.Component {
    static navigationOptions = { title: 'History', };

    render() {
        const { params } = this.props.navigation.state;
        const data = params ? params.data : null;
        return (
            <View style={styles.container}>
                <View>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <Text>{item.key}</Text>}
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
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        margin: 5,
    },
});