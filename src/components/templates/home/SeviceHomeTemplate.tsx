import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

import mapStyle from '../../../styles/mapStyle';
import { seviceHomeTemplateStyles } from '../../../styles/styles';

const SeviceHomeTemplate = () => {
    return (
        <>
            <MapView
                style={seviceHomeTemplateStyles.map}
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
