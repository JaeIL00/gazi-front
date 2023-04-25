import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, Keyboard, ToastAndroid, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { useMutation, useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import TextButton from '../../molecules/TextButton';
import useKeyboardMotion from '../../../utils/hooks/useKeyboardMotion';
import { forDebugAtom, joinMemberData } from '../../../store/atoms';
import { NicknameTemplateProps } from '../../../types/types';
import { SingleLineInput } from '../../smallest/SingleLineInput';
import { joinMemberAPI, checkNicknameAPI } from '../../../queries/api';
import { nextStepButtonPosition, nicknameTemplateStyles } from '../../../styles/styles';

const NicknameTemplate = ({ onPressNextStep }: NicknameTemplateProps) => {
    const [joinData, setJoinData] = useRecoilState(joinMemberData);
    const [initErrorText, setInitErrorText] = useState(false);

    // Nickname Text Handling
    const [inputNickname, setInputNickname] = useState('');
    const onChangeNickname = (text: string) => {
        setInputNickname(text);
        setInitErrorText(false);
    };

    // Check nickname duplicate API Handling
    const [isDuplicate, setIsDuplicate] = useState(false);
    const { refetch, isFetching } = useQuery('duplicateNickname', () => checkNicknameAPI(inputNickname), {
        enabled: false,
        onSuccess: () => {
            setIsDuplicate(true);
            setJoinData({ ...joinData, nickName: inputNickname });
        },
        onError: ({ response }) => {
            if (response.status === 409) {
                setIsDuplicate(false);
            }
        },
        onSettled: () => {
            setInitErrorText(true);
        },
    });
    const onPressCheckDuplicate = () => {
        if (inputNickname.length > 1) {
            refetch();
        }
    };

    // Join member API Handling
    const [tok, setTok] = useRecoilState(forDebugAtom);
    const { mutate } = useMutation(joinMemberAPI, {
        onSuccess: data => {
            successJoinMemberHandler(data.data.data);
        },
        onError: () => {
            // For Debug
            ToastAndroid.show('회원가입 실패', 4000);
        },
    });
    const successJoinMemberHandler = async (data: { accessToken: string; refreshToken: string }) => {
        try {
            await AsyncStorage.setItem('GAZI_ac_tk', data.accessToken);
            await AsyncStorage.setItem('GAZI_re_tk', data.refreshToken);
            setTok(data.accessToken);
        } catch (err) {
            // For Debug
            ToastAndroid.show('토큰 저장 실패', 4000);
        } finally {
            onPressNextStep();
        }
    };

    // Join member API by finish button
    const onPressJoinMember = () => {
        if (isDuplicate) {
            mutate(joinData);
        }
    };

    // Finish button transitionY handling
    const { bottomValue, buttonUpAnimationHandler, buttonDownAnimationHandler } = useKeyboardMotion(180, 400);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', buttonUpAnimationHandler);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', buttonDownAnimationHandler);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <View style={nicknameTemplateStyles.container}>
            <View style={nicknameTemplateStyles.inputBox}>
                <SingleLineInput
                    value={inputNickname}
                    onChangeText={onChangeNickname}
                    maxLength={12}
                    placeholder="닉네임을 입력해주세요."
                />
                <TextButton
                    text="중복 확인"
                    textColor={Colors.WHITE}
                    width={69}
                    height={31}
                    backgroundColor={Colors.BLACK}
                    onPress={onPressCheckDuplicate}
                    fontSize={13}
                    paddingHorizontal={10}
                    paddingVertical={6}
                />
            </View>

            <Spacer height={8} />

            {initErrorText && (
                <View style={nicknameTemplateStyles.emailErrorTextBox}>
                    <Icons
                        type={isDuplicate ? 'octicons' : 'fontisto'}
                        name={isDuplicate ? 'check' : 'close'}
                        size={14}
                        color={isDuplicate ? Colors.STATUS_GREEN : Colors.STATUS_RED}
                    />
                    <Spacer width={4} />
                    <MediumText
                        text={isDuplicate ? '사용 가능한 닉네임입니다' : '중복된 닉네임입니다'}
                        size={12}
                        color={isDuplicate ? Colors.STATUS_GREEN : Colors.STATUS_RED}
                    />
                </View>
            )}
            {isFetching && <ActivityIndicator size="large" />}
            <Animated.View style={[nextStepButtonPosition.button, { transform: [{ translateY: bottomValue }] }]}>
                <TextButton
                    text="확인"
                    textColor={Colors.WHITE}
                    backgroundColor={isDuplicate && initErrorText ? Colors.BLACK : Colors.BTN_GRAY}
                    onPress={onPressJoinMember}
                    height={48}
                    fontSize={17}
                />
            </Animated.View>
        </View>
    );
};

export default NicknameTemplate;
