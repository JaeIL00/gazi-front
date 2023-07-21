import React, { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import ScreenWrapper from '../../organisms/common/ScreenWrapper';
import RequestPemissionTemplate from '../../templates/joinMember/RequestPemissionTemplate';
import { useRootNavigation } from '../../../navigations/RootStackNavigation';
import { useJoinNavigation } from '../../../navigations/JoinMemberNavigation';

const RequestPermissionScreen = () => {
    const rootNavigation = useRootNavigation();
    const joinNavigation = useJoinNavigation();

    // Move to screen handling
    const navigationHandler = (state: string) => {
        switch (state) {
            case 'OK':
                joinNavigation.navigate('JoinSettingKeyword');
                break;
            case 'BACK':
                rootNavigation.navigate('ServiceMainTab');
                break;
            default:
                // For Debug
                console.log('(ERROR) Move to screen handling. state: ', state);
        }
    };

    // Android back button & Header Back Button Handling
    const handleBackButton = (): boolean => {
        navigationHandler('BACK');
        return true;
    };
    useFocusEffect(
        useCallback(() => {
            // if (Platform.OS === 'android') {
            const backhandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
            // }
            return () => backhandler.remove();
        }, []),
    );

    return (
        <ScreenWrapper isPaddingHorizontal={true}>
            <RequestPemissionTemplate navigationHandler={navigationHandler} />
        </ScreenWrapper>
    );
};

export default RequestPermissionScreen;
