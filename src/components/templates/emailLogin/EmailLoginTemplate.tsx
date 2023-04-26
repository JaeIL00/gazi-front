import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, Keyboard, ToastAndroid, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from 'react-query';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import BoldText from '../../smallest/BoldText';
import MediumText from '../../smallest/MediumText';
import TextButton from '../../molecules/TextButton';
import TouchButton from '../../smallest/TouchButton';
import LoginTextInput from '../../molecules/LoginTextInput';
import useKeyboardMotion from '../../../utils/hooks/useKeyboardMotion';
import MoveBackWithPageTitle from '../../organisms/MoveBackWithPageTitle';
import { loginAPI } from '../../../queries/api';
import { EmailLoginTemplateProps } from '../../../types/types';
import { emailLoginTemplateStyles, nextStepButtonPosition } from '../../../styles/styles';

const EmailLoginTemplate = ({ moveServiceHomeHandler }: EmailLoginTemplateProps) => {
    // Text change Handling
    const [email, setEmail] = useState<string>('');
    const onChangeEmail = (text: string) => {
        setEmail(text);
        setLoginErrorText('');
    };
    const [password, setPassword] = useState('');
    const onChangePassword = (text: string) => {
        setPassword(text);
        setLoginErrorText('');
    };

    // Login API Handling
    const [loginErrorText, setLoginErrorText] = useState<string>('');
    const { mutate, isLoading } = useMutation(loginAPI, {
        onSuccess: data => {
            console.log(data.data);
            successJoinMemberHandler(data.data.data);
        },
        onError: ({ response }) => {
            // For Debug
            console.log('(ERROR) Login API Handling. response: ', response);
            setLoginErrorText(response.data.message);
        },
    });
    const onPressLoginButton = () => {
        mutate({ email, password });
    };
    const successJoinMemberHandler = async (data: { accessToken: string; refreshToken: string }) => {
        try {
            await AsyncStorage.setItem('GAZI_ac_tk', data.accessToken);
            await AsyncStorage.setItem('GAZI_re_tk', data.refreshToken);
        } catch (err) {
            // For Debug
            console.log('(ERROR) User authorization token set storage. err: ', err);
            ToastAndroid.show('토큰 저장 실패', 4000);
        } finally {
            moveServiceHomeHandler('GO');
        }
    };

    // Change button Position by keyboard activity
    const { bottomValue, buttonUpAnimationHandler, buttonDownAnimationHandler } = useKeyboardMotion(410, 595);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', buttonUpAnimationHandler);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', buttonDownAnimationHandler);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <View style={emailLoginTemplateStyles.container}>
            <MoveBackWithPageTitle
                oneTitle="이메일로 로그인"
                twoTitle=""
                onPress={() => moveServiceHomeHandler('GO')}
            />

            <Spacer height={75} />
            <View>
                <LoginTextInput
                    title="Email"
                    value={email}
                    placeholder="이메일(아이디)입력"
                    onChangeText={onChangeEmail}
                    keyboardType="email-address"
                />
                <Spacer height={20} />
                <LoginTextInput
                    title="password"
                    value={password}
                    placeholder="비밀번호 입력"
                    onChangeText={onChangePassword}
                    secureTextEntry={true}
                />
                {loginErrorText && (
                    <View style={emailLoginTemplateStyles.emailErrorTextBox}>
                        <Icons type={'fontisto'} name={'close'} size={14} color={Colors.STATUS_RED} />
                        <Spacer width={4} />
                        <MediumText text={loginErrorText} size={12} color={Colors.STATUS_RED} />
                    </View>
                )}
            </View>

            <Animated.View style={[nextStepButtonPosition.button, { transform: [{ translateY: bottomValue }] }]}>
                <TextButton
                    onPress={onPressLoginButton}
                    text="로그인"
                    height={48}
                    backgroundColor={email && password ? Colors.BLACK : Colors.BTN_GRAY}
                    textColor={Colors.WHITE}
                    fontSize={17}
                />
                <Spacer height={24} />
                <TouchButton onPress={() => ToastAndroid.show('개발 우선순위가 많이 밀렸어요ㅜ', 4000)}>
                    <View style={emailLoginTemplateStyles.underBar}>
                        <BoldText text="비밀번호 찾기" size={13} color={Colors.TXT_GRAY} />
                    </View>
                </TouchButton>
            </Animated.View>
            {isLoading && <ActivityIndicator size="large" />}
        </View>
    );
};

export default EmailLoginTemplate;
