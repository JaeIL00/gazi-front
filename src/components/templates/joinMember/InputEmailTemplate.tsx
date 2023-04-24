import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, Keyboard, View } from 'react-native';
import { useRecoilState } from 'recoil';
import validator from 'validator';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import TextButton from '../../molecules/TextButton';
import LoginTextInput from '../../molecules/LoginTextInput';
import useKeyboardMotion from '../../../utils/hooks/useKeyboardMotion';
import { useMutation } from 'react-query';
import { memberJoinAPIs } from '../../../queries/api';
import { InputEmailTemplateProps } from '../../../types/types';
import { emailAuthNumber, joinMemberData } from '../../../store/atoms';
import { inputEmailTemplateStyles, nextStepButtonPosition } from '../../../styles/styles';

const InputEmailTemplate = ({ onPressNextStep, resetTimeHandler }: InputEmailTemplateProps) => {
    const [joinData, setJoinData] = useRecoilState(joinMemberData);
    const [authData, setAuthData] = useRecoilState(emailAuthNumber);

    // Email validation
    const [email, setEmail] = useState(joinData.email);
    const [isEmail, setIsEmail] = useState(false);
    const onChangeEmailText = (text: string) => {
        setEmail(text);
        validator.isEmail(text) ? setIsEmail(true) : setIsEmail(false);

        setIsDuplicated(false);
    };

    // Initialized state Handling
    const initStateHandler = () => {
        if (joinData.email) {
            setIsEmail(true);
        }
    };

    // Email authorization Handling
    const [isDuplicated, setIsDuplicated] = useState(false);
    const { isLoading, mutate } = useMutation(memberJoinAPIs, {
        onSuccess: data => {
            setAuthData(data.data.data);
            resetTimeHandler();
            onPressNextStep();
        },
        onError: ({ response }) => {
            if (response.status === 409) {
                setIsEmail(false);
                setIsDuplicated(true);
            }
        },
    });

    // Request auth number button handling
    const onPressEmailAuth = () => {
        if ((isEmail && email !== joinData.email) || (isEmail && joinData.password)) {
            setJoinData({ ...joinData, email });
            mutate({
                endpoint: 'email-confirm',
                method: 'post',
                data: {
                    email,
                },
            });
        } else if (isEmail && email === joinData.email) {
            onPressNextStep();
        }
    };

    // Finish button transitionY handling
    const { bottomValue, buttonUpAnimationHandler, buttonDownAnimationHandler } = useKeyboardMotion(200, 430);
    useEffect(() => {
        initStateHandler();
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', buttonUpAnimationHandler);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', buttonDownAnimationHandler);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <View style={inputEmailTemplateStyles.container}>
            <LoginTextInput
                title="Email"
                value={email}
                onChangeText={onChangeEmailText}
                placeholder="이메일(아이디) 입력"
                keyboardType="email-address"
            />

            <Spacer height={8} />

            {email && !isDuplicated && (
                <View style={inputEmailTemplateStyles.emailErrorTextBox}>
                    <Icons
                        type={isEmail ? 'octicons' : 'fontisto'}
                        name={isEmail ? 'check' : 'close'}
                        size={14}
                        color={isEmail ? Colors.STATUS_GREEN : Colors.STATUS_RED}
                    />
                    <Spacer width={4} />
                    <MediumText
                        text={isEmail ? '올바른 이메일 형식입니다' : '이메일 형식이 올바르지 않습니다'}
                        size={12}
                        color={isEmail ? Colors.STATUS_GREEN : Colors.STATUS_RED}
                    />
                </View>
            )}
            {isDuplicated && (
                <View style={inputEmailTemplateStyles.emailErrorTextBox}>
                    <Icons type={'fontisto'} name={'close'} size={14} color={Colors.STATUS_RED} />
                    <Spacer width={4} />
                    <MediumText text="중복된 이메일입니다" size={12} color={Colors.STATUS_RED} />
                </View>
            )}

            <Animated.View style={[nextStepButtonPosition.button, { transform: [{ translateY: bottomValue }] }]}>
                <TextButton
                    onPress={onPressEmailAuth}
                    text="인증메일 전송"
                    height={48}
                    backgroundColor={isEmail ? Colors.BLACK : Colors.BTN_GRAY}
                    textColor={Colors.WHITE}
                    fontSize={17}
                />
            </Animated.View>

            {isLoading && <ActivityIndicator size="large" />}
        </View>
    );
};

export default InputEmailTemplate;
