import React, { useCallback, useRef, useState } from 'react';
import { BackHandler, Platform, ToastAndroid, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import SeviceHomeTemplate from '../components/templates/home/SeviceHomeTemplate';
import { seviceHomeScreenStyles } from '../styles/styles';
import { useRootNavigation } from '../navigations/RootStackNavigation';

const SeviceHomeScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToWritePost = () => {
        rootNavigation.navigate('WritePostOrComment');
    };

    // Android back button & Header Back Button Handling
    const [isAppExit, setIsAppExit] = useState(false);
    const [handleModalTrigger, setHandleModalTrigger] = useState(false);
    const isModalRef = useRef(false);
    const handleBackButton = (): boolean => {
        if (isModalRef.current) {
            // Bottom sheet doesn't initialized position. So move to init position
            setHandleModalTrigger(true);
            setTimeout(() => {
                setHandleModalTrigger(false);
            }, 2000);
        } else {
            // Android back button touch twice
            if (Platform.OS === 'android' && !isAppExit) {
                ToastAndroid.show('한번 더 눌러주세요', 1000);
                setIsAppExit(true);
                setTimeout(() => {
                    setIsAppExit(false);
                }, 1000);
            } else {
                setIsAppExit(false);
                BackHandler.exitApp();
            }
        }
        return true;
    };
    useFocusEffect(
        useCallback(() => {
            if (Platform.OS === 'android') {
                BackHandler.addEventListener('hardwareBackPress', handleBackButton);
            }
            return () => {
                if (Platform.OS === 'android') {
                    BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
                }
            };
        }, [isAppExit]),
    );
    return (
        <View style={seviceHomeScreenStyles.container}>
            <SeviceHomeTemplate
                isModalRef={isModalRef}
                handleModalTrigger={handleModalTrigger}
                moveToWritePost={moveToWritePost}
            />
        </View>
    );
};

export default SeviceHomeScreen;
