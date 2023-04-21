import React, { useEffect, useRef, useState } from 'react';
import { Animated, Keyboard, View, useWindowDimensions } from 'react-native';

import TextButton from '../molecules/TextButton';
import { authEmailStyles } from '../../styles/styles';
import { AuthEmailProps } from '../../types/types';
import TouchButton from '../smallest/TouchButton';
import Icons from '../smallest/Icons';
import Colors from '../../styles/Colors';
import BoldText from '../smallest/BoldText';
import Spacer from '../smallest/Spacer';
import { SingleLineInput } from '../smallest/SingleLineInput';
import NormalText from '../smallest/NormalText';
import { useRecoilValue } from 'recoil';
import { authEmailNumber } from '../../store/atoms';

const AuthEmail = ({ finishAuthEmailHandler }: AuthEmailProps) => {
    const authNumber = useRecoilValue(authEmailNumber);

    // Animation handling
    const { height } = useWindowDimensions();
    const topValue = useRef(new Animated.Value(height)).current;
    const startAnimationHandler = () => {
        Animated.timing(topValue, {
            toValue: 40,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };
    useEffect(() => {
        startAnimationHandler();
    }, []);

    // Back Icon handling
    const onPressBackIcon = () => {
        finishAuthEmailHandler();
    };

    // Input authorization number
    const [inputNumber, setInputNumber] = useState('');
    const onChangNumberText = (text: string) => {
        setInputNumber(text);
        checkAuthNumber(text);
    };

    // Finish button style handling
    const [activityButton, setActivityButton] = useState(false);
    const checkAuthNumber = (text: string) => {
        if (text === String(authNumber)) {
            setActivityButton(true);
        }
    };
    const onPressFinishAnimation = () => {
        if (activityButton) {
            Animated.timing(topValue, {
                toValue: height,
                duration: 300,
                useNativeDriver: true,
            }).start(({ finished }) => {
                if (finished) {
                    finishAuthEmailHandler();
                }
            });
        }
    };

    // Finish button transitionY handling
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

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', buttonUpAnimationHandler);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', buttonDownAnimationHandler);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <View style={authEmailStyles.container}>
            <Animated.View style={[authEmailStyles.animateInner, { transform: [{ translateY: topValue }] }]}>
                <View style={authEmailStyles.backButtonBox}>
                    <TouchButton alignSelf="flex-start" onPress={onPressBackIcon}>
                        <Icons type="octicons" name="arrow-left" color={Colors.TXT_BLACK} size={24} />
                    </TouchButton>
                </View>
                <BoldText text="메일로 받은 인증번호를 " size={24} color={Colors.BLACK} />
                <BoldText text="입력해주세요" size={24} color={Colors.BLACK} />

                <Spacer height={57} />

                <View style={authEmailStyles.inputBox}>
                    <SingleLineInput
                        value={inputNumber}
                        onChangeText={onChangNumberText}
                        placeholder="인증번호 4자리"
                        keyboardType="number-pad"
                    />
                    <View></View>
                </View>

                <Spacer height={36} />

                <View style={authEmailStyles.retryTextBox}>
                    <NormalText text="메일을 받지 못하셨나요?" size={13} color={Colors.TXT_GRAY} />
                    <Spacer width={8} />
                    <View style={authEmailStyles.underBar}>
                        <TouchButton onPress={() => {}}>
                            <BoldText text="재전송" size={13} color={Colors.TXT_GRAY} />
                        </TouchButton>
                    </View>
                </View>

                <Animated.View style={[authEmailStyles.finishButton, { transform: [{ translateY: bottomValue }] }]}>
                    <TextButton
                        height={48}
                        backgroundColor={activityButton ? Colors.BLACK : Colors.BTN_GRAY}
                        onPress={onPressFinishAnimation}
                        fontSize={17}
                        textColor={Colors.WHITE}
                        text="완료"
                    />
                </Animated.View>
            </Animated.View>
        </View>
    );
};

export default AuthEmail;
