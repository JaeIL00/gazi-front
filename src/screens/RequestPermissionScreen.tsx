import React from 'react';
import RequestPemissionTemplate from '../components/templates/joinMember/RequestPemissionTemplate';
import { View } from 'react-native';

import { globalDefaultStyles } from '../styles/styles';
import { useRootNavigation } from '../navigations/RootStackNavigation';

const RequestPermissionScreen = () => {
    const rootNavigation = useRootNavigation();

    // Move to screen handling
    const moveToScreen = (state: string) => {
        switch (state) {
            case 'OK':
                rootNavigation.navigate('InitKeyword');
                break;
            case 'BACK':
                rootNavigation.goBack();
                break;
            default:
                // For Debug
                console.log('(ERROR) Move to screen handling. state: ', state);
        }
    };

    return (
        <View style={globalDefaultStyles.container}>
            <RequestPemissionTemplate moveToScreen={moveToScreen} />
        </View>
    );
};

export default RequestPermissionScreen;
