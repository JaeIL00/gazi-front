import React from 'react';
import { View } from 'react-native';

import MyProfileTemplate from '../../components/templates/myProfile/MyProfileTemplate';
import { myProfileScreenStyles } from '../../styles/styles';

const MyProfileScreen = () => {
    return (
        <View style={myProfileScreenStyles.container}>
            <MyProfileTemplate />
        </View>
    );
};

export default MyProfileScreen;
