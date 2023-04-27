import React, { useEffect, useState } from 'react';
import { Animated, Keyboard, View } from 'react-native';
import { useRecoilState } from 'recoil';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import TextButton from '../../molecules/TextButton';
import MediumText from '../../smallest/MediumText';
import LoginTextInput from '../../molecules/LoginTextInput';
import IconWithMediumText from '../../molecules/IconWithMediumText';
import useKeyboardMotion from '../../../utils/hooks/useKeyboardMotion';
import { joinMemberData } from '../../../store/atoms';
import { EmailWithPasswordProps } from '../../../types/types';
import { emailWithPasswordTemplateStyles, nextStepButtonPosition } from '../../../styles/styles';

const EmailWithPasswordTemplate = ({ onPressNextStep }: EmailWithPasswordProps) => {
    // Password validation handling
    const [password, setpassword] = useState<string>('');
    const [isPasswordLeng, setIsPasswordLeng] = useState<boolean>(false);
    const [isPasswordReg, setIsPasswordReg] = useState<boolean>(false);
    const onChangePasswordText = (text: string) => {
        setpassword(text);
        passwordErrorTextStyle(text);
    };
    const passwordErrorTextStyle = (text: string) => {
        const reg = /^(?=.*[a-zA-Z])(?=.*[!~.,?@#$%^&()_/|;:'"<>*+=-])(?=.*[0-9])/;
        reg.test(text) ? setIsPasswordReg(true) : setIsPasswordReg(false);
        text.length >= 8 && text.length <= 20 ? setIsPasswordLeng(true) : setIsPasswordLeng(false);
    };

    // Checking validation for next step
    const [joinData, setJoinData] = useRecoilState(joinMemberData);
    const canMoveNextStepHandler = () => {
        if (isPasswordLeng && isPasswordReg) {
            setJoinData({ ...joinData, password });
            onPressNextStep();
        }
    };

    // Change button Position by keyboard activity
    const { bottomValue, buttonUpAnimationHandler, buttonDownAnimationHandler } = useKeyboardMotion(210, 430);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', buttonUpAnimationHandler);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', buttonDownAnimationHandler);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <View style={emailWithPasswordTemplateStyles.container}>
            <MediumText text="Email" size={14} color="#7C8183" />
            <Spacer height={6} />

            <View style={emailWithPasswordTemplateStyles.emainTextBox}>
                <MediumText text={joinData.email} size={16} color={Colors.BLACK} />
            </View>

            <Spacer height={20} />

            <LoginTextInput
                title="Password"
                value={password}
                onChangeText={onChangePasswordText}
                placeholder="비밀번호 입력"
                secureTextEntry={true}
                maxLength={20}
            />

            <Spacer height={8} />

            <View style={emailWithPasswordTemplateStyles.emailErrorTextBox}>
                <IconWithMediumText
                    type="octicons"
                    name="check"
                    iconColor={isPasswordLeng ? Colors.STATUS_GREEN : Colors.STATUS_GRAY}
                    text="8자-20자 이내"
                    textColor={isPasswordLeng ? Colors.STATUS_GREEN : Colors.STATUS_GRAY}
                />
                <Spacer width={14} />
                <IconWithMediumText
                    type="octicons"
                    name="check"
                    iconColor={isPasswordReg ? Colors.STATUS_GREEN : Colors.STATUS_GRAY}
                    text="영어/숫자/특수문자 중 3개 포함"
                    textColor={isPasswordReg ? Colors.STATUS_GREEN : Colors.STATUS_GRAY}
                />
            </View>

            <Animated.View style={[nextStepButtonPosition.button, { transform: [{ translateY: bottomValue }] }]}>
                <TextButton
                    onPress={canMoveNextStepHandler}
                    text="회원가입"
                    height={48}
                    backgroundColor={isPasswordLeng && isPasswordReg ? Colors.BLACK : Colors.BTN_GRAY}
                    textColor={Colors.WHITE}
                    fontSize={17}
                />
            </Animated.View>
        </View>
    );
};

export default EmailWithPasswordTemplate;
