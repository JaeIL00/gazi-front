import { useRef } from 'react';
import { Animated } from 'react-native';
import { heightScreen } from '../changeStyleSize';

const useKeyboardMotion = (upNum: number, downNum: number) => {
    const bottomValue = useRef(new Animated.Value(downNum * heightScreen)).current;
    const buttonUpAnimationHandler = () => {
        Animated.timing(bottomValue, {
            toValue: upNum * heightScreen,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };
    const buttonDownAnimationHandler = () => {
        Animated.timing(bottomValue, {
            toValue: downNum * heightScreen,
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
