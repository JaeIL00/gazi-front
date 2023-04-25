import React, { useEffect, useState } from 'react';
import { Animated, Keyboard, View } from 'react-native';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import BoldText from '../../smallest/BoldText';
import TextButton from '../../molecules/TextButton';
import TouchButton from '../../smallest/TouchButton';
import LoginTextInput from '../../molecules/LoginTextInput';
import useKeyboardMotion from '../../../utils/hooks/useKeyboardMotion';
import MoveBackWithPageTitle from '../../organisms/MoveBackWithPageTitle';
import { emailLoginTemplateStyles, nextStepButtonPosition } from '../../../styles/styles';

const EmailLoginTemplate = () => {
    const [email, setEmail] = useState('');
    const onChangeEmail = (text: string) => {
        setEmail(text);
    };
    const [password, setPassword] = useState('');
    const onChangePassword = (text: string) => {
        setPassword(text);
    };

    // Finish button transitionY handling
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
            <MoveBackWithPageTitle oneTitle="이메일로 로그인" twoTitle="" onPress={() => {}} />

            <Spacer height={75} />

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

            <Animated.View style={[nextStepButtonPosition.button, { transform: [{ translateY: bottomValue }] }]}>
                <TextButton
                    onPress={() => {}}
                    text="로그인"
                    height={48}
                    backgroundColor={email && password ? Colors.BLACK : Colors.BTN_GRAY}
                    textColor={Colors.WHITE}
                    fontSize={17}
                />
                <Spacer height={24} />
                <TouchButton onPress={() => {}}>
                    <View style={emailLoginTemplateStyles.underBar}>
                        <BoldText text="비밀번호 찾기" size={13} color={Colors.TXT_GRAY} />
                    </View>
                </TouchButton>
            </Animated.View>
        </View>
    );
};

export default EmailLoginTemplate;
