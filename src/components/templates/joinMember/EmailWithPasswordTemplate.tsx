import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { useRecoilState } from 'recoil';
import validator from 'validator';

import { joinMemberData } from '../../../store/atoms';
import InputEmailPw from '../../organisms/InputEmailPw';
import { EmailWithPasswordProps } from '../../../types/types';
import TouchButton from '../../smallest/TouchButton';

const EmailWithPasswordTemplate = ({ onPressNextStep }: EmailWithPasswordProps) => {
    const [joinData, setJoinData] = useRecoilState(joinMemberData);

    // Email validation
    const [isEmail, setIsEmail] = useState(false);
    const onChangeEmailText = (text: string) => {
        setJoinData({ ...joinData, email: text });
    };
    const emailErrorTextStyle = () => {
        validator.isEmail(joinData.email) ? setIsEmail(true) : setIsEmail(false);
    };
    useEffect(() => {
        emailErrorTextStyle();
    }, [joinData.email]);

    // Password validation
    const [isPasswordLeng, setIsPasswordLeng] = useState(false);
    const [isPasswordReg, setIsPasswordReg] = useState(false);
    const onChangePasswordText = (text: string) => {
        setJoinData({ ...joinData, password: text });
    };
    const passwordErrorTextStyle = () => {
        const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{1,}$/;
        reg.test(joinData.password) ? setIsPasswordReg(true) : setIsPasswordReg(false);

        joinData.password.length >= 8 && joinData.password.length <= 20
            ? setIsPasswordLeng(true)
            : setIsPasswordLeng(false);
    };
    useEffect(() => {
        passwordErrorTextStyle();
    }, [joinData.password]);

    const canMoveNextStepHandler = () => {
        if (isEmail && isPasswordLeng && isPasswordReg) {
            onPressNextStep();
        } else {
            Alert.alert('입력값을 확인해주세요.');
        }
    };

    return (
        <View>
            <InputEmailPw
                data={joinData}
                isEmail={isEmail}
                isPasswordLeng={isPasswordLeng}
                isPasswordReg={isPasswordReg}
                onChangeEmailText={onChangeEmailText}
                onChangePasswordText={onChangePasswordText}
            />
            <TouchButton title="다음" onPress={canMoveNextStepHandler} />
        </View>
    );
};

export default EmailWithPasswordTemplate;
