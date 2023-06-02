import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useRecoilState } from 'recoil';
import validator from 'validator';
import { useMutation } from 'react-query';
import { debounce } from 'lodash';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import BoldText from '../../smallest/BoldText';
import NormalText from '../../smallest/NormalText';
import MediumText from '../../smallest/MediumText';
import TextButton from '../../molecules/TextButton';
import LoginTextInput from '../../molecules/LoginTextInput';
import { emailAuthAPI } from '../../../queries/api';
import { InputEmailTemplateProps } from '../../../types/types';
import { inputEmailTemplateStyles } from '../../../styles/styles';
import { emailAuthAtom, joinMemberAtom } from '../../../store/atoms';
import useTextInputValidation from '../../../utils/hooks/useTextInputValidation';

const InputEmailTemplate = ({
    minutes,
    seconds,
    onPressNextStep,
    resetTimeHandler,
    didAuthEmail,
}: InputEmailTemplateProps) => {
    const [authData, setAuthData] = useRecoilState(emailAuthAtom);
    const [joinData, setJoinData] = useRecoilState(joinMemberAtom);

    const {
        text: email,
        onChangeText: setEmail,
        validationResult: duplicatedError,
        changeValidationResult: setDuplicatedError,
    } = useTextInputValidation();
    const [isEmail, setIsEmail] = useState<boolean>(false);

    // Request email authorization number API
    const { isLoading, mutate } = useMutation(emailAuthAPI, {
        onSuccess: data => {
            setAuthData({ ...authData, number: data.data.data });
            resetTimeHandler();
            onPressNextStep();
        },
        onError: ({ response }) => {
            if (response.data.state === 409) {
                setDuplicatedError(response.data.message);
            }
            // For Debug
            console.log('(ERROR) Request email authorization number API. response: ', response);
        },
    });

    // Email validation
    const onChangeEmailText = (text: string) => {
        setEmail(text);
        validator.isEmail(text) ? setIsEmail(true) : setIsEmail(false);
        setDuplicatedError('');
    };

    // Request email authorization number API handling by button
    const onPressEmailAuth = debounce(() => {
        if (!duplicatedError && email === joinData.email && isEmail && (minutes || seconds)) {
            authData.isOk ? didAuthEmail() : onPressNextStep();
        } else if (!email && !duplicatedError) {
            return;
        } else {
            setJoinData({ ...joinData, email });
            mutate(email);
        }
    }, 300);

    return (
        <View style={inputEmailTemplateStyles.container}>
            <View style={inputEmailTemplateStyles.mainContent}>
                <LoginTextInput
                    title="Email"
                    value={email}
                    onChangeText={onChangeEmailText}
                    placeholder="이메일(아이디) 입력"
                    keyboardType="email-address"
                />

                <Spacer height={8} />

                {email && !duplicatedError && (
                    <View style={inputEmailTemplateStyles.emailErrorTextBox}>
                        <Icons
                            type={isEmail ? 'octicons' : 'fontisto'}
                            name={isEmail ? 'check' : 'close'}
                            size={14}
                            color={isEmail ? Colors.STATUS_GREEN : Colors.STATUS_RED}
                        />
                        <Spacer width={4} />
                        <MediumText
                            text={isEmail ? '올바른 이메일 형식입니다' : '이메일 형식이 올바르지 않습니다'}
                            size={12}
                            color={isEmail ? Colors.STATUS_GREEN : Colors.STATUS_RED}
                        />
                    </View>
                )}
                {duplicatedError && (
                    <View style={inputEmailTemplateStyles.emailErrorTextBox}>
                        <Icons type={'fontisto'} name={'close'} size={14} color={Colors.STATUS_RED} />
                        <Spacer width={4} />
                        <MediumText text={duplicatedError} size={12} color={Colors.STATUS_RED} />
                    </View>
                )}
            </View>

            <TextButton
                onPress={onPressEmailAuth}
                text={authData.isOk ? '완료' : '인증메일 전송'}
                height={48}
                backgroundColor={isEmail && !duplicatedError ? Colors.BLACK : Colors.BTN_GRAY}
                textColor={Colors.WHITE}
                fontSize={17}
            />
            <View style={inputEmailTemplateStyles.resendMailButtonBox}>
                <NormalText text="메일을 받지 못하셨나요?" size={13} color={Colors.TXT_GRAY} />
                <TouchableOpacity
                    onPress={onPressEmailAuth}
                    activeOpacity={1}
                    style={inputEmailTemplateStyles.resendButton}>
                    <BoldText text="재전송" size={13} color={Colors.TXT_GRAY} />
                </TouchableOpacity>
            </View>
            {isLoading && <ActivityIndicator size="large" />}
        </View>
    );
};

export default InputEmailTemplate;
