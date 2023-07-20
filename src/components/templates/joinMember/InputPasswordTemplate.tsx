import React, { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { useRecoilState } from 'recoil';

import Spacer from '../../atoms/Spacer';
import colors from '../../../common/constants/colors';
import NormalText from '../../atoms/NormalText';
import MediumText from '../../atoms/MediumText';
import TextButton from '../../molecules/TextButton';
import LoginTextInput from '../../molecules/LoginTextInput';
import ModalBackground from '../../atoms/ModalBackground';
import ServiceAgreement from '../../organisms/ServiceAgreement';
import IconWithMediumText from '../../molecules/IconWithMediumText';
import MoveBackWithPageTitle from '../../organisms/MoveBackWithPageTitle';
import { joinMemberAtom } from '../../../recoil';
import { inputPasswordTemplateStyles } from '../../../styles/templates/styles';
import { InputPasswordTemplateProps } from '../../../types/templates/types';

// Password validation rule
const REG = /^(?=.*[a-zA-Z])(?=.*[!~.,?@#$%^&()_/|;:'"<>*+=-])(?=.*[0-9])/;

const InputPasswordTemplate = ({ navigationHandler }: InputPasswordTemplateProps) => {
    const [joinData, setJoinData] = useRecoilState(joinMemberAtom);

    const [password, setPassword] = useState<string>('');
    const [isModalOn, setIsModalOn] = useState<boolean>(false);
    const [isPasswordReg, setIsPasswordReg] = useState<boolean>(false);
    const [isPasswordLeng, setIsPasswordLeng] = useState<boolean>(false);

    // Password validation handling
    const onChangePasswordText = (text: string) => {
        setPassword(text);
        passwordErrorTextStyle(text);
    };
    const passwordErrorTextStyle = (text: string) => {
        REG.test(text) ? setIsPasswordReg(true) : setIsPasswordReg(false);
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
                <View style={inputPasswordTemplateStyles.inputBox}>
                    <MediumText text="Email" size={14} color="#7C8183" />
                    <Spacer height={6} />

                    <View style={inputPasswordTemplateStyles.emainTextBox}>
                        <NormalText text={joinData.email} size={16} color={colors.BLACK} />
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
                            iconColor={isPasswordLeng ? colors.STATUS_GREEN : colors.STATUS_GRAY}
                            text="8자-20자 이내"
                            textColor={isPasswordLeng ? colors.STATUS_GREEN : colors.STATUS_GRAY}
                        />
                        <Spacer width={14} />
                        <IconWithMediumText
                            type="octicons"
                            name="check"
                            iconColor={isPasswordReg ? colors.STATUS_GREEN : colors.STATUS_GRAY}
                            text="영어, 숫자, 특수문자 포함"
                            textColor={isPasswordReg ? colors.STATUS_GREEN : colors.STATUS_GRAY}
                        />
                    </View>
                </View>

                <View style={inputPasswordTemplateStyles.bottomButton}>
                    <KeyboardAvoidingView behavior="height">
                        <TextButton
                            onPress={canMoveNextStepHandler}
                            text="회원가입"
                            height={48}
                            backgroundColor={isPasswordLeng && isPasswordReg ? colors.BLACK : colors.BTN_GRAY}
                            fontColor={colors.WHITE}
                            fontWeight="semiBold"
                            fontSize={17}
                            borderRadius={5}
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
