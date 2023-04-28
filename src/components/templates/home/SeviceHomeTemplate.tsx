import React from 'react';
import MapView from 'react-native-maps';

import mapStyle from '../../../styles/mapStyle';
import NearbyPostListModal from '../../organisms/NearbyPostListModal';
import { seviceHomeTemplateStyles } from '../../../styles/styles';

const SeviceHomeTemplate = () => {
    return (
        <>
            <MapView
                style={seviceHomeTemplateStyles.map}
                initialRegion={{
                    latitude: 37.531312,
                    longitude: 126.927384,
                    latitudeDelta: 0.0822,
                    longitudeDelta: 0.0221,
                }}
                customMapStyle={mapStyle}
            />
            <NearbyPostListModal />
        </>
    );
};

export default SeviceHomeTemplate;
