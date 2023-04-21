import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRecoilState } from 'recoil';

import { joinMemberData } from '../../../store/atoms';
import { EmailWithPasswordProps } from '../../../types/types';
import TextButton from '../../molecules/TextButton';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import LoginTextInput from '../../molecules/LoginTextInput';
import Spacer from '../../smallest/Spacer';
import { emailWithPasswordTemplateStyles } from '../../../styles/styles';
import IconWithMediumText from '../../molecules/IconWithMediumText';

const EmailWithPasswordTemplate = ({ onPressNextStep }: EmailWithPasswordProps) => {
    const [joinData, setJoinData] = useRecoilState(joinMemberData);

    // Password validation
    const [password, setpassword] = useState(joinData.password);
    const [isPasswordLeng, setIsPasswordLeng] = useState(false);
    const [isPasswordReg, setIsPasswordReg] = useState(false);
    const onChangePasswordText = (text: string) => {
        setpassword(text);
    };
    const passwordErrorTextStyle = () => {
        const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{1,}$/;
        reg.test(password) ? setIsPasswordReg(true) : setIsPasswordReg(false);

        password.length >= 8 && password.length <= 20 ? setIsPasswordLeng(true) : setIsPasswordLeng(false);
    };
    useEffect(() => {
        passwordErrorTextStyle();
    }, [password]);

    // Button Style Handling
    const [buttonColor, setButtonColor] = useState(Colors.BTN_GRAY);
    const buttonStyleHandler = () => {
        if (isPasswordLeng && isPasswordReg) {
            setButtonColor(Colors.BLACK);
        } else {
            setButtonColor(Colors.BTN_GRAY);
        }
    };
    useEffect(() => {
        buttonStyleHandler();
    }, [isPasswordLeng, isPasswordReg]);

    // Checking validation
    const canMoveNextStepHandler = () => {
        if (isPasswordLeng && isPasswordReg) {
            setJoinData({ ...joinData, password });
            onPressNextStep();
        }
    };

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

            <View style={emailWithPasswordTemplateStyles.finishButton}>
                <TextButton
                    onPress={canMoveNextStepHandler}
                    text="회원가입"
                    height={48}
                    backgroundColor={buttonColor}
                    textColor={Colors.WHITE}
                    fontSize={17}
                />
            </View>
        </View>
    );
};

export default EmailWithPasswordTemplate;
