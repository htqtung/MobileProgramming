import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { FormLabel, FormInput, Button, Header, FormValidationMessage } from 'react-native-elements';
// import MapContainer from './MapContainer';
import AddressList from './AddressList';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('addressdb.db');
const msg = 'This field is required';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: { 

        },
    };

    constructor(props) {
        super(props);
        this.state = { address: '', data: [], formErrorMessage: ''}
    }
    
    // Create data table
    componentDidMount() {
        db.transaction(tx => {
            tx.executeSql('create table if not exists addresslist (id integer primary key not null, address text);');
        });
        this.updateList();
    }

    updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from addresslist', [], (_, { rows }) => {
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
        console.log("New address: " + this.state.address);
        // Check for empty field
        if (this.state.address == '') {
            this.setState({ formErrorMessage: msg });
        } else {
            db.transaction(tx => {
                tx.executeSql('insert into addresslist (address) values (?)', [this.state.address]);
            }, null, this.updateList);
        }
        console.log('Save() completed');
    }

    deleteItem = (id) => {
        console.log('deleteItem() init');
        db.transaction(tx => {
            tx.executeSql('delete from addresslist where id = ?;', [id]);
        }, null, this.updateList)
    }

    // Clear error message and input after successful save
    clearInputBox = () => {
        this.setState({
            address: '',
            formErrorMessage: '',
        })
    }

    // Get the address from this.state.data - an array of objects
    getAddressFromArray = (id, data) => {
        console.log('getAddFromArray() init');
        var i;
        for(i in data) {
            if(data[i].id == id){
                console.log('getAddFromArray() returns: ' + data[i].address);
                return data[i].address;
            }
        }
    }

    // Show the address on map
    showOnMap = (id) => {
        console.log('showOnMap() init');
        // get address from id
        let address = this.getAddressFromArray(id, this.state.data);
        let input = address.replace(" ", "+");
        let mapObject = {};
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + input + '&key=AIzaSyD3lUZMf7ipHhnI8gowzjUTvamaPBE3LP8';
        // Fetch data
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status !== "ZERO_RESULTS") {
                    mapObject = {
                        markerTitle: address,
                        region: {
                            latitude: responseJson.results[0].geometry.location.lat,
                            longitude: responseJson.results[0].geometry.location.lng,
                            latitudeDelta: 0.009,
                            longitudeDelta: 0.009,
                        }
                    }
                    // Send mapObject to Map component
                    this.props.navigation.navigate('Map', {
                        itemId: id,
                        mapData: mapObject,
                    });
                    console.log("showOnMap() completed");
                }
                else {
                    console.log("invalid address");
                    Alert.alert("Invalid address.");
                }
            })
            .catch((error) => {
                Alert.alert(error);
            });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View>
                    <FormLabel>PLACEFINDER</FormLabel>
                    <FormInput
                        placeholder='Type in address'
                        onChangeText={(address) => this.setState({ address })}
                        value={this.state.address}
                    />
                    <FormValidationMessage>
                        {this.state.formErrorMessage}
                    </FormValidationMessage>
                    <Button raised icon={{ name: 'save' }}
                        onPress={this.saveItem} title="SAVE"
                        buttonStyle={styles.buttonSave}
                        borderRadius={5}
                    />
                </View>
                <ScrollView style={styles.list}>
                    <AddressList data={this.state.data} showOnMap={this.showOnMap} deleteItem={this.deleteItem}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        // borderWidth: 1,
        // borderColor: 'gray',
    },
    buttonSave: {
        backgroundColor: '#2979FF',
    },
    list: {
        width: '100%',
        marginTop: 16,
    // borderColor: 'gray',
    // borderWidth: 1
    }
});