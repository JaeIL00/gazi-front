import React from 'react';
import { View } from 'react-native';

import MyProfileTemplate from '../../components/templates/myProfile/MyProfileTemplate';
import { globalBackWhiteStyles } from '../../styles/styles';
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
        <View style={globalBackWhiteStyles.container}>
            <MyProfileTemplate moveToScreen={moveToScreen} />
        </View>
    );
};

export default MyProfileScreen;
