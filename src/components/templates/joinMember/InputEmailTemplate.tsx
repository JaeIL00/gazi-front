import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRecoilState } from 'recoil';
import validator from 'validator';

import { joinMemberData } from '../../../store/atoms';
import { EmailWithPasswordProps } from '../../../types/types';
import TextButton from '../../molecules/TextButton';
import Colors from '../../../styles/Colors';
import LoginTextInput from '../../molecules/LoginTextInput';
import { inputEmailTemplateStyles } from '../../../styles/styles';
import MediumText from '../../smallest/MediumText';
import Spacer from '../../smallest/Spacer';
import Icons from '../../smallest/Icons';

const InputEmailTemplate = ({ onPressNextStep }: EmailWithPasswordProps) => {
    const [joinData, setJoinData] = useRecoilState(joinMemberData);
    const [initError, setInitError] = useState(false);

    // Email validation
    const [isEmail, setIsEmail] = useState(false);
    const onChangeEmailText = (text: string) => {
        setJoinData({ ...joinData, email: text });
    };
    const emailErrorTextStyle = () => {
        validator.isEmail(joinData.email) ? setIsEmail(true) : setIsEmail(false);
    };
    const activityErrorTextHandler = () => {
        if (joinData.email) {
            setInitError(true);
        } else {
            setInitError(false);
        }
    };
    useEffect(() => {
        emailErrorTextStyle();
        activityErrorTextHandler();
    }, [joinData.email]);

    // Button Style Handling
    const [buttonText, setButtonText] = useState('이메일을 입력해주세요');
    const [buttonColor, setButtonColor] = useState(Colors.BTN_GRAY);
    const buttonStyleHandler = () => {
        if (isEmail) {
            setButtonText('이메일 인증');
            setButtonColor(Colors.BLACK);
        } else {
            setButtonText('이메일을 입력해주세요');
            setButtonColor(Colors.BTN_GRAY);
        }
    };
    useEffect(() => {
        buttonStyleHandler();
    }, [isEmail]);

    return (
        <View>
            <LoginTextInput
                title="Email"
                value={joinData.email}
                onChangeText={onChangeEmailText}
                placeholder="이메일(아이디) 입력"
                keyboardType="email-address"
            />
            <Spacer height={8} />
            {initError && (
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
            <TextButton
                onPress={() => {}}
                text={buttonText}
                height={48}
                backgroundColor={buttonColor}
                textColor={Colors.WHITE}
                fontSize={17}
            />
        </View>
    );
};

export default InputEmailTemplate;
