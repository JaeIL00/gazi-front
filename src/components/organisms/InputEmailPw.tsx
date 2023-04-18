import React, { useEffect, useState } from 'react';
import LoginTextInput from '../molecules/LoginTextInput';
import validator from 'validator';

const InputEmailPw = () => {
    const [email, setEmail] = useState('');
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

    const [password, setPassword] = useState('');
    const [isPasswordLeng, setIsPasswordLeng] = useState(false);
    const [isPasswordReg, setIsPasswordReg] = useState(false);
    const onChangePasswordText = (text: string) => {
        setPassword(text);
    };
    const passwordErrorTextStyle = () => {
        const reg =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{1,}$/;
        reg.test(password) ? setIsPasswordReg(true) : setIsPasswordReg(false);

        password.length >= 8 && password.length <= 20
            ? setIsPasswordLeng(true)
            : setIsPasswordLeng(false);
    };
    useEffect(() => {
        passwordErrorTextStyle();
    }, [password]);

    return (
        <>
            <LoginTextInput
                title="Email"
                value={email}
                placeholder="이메일(아이디)입력"
                onChangeText={onChangeEmailText}
                firstErrorText="8자-20자 이내"
                firstErrorTextStyle={isEmail}
                keyboardType="email-address"
            />
            <LoginTextInput
                title="Password"
                value={password}
                placeholder="비밀번호 입력"
                onChangeText={onChangePasswordText}
                firstErrorText="8자-20자 이내"
                secondErrorText="영어/숫자/특수문자 중 3개 포함"
                firstErrorTextStyle={isPasswordLeng}
                secondErrorTextStyle={isPasswordReg}
                secureTextEntry={true}
            />
        </>
    );
};
export default InputEmailPw;
