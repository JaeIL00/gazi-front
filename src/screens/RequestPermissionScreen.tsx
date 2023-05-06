import React, { useEffect } from 'react';
import { BackHandler, Platform, View } from 'react-native';

import RequestPemissionTemplate from '../components/templates/joinMember/RequestPemissionTemplate';
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
                rootNavigation.navigate('BottomTab');
                break;
            default:
                // For Debug
                console.log('(ERROR) Move to screen handling. state: ', state);
        }
    };

    // Android back button & Header Back Button Handling
    const handleBackButton = (): boolean => {
        rootNavigation.navigate('BottomTab');
        return true;
    };
    useEffect(() => {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
            return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        }
    }, []);

    return (
        <View style={globalDefaultStyles.container}>
            <RequestPemissionTemplate moveToScreen={moveToScreen} />
        </View>
    );
};

export default RequestPermissionScreen;
