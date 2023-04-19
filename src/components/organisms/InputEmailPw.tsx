import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import validator from 'validator';
import { useRecoilState } from 'recoil';

import { joinMemberInfo } from '../../store/atoms';
import LoginTextInput from '../molecules/LoginTextInput';
import { InputEmailPwProps } from '../../types/types';

const InputEmailPw = ({
    data,
    isEmail,
    isPasswordLeng,
    isPasswordReg,
    onChangeEmailText,
    onChangePasswordText,
}: InputEmailPwProps) => {
    return (
        <View>
            <LoginTextInput
                title="Email"
                value={data.email}
                placeholder="이메일(아이디)입력"
                onChangeText={onChangeEmailText}
                firstErrorText="올바른 이메일 형식"
                firstErrorTextStyle={isEmail}
                keyboardType="email-address"
            />
            <LoginTextInput
                title="Password"
                value={data.password}
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
