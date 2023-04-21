import React, { useRef } from 'react';
import { Animated } from 'react-native';

const useKeyboardMotion = () => {
    const bottomValue = useRef(new Animated.Value(330)).current;
    const buttonUpAnimationHandler = () => {
        Animated.timing(bottomValue, {
            toValue: 80,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };
    const buttonDownAnimationHandler = () => {
        Animated.timing(bottomValue, {
            toValue: 330,
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
