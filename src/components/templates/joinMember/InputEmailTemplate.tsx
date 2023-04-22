import React, { useEffect, useState } from 'react';
import { Animated, Keyboard, View } from 'react-native';
import { useRecoilState } from 'recoil';
import validator from 'validator';

import { authEmailNumber, joinMemberData } from '../../../store/atoms';
import { EmailWithPasswordProps } from '../../../types/types';
import TextButton from '../../molecules/TextButton';
import Colors from '../../../styles/Colors';
import LoginTextInput from '../../molecules/LoginTextInput';
import { inputEmailTemplateStyles, nextStepButtonPosition } from '../../../styles/styles';
import MediumText from '../../smallest/MediumText';
import Spacer from '../../smallest/Spacer';
import Icons from '../../smallest/Icons';
import { useMutation } from 'react-query';
import { memberJoinAPIs } from '../../../queries/api';
import useKeyboardMotion from '../../../utils/hooks/useKeyboardMotion';

const InputEmailTemplate = ({ onPressNextStep }: EmailWithPasswordProps) => {
    const [joinData, setJoinData] = useRecoilState(joinMemberData);
    const [authNumber, setauthNumber] = useRecoilState(authEmailNumber);

    // Email validation
    const [email, setEmail] = useState(joinData.email);
    const [isEmail, setIsEmail] = useState(false);
    const onChangeEmailText = (text: string) => {
        setEmail(text);
    };
    const emailErrorTextStyle = () => {
        validator.isEmail(email) ? setIsEmail(true) : setIsEmail(false);
    };
    useEffect(() => {
        emailErrorTextStyle();
    }, [email]);

    // Button Style Handling
    const [buttonColor, setButtonColor] = useState(Colors.BTN_GRAY);
    const buttonStyleHandler = () => {
        if (isEmail) {
            setButtonColor(Colors.BLACK);
        } else {
            setButtonColor(Colors.BTN_GRAY);
        }
    };
    useEffect(() => {
        buttonStyleHandler();
    }, [isEmail]);

    // Email authorization Handling
    const { mutate, isLoading } = useMutation(memberJoinAPIs, {
        onSuccess: data => {
            setauthNumber(data.data);
            onPressNextStep();
        },
    });
    const onPressEmailAuth = () => {
        if (isEmail) {
            setJoinData({ ...joinData, email });
            mutate({
                endpoint: 'emailConfirm',
                method: 'post',
                data: {
                    email,
                },
            });
            Keyboard.dismiss();
            onPressNextStep();
        }
    };

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
        <View style={inputEmailTemplateStyles.container}>
            <LoginTextInput
                title="Email"
                value={email}
                onChangeText={onChangeEmailText}
                placeholder="이메일(아이디) 입력"
                keyboardType="email-address"
            />
            <Spacer height={8} />
            {email && (
                <View style={inputEmailTemplateStyles.emailErrorTextBox}>
                    <Icons
                        type={isEmail ? 'octicons' : 'fontisto'}
                        name={isEmail ? 'check' : 'close'}
                        size={14}
                        color={isEmail ? Colors.STATUS_GREEN : Colors.STATUS_RED}
                    />
                    <Spacer width={4} />
                    <MediumText
                        text={isEmail ? '올바른 이메일 형식입니다.' : '이메일 형식이 올바르지 않습니다'}
                        size={12}
                        color={isEmail ? Colors.STATUS_GREEN : Colors.STATUS_RED}
                    />
                </View>
            )}
            <Animated.View style={[nextStepButtonPosition.button, { transform: [{ translateY: bottomValue }] }]}>
                <TextButton
                    onPress={onPressEmailAuth}
                    text="인증메일 전송"
                    height={48}
                    backgroundColor={buttonColor}
                    textColor={Colors.WHITE}
                    fontSize={17}
                />
            </Animated.View>
        </View>
    );
};

export default InputEmailTemplate;
