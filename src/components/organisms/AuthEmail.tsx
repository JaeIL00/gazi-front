import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Keyboard, View, useWindowDimensions } from 'react-native';
import { useMutation } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { debounce } from 'lodash';

import Icons from '../smallest/Icons';
import Spacer from '../smallest/Spacer';
import Colors from '../../styles/Colors';
import BoldText from '../smallest/BoldText';
import NormalText from '../smallest/NormalText';
import MediumText from '../smallest/MediumText';
import TextButton from '../molecules/TextButton';
import TouchButton from '../smallest/TouchButton';
import useKeyboardMotion from '../../utils/hooks/useKeyboardMotion';
import { emailAuthAPI } from '../../queries/api';
import { AuthEmailProps } from '../../types/types';
import { authEmailStyles } from '../../styles/styles';
import { SingleLineInput } from '../smallest/SingleLineInput';
import { emailAuthAtom, joinMemberAtom } from '../../store/atoms';

const AuthEmail = ({ min, sec, resetTimeHandler, authNumberModalHanlder }: AuthEmailProps) => {
    const { height } = useWindowDimensions();

    const [authData, setAuthData] = useRecoilState(emailAuthAtom);
    const joinData = useRecoilValue(joinMemberAtom);

    const topValue = useRef<Animated.Value>(new Animated.Value(height)).current;

    const [isWrong, setIsWrong] = useState<boolean>(false);
    const [inputNumber, setInputNumber] = useState<string>('');
    const [authNumber, setAuthNumber] = useState<number | null>(null);
    const [activityButton, setActivityButton] = useState<boolean>(false);

    // Retry sending auth number
    const { mutate, isLoading } = useMutation(emailAuthAPI, {
        onSuccess: data => {
            setInputNumber('');
            setIsWrong(false);
            setAuthNumber(data.data.data);
            resetTimeHandler();
        },
    });
    const onPressEmailAuth = debounce(() => {
        mutate(joinData.email);
    }, 300);

    // Animation handling
    const startAnimationHandler = () => {
        Animated.timing(topValue, {
            toValue: 70,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    // Finish button style handling
    const onPressFinishAnimation = () => {
        if (activityButton) {
            Animated.timing(topValue, {
                toValue: height,
                duration: 300,
                useNativeDriver: true,
            }).start(({ finished }: { finished: boolean }) => {
                if (finished) {
                    setAuthData({ number: 0, isOk: true });
                    authNumberModalHanlder('CORRECT');
                }
            });
        }
    };

    // Back Icon handling
    const onPressBackIcon = () => {
        authNumberModalHanlder('CLOSE');
    };

    // Input authorization number
    const onChangNumberText = (text: string) => {
        setInputNumber(text);
        setIsWrong(false);
        // Auth number validation
        if (text.length === 4) {
            validationHandler(text);
        } else {
            setActivityButton(false);
        }
    };
    const validationHandler = (text: string) => {
        if (text === String(authNumber)) {
            setActivityButton(true);
        } else {
            setIsWrong(true);
            setActivityButton(false);
        }
    };

    // Finish button transitionY handling
    const { bottomValue, buttonUpAnimationHandler, buttonDownAnimationHandler } = useKeyboardMotion(53, 271);
    useEffect(() => {
        startAnimationHandler();
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', buttonUpAnimationHandler);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', buttonDownAnimationHandler);
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    // Initialized auth number
    useEffect(() => {
        setAuthNumber(authData.number);
    }, []);

    return (
        <Animated.View style={[authEmailStyles.animateInner, { transform: [{ translateY: topValue }] }]}>
            <View style={authEmailStyles.backButtonBox}>
                <TouchButton alignSelf="flex-start" onPress={onPressBackIcon}>
                    <Icons type="octicons" name="arrow-left" color={Colors.TXT_BLACK} size={24} />
                </TouchButton>
            </View>
            <BoldText text="메일로 받은 인증번호를 " size={24} color={Colors.BLACK} />
            <BoldText text="입력해주세요" size={24} color={Colors.BLACK} />

            <Spacer height={57} />
            <View>
                <View style={authEmailStyles.inputBox}>
                    <View style={authEmailStyles.inputRange}>
                        <SingleLineInput
                            value={inputNumber}
                            onChangeText={onChangNumberText}
                            placeholder="인증번호 4자리"
                            keyboardType="number-pad"
                            maxLength={4}
                        />
                    </View>
                    <View style={authEmailStyles.timerBox}>
                        <NormalText
                            text={`${min}:${String(sec).length === 1 ? '0' : ''}${sec}`}
                            size={13}
                            color={Colors.BLACK}
                        />
                    </View>
                </View>

                {isWrong && (
                    <View style={authEmailStyles.emailErrorTextBox}>
                        <Icons type={'fontisto'} name={'close'} size={14} color={Colors.STATUS_RED} />
                        <Spacer width={4} />
                        <MediumText text="인증번호가 일치하지 않습니다" size={12} color={Colors.STATUS_RED} />
                    </View>
                )}
            </View>

            <Spacer height={55} />

            <View style={authEmailStyles.retryTextBox}>
                <NormalText text="메일을 받지 못하셨나요?" size={13} color={Colors.TXT_GRAY} />
                <Spacer width={8} />
                <TouchButton onPress={onPressEmailAuth}>
                    <View style={authEmailStyles.underBar}>
                        <BoldText text="재전송" size={13} color={Colors.TXT_GRAY} />
                    </View>
                </TouchButton>
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

            {isLoading && <ActivityIndicator size="large" />}
        </Animated.View>
    );
};

export default AuthEmail;
