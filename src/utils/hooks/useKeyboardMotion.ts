import { useRef } from 'react';
import { Animated } from 'react-native';
import { hegithPercentage } from '../changeStyleSize';

const useKeyboardMotion = (upNum: number, downNum: number) => {
    const bottomValue = useRef(new Animated.Value(hegithPercentage(downNum))).current;
    const buttonUpAnimationHandler = () => {
        Animated.timing(bottomValue, {
            toValue: hegithPercentage(upNum),
            duration: 300,
            useNativeDriver: true,
        }).start();
    };
    const buttonDownAnimationHandler = () => {
        Animated.timing(bottomValue, {
            toValue: hegithPercentage(downNum),
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
