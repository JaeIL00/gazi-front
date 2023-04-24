import React from 'react';
import RequestPemissionTemplate from '../components/templates/joinMember/RequestPemissionTemplate';
import { View } from 'react-native';

import { globalDefaultStyles } from '../styles/styles';
import { useRootNavigation } from '../navigations/RootStackNavigation';

const RequestPermissionScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToKeywordScreen = () => {
        rootNavigation.navigate('InitKeyword');
    };

    return (
        <View style={globalDefaultStyles.container}>
            <RequestPemissionTemplate moveToKeywordScreen={moveToKeywordScreen} />
        </View>
    );
};

export default RequestPermissionScreen;
