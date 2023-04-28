import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

import mapStyle from '../../../styles/mapStyle';

const SeviceHomeTemplate = () => {
    return (
        <>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 37.531312,
                    longitude: 126.927384,
                    latitudeDelta: 0.0522,
                    longitudeDelta: 0.0221,
                }}
                customMapStyle={mapStyle}
            />
        </>
    );
};

export default SeviceHomeTemplate;
