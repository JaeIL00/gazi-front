import React from 'react';
import { View } from 'react-native';

import ChangePasswordTemplate from '../../components/templates/myProfile/ChangePasswordTemplate';
import { globalBackWhiteStyles } from '../../styles/styles';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const ChangePasswordScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToBackScreenHandler = () => {
        rootNavigation.goBack();
    };
    return (
        <View style={globalBackWhiteStyles.container}>
            <ChangePasswordTemplate moveToBackScreenHandler={moveToBackScreenHandler} />
        </View>
    );
};

export default ChangePasswordScreen;
