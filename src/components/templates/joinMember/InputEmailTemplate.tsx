import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, Keyboard, View } from 'react-native';
import { useRecoilState } from 'recoil';
import validator from 'validator';
import { useMutation } from 'react-query';
import { debounce } from 'lodash';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import TextButton from '../../molecules/TextButton';
import LoginTextInput from '../../molecules/LoginTextInput';
import useKeyboardMotion from '../../../utils/hooks/useKeyboardMotion';
import { emailAuthAPI } from '../../../queries/api';
import { InputEmailTemplateProps } from '../../../types/types';
import { emailAuthAtom, joinMemberAtom } from '../../../store/atoms';
import { inputEmailTemplateStyles, nextStepButtonPosition } from '../../../styles/styles';

const InputEmailTemplate = ({ onPressNextStep, resetTimeHandler, didAuthEmail }: InputEmailTemplateProps) => {
    // Email validation
    const [joinData, setJoinData] = useRecoilState(joinMemberAtom);
    const [email, setEmail] = useState<string>(joinData.email);
    const [isEmail, setIsEmail] = useState<boolean>(false);
    const onChangeEmailText = (text: string) => {
        setEmail(text);
        validator.isEmail(text) ? setIsEmail(true) : setIsEmail(false);

        setDuplicatedError('');
    };

    // If email state in atom, set state
    const initStateHandler = () => {
        if (joinData.email) {
            setIsEmail(true);
        }
    };

    // Request email authorization number API
    const [authData, setAuthData] = useRecoilState(emailAuthAtom);
    const [duplicatedError, setDuplicatedError] = useState<string>('');
    const { isLoading, mutate } = useMutation(emailAuthAPI, {
        onSuccess: data => {
            setAuthData({ ...authData, number: data.data.data });
            resetTimeHandler();
            onPressNextStep();
        },
        onError: ({ response }) => {
            if (response.data.state === 409) {
                setDuplicatedError(response.data.message);
            }
            // For Debug
            console.log('(ERROR) Request email authorization number API. response: ', response);
        },
    });

    // Request email authorization number API handling by button
    const onPressEmailAuth = debounce(() => {
        if (!duplicatedError && isEmail && email !== joinData.email) {
            setJoinData({ ...joinData, email });
            mutate(email);
        } else if (!duplicatedError && email === joinData.email) {
            authData.isOk ? didAuthEmail() : onPressNextStep();
        } else {
            // For Debug
            console.log(
                `(ERROR) Request email authorization number API handling. isEmail: ${isEmail}, email: ${email}, atomEmail: ${joinData.email}, duplicatedError: ${duplicatedError}`,
            );
        }
    }, 300);

    //

    // Change button Position by keyboard activity
    const { bottomValue, buttonUpAnimationHandler, buttonDownAnimationHandler } = useKeyboardMotion(210, 430);
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

            {email && !duplicatedError && (
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
            {duplicatedError && (
                <View style={inputEmailTemplateStyles.emailErrorTextBox}>
                    <Icons type={'fontisto'} name={'close'} size={14} color={Colors.STATUS_RED} />
                    <Spacer width={4} />
                    <MediumText text={duplicatedError} size={12} color={Colors.STATUS_RED} />
                </View>
            )}

            <Animated.View style={[nextStepButtonPosition.button, { transform: [{ translateY: bottomValue }] }]}>
                <TextButton
                    onPress={onPressEmailAuth}
                    text={authData.isOk ? '완료' : '인증메일 전송'}
                    height={48}
                    backgroundColor={isEmail && !duplicatedError ? Colors.BLACK : Colors.BTN_GRAY}
                    textColor={Colors.WHITE}
                    fontSize={17}
                />
            </Animated.View>

            {isLoading && <ActivityIndicator size="large" />}
        </View>
    );
};

export default InputEmailTemplate;
