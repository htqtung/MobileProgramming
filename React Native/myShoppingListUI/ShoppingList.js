import React from 'react';
import { List, ListItem } from 'react-native-elements';

class ShoppingList extends React.Component {
    render() {
        return (
            <List>
                {
                    this.props.data.map((item) => (
                        <ListItem
                            key={item.id}
                            title={item.product}
                            subtitle={item.amount}
                            onPressRightIcon={() => this.props.deleteItem(item.id)}
                            rightTitle='bought'
                        />
                    ))
                }
            </List>
        );
    }
}

export default ShoppingList;