import React, { useState } from 'react';
import { Image, Platform, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import DropShadow from 'react-native-drop-shadow';

import MapWithMarker from '../../organisms/MapWithMarker';
import NearbyPostListModal from '../../organisms/NearbyPostListModal';
import { SingleLineInput } from '../../smallest/SingleLineInput';
import { seviceHomeTemplateStyles } from '../../../styles/styles';
import { SeviceHomeTemplateProps, UserPositionTypes } from '../../../types/types';

const SeviceHomeTemplate = ({ isModalRef, handleModalTrigger }: SeviceHomeTemplateProps) => {
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

    // Search text handling
    const [searchText, setSearchText] = useState('');
    const onChangeSearchText = (text: string) => {
        setSearchText(text);
    };

    return (
        <>
            {/* <MapWithMarker currentPosition={currentPosition} /> */}
            <View style={seviceHomeTemplateStyles.searchLayout}>
                {Platform.OS === 'android' && (
                    <DropShadow style={seviceHomeTemplateStyles.dropshadow}>
                        <View style={seviceHomeTemplateStyles.inputBox}>
                            <Image
                                source={require('../../../assets/icons/search.png')}
                                style={seviceHomeTemplateStyles.searchIcon}
                            />
                            <SingleLineInput
                                value={searchText}
                                placeholder="지금 어디로 가시나요?"
                                onChangeText={onChangeSearchText}
                                fontSize={16}
                            />
                        </View>
                    </DropShadow>
                )}
                <View>
                    <Image
                        source={require('../../../assets/icons/bell-fill.png')}
                        style={seviceHomeTemplateStyles.bellIcon}
                    />
                </View>
            </View>

            <NearbyPostListModal
                isModalRef={isModalRef}
                handleModalTrigger={handleModalTrigger}
                onPressGetUserPosition={onPressGetUserPosition}
            />
        </>
    );
};

export default SeviceHomeTemplate;
