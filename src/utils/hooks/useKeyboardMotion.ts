import { useRef } from 'react';
import { Animated } from 'react-native';
import { heightPercentage } from '../changeStyleSize';

const useKeyboardMotion = (upNum: number, downNum: number) => {
    const bottomValue = useRef(new Animated.Value(heightPercentage(downNum))).current;
    const buttonUpAnimationHandler = () => {
        Animated.timing(bottomValue, {
            toValue: heightPercentage(upNum),
            duration: 300,
            useNativeDriver: true,
        }).start();
    };
    const buttonDownAnimationHandler = () => {
        Animated.timing(bottomValue, {
            toValue: heightPercentage(downNum),
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
