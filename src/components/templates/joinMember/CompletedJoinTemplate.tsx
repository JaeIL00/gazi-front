import React, { useEffect } from 'react';
import { Animated, Keyboard, View } from 'react-native';
import { CompletedJoinTemplateProps } from '../../../types/types';
import useKeyboardMotion from '../../../utils/hooks/useKeyboardMotion';
import TextButton from '../../molecules/TextButton';
import Colors from '../../../styles/Colors';
import { nextStepButtonPosition } from '../../../styles/styles';

const CompletedJoinTemplate = ({ onPressNextStep }: CompletedJoinTemplateProps) => {
    // Finish button transitionY handling
    const { bottomValue, buttonUpAnimationHandler, buttonDownAnimationHandler } = useKeyboardMotion(200, 430);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', buttonUpAnimationHandler);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', buttonDownAnimationHandler);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    return (
        <View>
            <View style={{ height: 300, backgroundColor: '#333' }}></View>
            <Animated.View style={[nextStepButtonPosition.button, { transform: [{ translateY: bottomValue }] }]}>
                <TextButton
                    onPress={onPressNextStep}
                    text="확인"
                    height={48}
                    backgroundColor={Colors.BLACK}
                    textColor={Colors.WHITE}
                    fontSize={17}
                />
            </Animated.View>
        </View>
    );
};
export default CompletedJoinTemplate;
