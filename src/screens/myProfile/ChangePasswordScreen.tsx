import React from 'react';
import { View } from 'react-native';

import ChangePasswordTemplate from '../../components/templates/myProfile/ChangePasswordTemplate';
import { globalBackWhiteStyles } from '../../styles/styles';

const ChangePasswordScreen = () => {
    return (
        <View style={globalBackWhiteStyles.container}>
            <ChangePasswordTemplate />
        </View>
    );
};

export default ChangePasswordScreen;
