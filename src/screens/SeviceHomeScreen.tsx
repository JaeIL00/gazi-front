import React, { useCallback, useRef, useState } from 'react';
import { BackHandler, Platform, ToastAndroid, View } from 'react-native';
import { seviceHomeScreenStyles } from '../styles/styles';
import SeviceHomeTemplate from '../components/templates/home/SeviceHomeTemplate';
import { useFocusEffect } from '@react-navigation/native';

const SeviceHomeScreen = () => {
    // Android back button & Header Back Button Handling
    const [isAppExit, setIsAppExit] = useState(false);
    const [handleModalTrigger, setHandleModalTrigger] = useState(false);
    const isModalRef = useRef(false);
    const handleBackButton = (): boolean => {
        if (isModalRef.current) {
            setHandleModalTrigger(true);
            setTimeout(() => {
                setHandleModalTrigger(false);
            }, 2000);
        } else {
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
            <SeviceHomeTemplate isModalRef={isModalRef} handleModalTrigger={handleModalTrigger} />
        </View>
    );
};

export default SeviceHomeScreen;
