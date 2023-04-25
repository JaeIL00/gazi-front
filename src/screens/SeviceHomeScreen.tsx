import React from 'react';
import { View } from 'react-native';
import { globalDefaultStyles } from '../styles/styles';
import SeviceHomeTemplate from '../components/templates/home/SeviceHomeTemplate';

const SeviceHomeScreen = () => {
    return (
        <View style={globalDefaultStyles.container}>
            <SeviceHomeTemplate />
        </View>
    );
};

export default SeviceHomeScreen;
