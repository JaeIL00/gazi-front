import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Platform, StatusBar, ToastAndroid, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import Colors from '../styles/Colors';
import SeviceHomeTemplate from '../components/templates/home/SeviceHomeTemplate';
import { seviceHomeScreenStyles } from '../styles/styles';
import { useRootNavigation } from '../navigations/RootStackNavigation';

const SeviceHomeScreen = () => {
    const isFocus = useIsFocused();
    const rootNavigation = useRootNavigation();

    const isModalRef = useRef<boolean>(false);
    const isAppExit = useRef<boolean>(false);

    // const [isAppExit, setIsAppExit] = useState<boolean>(false);
    const [handleModalTrigger, setHandleModalTrigger] = useState<boolean>(false);
    const moveToWritePost = () => {
        rootNavigation.navigate('WritePostOrComment');
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
                ToastAndroid.show('한번 더 눌러 종료', 1000);
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

    useEffect(() => {
        if (Platform.OS === 'android' && isFocus) {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    }, [isFocus]);

    return (
        <View style={seviceHomeScreenStyles.container}>
            <StatusBar backgroundColor={Colors.BACKGROUND_DEFAULT} barStyle="dark-content" />
            <SeviceHomeTemplate
                isModalRef={isModalRef}
                handleModalTrigger={handleModalTrigger}
                moveToWritePost={moveToWritePost}
            />
        </View>
    );
};

export default SeviceHomeScreen;
