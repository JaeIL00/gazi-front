import React from 'react';
import { Image, View } from 'react-native';

import Spacer from '../../smallest/Spacer';
import MapWithMarker from '../../organisms/MapWithMarker';
import NearbyPostListModal from '../../organisms/NearbyPostListModal';
import { seviceHomeTemplateStyles } from '../../../styles/styles';

const SeviceHomeTemplate = () => {
    return (
        <>
            <MapWithMarker />
            <View style={seviceHomeTemplateStyles.toggleButtonBox}>
                <View style={[seviceHomeTemplateStyles.toggleButton, seviceHomeTemplateStyles.locationButton]}>
                    <Image
                        source={require('../../../assets/icons/location.png')}
                        style={seviceHomeTemplateStyles.locationIcon}
                    />
                </View>
                <Spacer height={8} />
                <View style={[seviceHomeTemplateStyles.toggleButton, seviceHomeTemplateStyles.writeButton]}>
                    <Image
                        source={require('../../../assets/icons/write.png')}
                        style={seviceHomeTemplateStyles.writeIcon}
                    />
                </View>
            </View>
            <NearbyPostListModal />
        </>
    );
};

export default SeviceHomeTemplate;
