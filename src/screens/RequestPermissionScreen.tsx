import React from 'react';
import RequestPemissionTemplate from '../components/templates/joinMember/RequestPemissionTemplate';
import { View } from 'react-native';
import { globalDefaultStyles } from '../styles/styles';

const RequestPermissionScreen = () => {
    return (
        <View style={globalDefaultStyles.background}>
            <RequestPemissionTemplate />
        </View>
    );
};

export default RequestPermissionScreen;
