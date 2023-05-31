import React, { memo } from 'react';
import { Marker } from 'react-native-maps';
import { mapWithMarkerStyles } from '../../styles/styles';

const MapCurrentMarker = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
    const MARKER_CURRENT_IMAGE = require('../../assets/icons/map-current-marker.png');
    return (
        <Marker
            coordinate={{
                latitude: latitude,
                longitude: longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
            style={mapWithMarkerStyles.markerBox}
            icon={MARKER_CURRENT_IMAGE}
        />
    );
};

export default memo(MapCurrentMarker);
