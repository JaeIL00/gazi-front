import React, { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

const useBackgroundInterval = (callback: () => void, delay: number | null) => {
    const intervalRef = useRef(0);
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (Platform.OS === 'android') {
            if (typeof delay === 'number') {
                intervalRef.current = BackgroundTimer.setInterval(() => callbackRef.current(), delay);
            }
            return () => BackgroundTimer.clearInterval(intervalRef.current);
        }
    }, [delay]);

    return intervalRef;
};

export default useBackgroundInterval;
