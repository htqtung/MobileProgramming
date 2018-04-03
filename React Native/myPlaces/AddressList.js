import React from 'react';
import { List, ListItem } from 'react-native-elements';

export default class AddressList extends React.Component {
    render() {
        return (
            <List>
                {
                    this.props.data.map((item) => (
                        <ListItem
                            key={item.id}
                            title={item.address}
                            onPressRightIcon={() => this.props.showOnMap(item.id)}
                            onLongPress={() => this.props.deleteItem(item.id)}
                            rightTitle='show on map'
                        />
                    ))
                }
            </List>
        );
    }
}
