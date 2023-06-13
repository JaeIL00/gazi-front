import React, { useCallback, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, ToastAndroid, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { useMutation, useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { debounce } from 'lodash';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import TextButton from '../../molecules/TextButton';
import { SingleLineInput } from '../../smallest/SingleLineInput';
import { InputNicknameTemplateProps } from '../../../types/types';
import { inputNicknameTemplateStyles } from '../../../styles/styles';
import { joinMemberAPI, checkNicknameAPI } from '../../../queries/api';
import { joinMemberAtom, userInfoAtom, userTokenAtom } from '../../../store/atoms';

const InputNicknameTemplate = ({ onPressNextStep }: InputNicknameTemplateProps) => {
    // Nickname Text Handling
    const [inputNickname, setInputNickname] = useState<string>('');
    const onChangeNickname = (text: string) => {
        setInputNickname(text);
        setIsDuplicate(false);
        checkDuplicate(text);
        if (text.length === 1) {
            setResultText('2글자 이상 입력해주세요');
        } else {
            setResultText('');
        }
    };

    // Check nickname duplicate API
    const [joinData, setJoinData] = useRecoilState(joinMemberAtom);
    const [resultText, setResultText] = useState<string>('');
    const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
    const { refetch, isFetching } = useQuery('duplicateNickname', () => checkNicknameAPI(inputNickname), {
        enabled: false,
        onSuccess: ({ data }) => {
            if (inputNickname.length > 1) {
                setResultText(data.message);
                setIsDuplicate(true);
                setJoinData({ ...joinData, nickName: inputNickname });
            }
        },
        onError: ({ response }) => {
            if (response.data.state === 409) {
                setResultText(response.data.message);
                setIsDuplicate(false);
            }
            // For Debug
            console.log('(ERROR) Check nickname duplicate API. respense: ', response);
        },
    });
    const checkDuplicate = useCallback(
        debounce((text: string) => {
            if (text.length > 1) {
                refetch();
            }
        }, 600),
        [],
    );

    // Join member API
    const [tokenAtom, setTokenAtom] = useRecoilState(userTokenAtom);
    const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
    const { mutate, isLoading } = useMutation(joinMemberAPI, {
        onSuccess: ({ data }) => {
            successJoinMemberHandler(data.data);
        },
        onError: ({ response }) => {
            // For Debug
            console.log('(ERROR) Join member API. response: ', response);
            ToastAndroid.show('회원가입 실패', 4000);
        },
    });
    const successJoinMemberHandler = async (data: {
        accessToken: string;
        refreshToken: string;
        memberId: number;
        nickName: string;
        email: string;
    }) => {
        try {
            await AsyncStorage.setItem('GAZI_ac_tk', data.accessToken);
            await AsyncStorage.setItem('GAZI_re_tk', data.refreshToken);
            setTokenAtom({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            });
            setUserInfo({
                memberId: data.memberId,
                nickname: data.nickName,
                email: data.email,
            });
        } catch (err) {
            // For Debug
            console.log('(ERROR) User authorization token set storage. err: ', err);
            ToastAndroid.show('토큰 저장 실패', 4000);
        } finally {
            onPressNextStep();
        }
    };

    // Finish button for join member API
    const onPressJoinMember = debounce(() => {
        if (isDuplicate) {
            mutate(joinData);
        }
    }, 300);

    return (
        <View style={inputNicknameTemplateStyles.container}>
            <View style={inputNicknameTemplateStyles.mainContentBox}>
                <View style={inputNicknameTemplateStyles.inputBox}>
                    <SingleLineInput
                        value={inputNickname}
                        onChangeText={onChangeNickname}
                        maxLength={7}
                        placeholder="닉네임을 입력해주세요."
                        fontSize={16}
                    />
                </View>

                <Spacer height={8} />

                {resultText && (
                    <View style={inputNicknameTemplateStyles.emailErrorTextBox}>
                        <Icons
                            type={isDuplicate ? 'octicons' : 'fontisto'}
                            name={isDuplicate ? 'check' : 'close'}
                            size={14}
                            color={isDuplicate ? Colors.STATUS_GREEN : Colors.STATUS_RED}
                        />
                        <Spacer width={4} />
                        <MediumText
                            text={resultText}
                            size={12}
                            color={isDuplicate ? Colors.STATUS_GREEN : Colors.STATUS_RED}
                        />
                    </View>
                )}
            </View>

            <KeyboardAvoidingView behavior="height">
                <View style={inputNicknameTemplateStyles.bottomButton}>
                    <TextButton
                        text="확인"
                        textColor={Colors.WHITE}
                        backgroundColor={isDuplicate && resultText ? Colors.BLACK : Colors.BTN_GRAY}
                        onPress={onPressJoinMember}
                        height={48}
                        fontSize={17}
                    />
                </View>
            </KeyboardAvoidingView>

            {(isFetching || isLoading) && <ActivityIndicator size="large" />}
        </View>
    );
};

export default InputNicknameTemplate;
