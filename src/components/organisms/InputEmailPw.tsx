import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import validator from 'validator';
import { useRecoilState } from 'recoil';

import { joinMemberInfo } from '../../store/atoms';
import LoginTextInput from '../molecules/LoginTextInput';

const InputEmailPw = () => {
    const [joinData, setJoinData] = useRecoilState(joinMemberInfo);

    const [isEmail, setIsEmail] = useState(false);
    const onChangeEmailText = (text: string) => {
        setJoinData({ ...joinData, email: text });
    };
    const emailErrorTextStyle = () => {
        validator.isEmail(joinData.email)
            ? setIsEmail(true)
            : setIsEmail(false);
    };
    useEffect(() => {
        emailErrorTextStyle();
    }, [joinData.email]);

    const [isPasswordLeng, setIsPasswordLeng] = useState(false);
    const [isPasswordReg, setIsPasswordReg] = useState(false);
    const onChangePasswordText = (text: string) => {
        setJoinData({ ...joinData, password: text });
    };
    const passwordErrorTextStyle = () => {
        const reg =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{1,}$/;
        reg.test(joinData.password)
            ? setIsPasswordReg(true)
            : setIsPasswordReg(false);

        joinData.password.length >= 8 && joinData.password.length <= 20
            ? setIsPasswordLeng(true)
            : setIsPasswordLeng(false);
    };
    useEffect(() => {
        passwordErrorTextStyle();
    }, [joinData.password]);

    return (
        <View>
            <LoginTextInput
                title="Email"
                value={joinData.email}
                placeholder="이메일(아이디)입력"
                onChangeText={onChangeEmailText}
                firstErrorText="8자-20자 이내"
                firstErrorTextStyle={isEmail}
                keyboardType="email-address"
            />
            <LoginTextInput
                title="Password"
                value={joinData.password}
                placeholder="비밀번호 입력"
                onChangeText={onChangePasswordText}
                firstErrorText="8자-20자 이내"
                secondErrorText="영어/숫자/특수문자 중 3개 포함"
                firstErrorTextStyle={isPasswordLeng}
                secondErrorTextStyle={isPasswordReg}
                secureTextEntry={true}
            />
        </View>
    );
};
export default InputEmailPw;
