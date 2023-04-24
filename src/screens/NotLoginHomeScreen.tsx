import React from 'react';
import { View } from 'react-native';

import NotLoginTemplate from '../components/templates/home/NotLoginTemplate';
import { globalDefaultStyles } from '../styles/styles';

const NotLoginHomeScreen = () => {
    return (
        <View style={globalDefaultStyles.container}>
            <NotLoginTemplate />
        </View>
    );
};

export default NotLoginHomeScreen;
