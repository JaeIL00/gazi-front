import React from 'react';
import { View } from 'react-native';

import MyProfileTemplate from '../../components/templates/myProfile/MyProfileTemplate';
import { myProfileScreenStyles } from '../../styles/styles';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const MyProfileScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToScreen = (state: string) => {
        switch (state) {
            case 'EDIT_NICK':
                rootNavigation.navigate('EditNickname');
                break;
        }
    };
    return (
        <View style={myProfileScreenStyles.container}>
            <MyProfileTemplate moveToScreen={moveToScreen} />
        </View>
    );
};

export default MyProfileScreen;
