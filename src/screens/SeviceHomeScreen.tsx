import React from 'react';
import { View } from 'react-native';
import { seviceHomeScreenStyles } from '../styles/styles';
import SeviceHomeTemplate from '../components/templates/home/SeviceHomeTemplate';

const SeviceHomeScreen = () => {
    return (
        <View style={seviceHomeScreenStyles.container}>
            <SeviceHomeTemplate />
        </View>
    );
};

export default SeviceHomeScreen;
