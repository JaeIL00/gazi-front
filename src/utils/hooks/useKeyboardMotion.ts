import React, { useRef } from 'react';
import { Animated } from 'react-native';

const useKeyboardMotion = (upNum: number, downNum: number) => {
    const bottomValue = useRef(new Animated.Value(downNum)).current;
    const buttonUpAnimationHandler = () => {
        Animated.timing(bottomValue, {
            toValue: upNum,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };
    const buttonDownAnimationHandler = () => {
        Animated.timing(bottomValue, {
            toValue: downNum,
            duration: 50,
            useNativeDriver: true,
        }).start();
    };

    return {
        bottomValue,
        buttonUpAnimationHandler,
        buttonDownAnimationHandler,
    };
};

export default useKeyboardMotion;
