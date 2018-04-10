import React from 'react';
import MapView, { Marker } from 'react-native-maps';

export default class MapComp extends React.Component {
    render() {
        return (
            <MapView style={{ flex: 1, width: 3000, }}
                region={this.props.mapData.region}>
                <Marker
                    coordinate={{
                        latitude: this.props.mapData.region.latitude,
                        longitude: this.props.mapData.region.longitude
                    }}
                    title={this.props.mapData.markerTitle}
                />
            </MapView>
        );
    }
}
