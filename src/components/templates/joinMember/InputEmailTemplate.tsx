import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useRecoilState } from 'recoil';
import validator from 'validator';
import { useMutation } from 'react-query';
import { debounce } from 'lodash';

import Icons from '../../atoms/Icons';
import Spacer from '../../atoms/Spacer';
import colors from '../../../common/constants/colors';
import BoldText from '../../atoms/BoldText';
import AuthEmail from '../../organisms/AuthEmail';
import NormalText from '../../atoms/NormalText';
import MediumText from '../../atoms/MediumText';
import TextButton from '../../molecules/TextButton';
import LoginTextInput from '../../molecules/LoginTextInput';
import ModalBackground from '../../atoms/ModalBackground';
import MoveBackWithPageTitle from '../../organisms/MoveBackWithPageTitle';
import useBackgroundInterval from '../../../common/hooks/useBackgroundInterval';
import useTextInputValidation from '../../../common/hooks/useTextInputValidation';
import { emailAuthAPI } from '../../../apis/api';
import { emailAuthAtom, joinMemberAtom } from '../../../recoil';
import { inputEmailTemplateStyles } from '../../../styles/templates/styles';
import { InputEmailTemplateProps } from '../../../types/templates/types';

const InputEmailTemplate = ({ navigationHandler }: InputEmailTemplateProps) => {
    const [authData, setAuthData] = useRecoilState(emailAuthAtom);
    const [joinData, setJoinData] = useRecoilState(joinMemberAtom);

    const [minutes, setMinutes] = useState<number>(5);
    const [seconds, setSeconds] = useState<number>(0);
    const [isEmail, setIsEmail] = useState<boolean>(false);
    const [isOnModal, setIsOnModal] = useState<boolean>(false);

    const {
        text: email,
        onChangeText: setEmail,
        validationResult: duplicatedError,
        changeValidationResult: setDuplicatedError,
    } = useTextInputValidation();

    // Request email authorization number API
    const { isLoading, mutate } = useMutation(emailAuthAPI, {
        onSuccess: data => {
            setAuthData({ ...authData, number: data.data.data });
            resetTimeHandler();
            authNumberModalHanlder('OPEN');
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
        const nextStepWithoutMutate = !duplicatedError && email === joinData.email && (minutes || seconds);
        const userInteractionNothing = !email || !duplicatedError || !isEmail;

        if (nextStepWithoutMutate) {
            authData.isAuthorizationPass ? navigationHandler('GO') : authNumberModalHanlder('OPEN');
        } else if (userInteractionNothing) {
            return;
        } else {
            setJoinData({ ...joinData, email });
            mutate(email);
        }
    }, 300);

    // Input auth number modal handler
    const authNumberModalHanlder = (state: string) => {
        switch (state) {
            case 'OPEN':
                setIsOnModal(true);
                break;
            case 'CLOSE':
                setIsOnModal(false);
                break;
            case 'CORRECT':
                setIsOnModal(false);
                navigationHandler('GO');
                break;
            default:
                // For Debug
                console.log('(ERROR) Input auth number modal handler.', state);
        }
    };

    // Timer for email authorization
    const timerHandler = () => {
        if (seconds > 0) {
            setSeconds(seconds - 1);
        } else if (seconds === 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
        }
    };
    const resetTimeHandler = () => {
        setMinutes(5);
        setSeconds(0);
    };
    useBackgroundInterval(timerHandler, minutes === 0 && seconds === 0 ? null : 1000);

    // Reset auth number by full time
    useLayoutEffect(() => {
        if (minutes === 0 && seconds === 0) {
            setAuthData({ ...authData, number: 0 });
        }
    }, [minutes]);

    return (
        <>
            <MoveBackWithPageTitle
                onPress={() => navigationHandler('BACK')}
                oneTitle="회원가입"
                twoTitle=""
                explainText="본인인증을 위한 이메일을 입력해주세요"
                explainSize={13}
            />
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
                                color={isEmail ? colors.STATUS_GREEN : colors.STATUS_RED}
                            />
                            <Spacer width={4} />
                            <MediumText
                                text={isEmail ? '올바른 이메일 형식입니다' : '이메일 형식이 올바르지 않습니다'}
                                size={12}
                                color={isEmail ? colors.STATUS_GREEN : colors.STATUS_RED}
                            />
                        </View>
                    )}
                    {duplicatedError && (
                        <View style={inputEmailTemplateStyles.emailErrorTextBox}>
                            <Icons type={'fontisto'} name={'close'} size={14} color={colors.STATUS_RED} />
                            <Spacer width={4} />
                            <MediumText text={duplicatedError} size={12} color={colors.STATUS_RED} />
                        </View>
                    )}
                </View>

                <TextButton
                    onPress={onPressEmailAuth}
                    text={authData.isAuthorizationPass ? '완료' : '인증메일 전송'}
                    height={48}
                    backgroundColor={isEmail && !duplicatedError ? colors.BLACK : colors.BTN_GRAY}
                    textColor={colors.WHITE}
                    fontSize={17}
                />
                <View style={inputEmailTemplateStyles.resendMailButtonBox}>
                    <NormalText text="메일을 받지 못하셨나요?" size={13} color={colors.TXT_GRAY} />
                    <TouchableOpacity
                        onPress={onPressEmailAuth}
                        activeOpacity={1}
                        style={inputEmailTemplateStyles.resendButton}>
                        <BoldText text="재전송" size={13} color={colors.TXT_GRAY} />
                    </TouchableOpacity>
                </View>

                <ModalBackground visible={isOnModal} onRequestClose={() => authNumberModalHanlder('CLOSE')}>
                    <AuthEmail
                        min={minutes}
                        sec={seconds}
                        resetTimeHandler={resetTimeHandler}
                        authNumberModalHanlder={authNumberModalHanlder}
                    />
                </ModalBackground>

                {isLoading && <ActivityIndicator size="large" />}
            </View>
        </>
    );
};

export default InputEmailTemplate;
