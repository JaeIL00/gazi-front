import React, { useState } from 'react';
import { Image, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import TouchButton from '../../smallest/TouchButton';
import MapWithMarker from '../../organisms/MapWithMarker';
import NearbyPostListModal from '../../organisms/NearbyPostListModal';
import { UserPositionTypes } from '../../../types/types';
import { seviceHomeTemplateStyles } from '../../../styles/styles';

const SeviceHomeTemplate = () => {
    // Get current user position
    const [currentPosition, setCurrentPosition] = useState<UserPositionTypes>({
        latitude: 37.531312,
        longitude: 126.927384,
    });
    const onPressGetUserPosition = () => {
        Geolocation.getCurrentPosition(info => {
            setCurrentPosition({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
            });
        });
    };

    return (
        <>
            <MapWithMarker currentPosition={currentPosition} />
            <View style={seviceHomeTemplateStyles.toggleButtonBox}>
                <TouchButton
                    onPress={onPressGetUserPosition}
                    width={52}
                    height={52}
                    borderRadius={52}
                    backgroundColor={Colors.WHITE}
                    borderWidth={1}
                    borderColor="#E3E3E3">
                    <Image
                        source={require('../../../assets/icons/location.png')}
                        style={seviceHomeTemplateStyles.locationIcon}
                    />
                </TouchButton>
                <Spacer height={8} />
                <TouchButton
                    onPress={() => {}}
                    width={52}
                    height={52}
                    borderRadius={52}
                    backgroundColor={Colors.VIOLET}>
                    <Image
                        source={require('../../../assets/icons/write.png')}
                        style={seviceHomeTemplateStyles.writeIcon}
                    />
                </TouchButton>
            </View>
            <NearbyPostListModal />
        </>
    );
};

export default SeviceHomeTemplate;
