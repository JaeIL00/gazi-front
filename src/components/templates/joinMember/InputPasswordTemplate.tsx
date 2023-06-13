import React, { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { useRecoilState } from 'recoil';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import NormalText from '../../smallest/NormalText';
import MediumText from '../../smallest/MediumText';
import TextButton from '../../molecules/TextButton';
import LoginTextInput from '../../molecules/LoginTextInput';
import ModalBackground from '../../smallest/ModalBackground';
import ServiceAgreement from '../../organisms/ServiceAgreement';
import IconWithMediumText from '../../molecules/IconWithMediumText';
import MoveBackWithPageTitle from '../../organisms/MoveBackWithPageTitle';
import { joinMemberAtom } from '../../../store/atoms';
import { InputPasswordTemplateProps } from '../../../types/types';
import { inputPasswordTemplateStyles } from '../../../styles/styles';

const InputPasswordTemplate = ({ navigationHandler }: InputPasswordTemplateProps) => {
    const [joinData, setJoinData] = useRecoilState(joinMemberAtom);

    const [password, setpassword] = useState<string>('');
    const [isModalOn, setIsModalOn] = useState<boolean>(false);
    const [isPasswordReg, setIsPasswordReg] = useState<boolean>(false);
    const [isPasswordLeng, setIsPasswordLeng] = useState<boolean>(false);

    // Password validation handling
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
    const canMoveNextStepHandler = () => {
        if (isPasswordLeng && isPasswordReg) {
            setJoinData({ ...joinData, password });
            setIsModalOn(true);
        }
    };

    return (
        <>
            <MoveBackWithPageTitle
                onPress={() => navigationHandler('BACK')}
                oneTitle="회원가입"
                twoTitle=""
                explainText="비밀번호를 입력해주세요"
                explainSize={13}
            />
            <View style={inputPasswordTemplateStyles.container}>
                <View style={{ flex: 1 }}>
                    <MediumText text="Email" size={14} color="#7C8183" />
                    <Spacer height={6} />

                    <View style={inputPasswordTemplateStyles.emainTextBox}>
                        <NormalText text={joinData.email} size={16} color={Colors.BLACK} />
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

                    <View style={inputPasswordTemplateStyles.emailErrorTextBox}>
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
                            text="영어, 숫자, 특수문자 포함"
                            textColor={isPasswordReg ? Colors.STATUS_GREEN : Colors.STATUS_GRAY}
                        />
                    </View>
                </View>

                <View style={inputPasswordTemplateStyles.bottomButton}>
                    <KeyboardAvoidingView behavior="height">
                        <TextButton
                            onPress={canMoveNextStepHandler}
                            text="회원가입"
                            height={48}
                            backgroundColor={isPasswordLeng && isPasswordReg ? Colors.BLACK : Colors.BTN_GRAY}
                            textColor={Colors.WHITE}
                            fontSize={17}
                        />
                    </KeyboardAvoidingView>
                </View>
            </View>
            <ModalBackground visible={isModalOn} onRequestClose={() => setIsModalOn(false)}>
                <ServiceAgreement finishSlideComponentHandler={navigationHandler} />
            </ModalBackground>
        </>
    );
};

export default InputPasswordTemplate;
