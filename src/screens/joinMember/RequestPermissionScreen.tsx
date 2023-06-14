import React, { useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import RequestPemissionTemplate from '../../components/templates/joinMember/RequestPemissionTemplate';
import { useRootNavigation } from '../../navigations/RootStackNavigation';
import { useJoinNavigation } from '../../navigations/JoinMemberNavigation';

const RequestPermissionScreen = () => {
    const rootNavigation = useRootNavigation();
    const joinNavigation = useJoinNavigation();

    // Move to screen handling
    const moveToScreen = (state: string) => {
        switch (state) {
            case 'OK':
                joinNavigation.navigate('JoinSettingKeyword');
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
        <ScreenWrapper isPaddingHorizontal={true}>
            <RequestPemissionTemplate moveToScreen={moveToScreen} />
        </ScreenWrapper>
    );
};

export default RequestPermissionScreen;
