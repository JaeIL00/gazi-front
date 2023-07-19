import React, { useCallback, useRef, useState } from 'react';
import { BackHandler, Platform, StatusBar, ToastAndroid, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import MapHomeTemplate from '../../templates/home/MapHomeTemplate';
import { useRootNavigation } from '../../../navigations/RootStackNavigation';
import ScreenWrapper from '../../organisms/ScreenWrapper';

const MapHomeScreen = () => {
    const rootNavigation = useRootNavigation();

    const isAppExit = useRef<boolean>(false);
    const isModalRef = useRef<boolean>(false);
    const [handleModalTrigger, setHandleModalTrigger] = useState<boolean>(false);

    const moveToWritingScreen = () => {
        rootNavigation.push('WritePost');
    };

    // Android back button & Header Back Button Handling
    const handleBackButton = (): boolean => {
        if (isModalRef.current) {
            // Bottom sheet doesn't initialized position. So move to init position
            setHandleModalTrigger(true);
            setTimeout(() => {
                setHandleModalTrigger(false);
            }, 2000);
        } else {
            // Android back button touch twice
            if (Platform.OS === 'android' && !isAppExit.current) {
                ToastAndroid.show('한번 더 눌러서 앱 종료', ToastAndroid.SHORT);
                isAppExit.current = true;
                setTimeout(() => {
                    isAppExit.current = false;
                }, 1000);
            } else {
                isAppExit.current = false;
                BackHandler.exitApp();
            }
        }
        return true;
    };

    useFocusEffect(
        useCallback(() => {
            // if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
            // }
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
            };
        }, []),
    );

    return (
        <ScreenWrapper isPaddingHorizontal={false}>
            {/* <StatusBar backgroundColor={colors.BACKGROUND_DEFAULT} barStyle="dark-content" /> */}
            <MapHomeTemplate
                isModalRef={isModalRef}
                handleModalTrigger={handleModalTrigger}
                moveToWritingScreen={moveToWritingScreen}
            />
        </ScreenWrapper>
    );
};

export default MapHomeScreen;
