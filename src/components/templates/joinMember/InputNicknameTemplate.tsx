import React, { useCallback, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Modal, ToastAndroid, View } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useMutation, useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { debounce } from 'lodash';
import messaging from '@react-native-firebase/messaging';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import TextButton from '../../molecules/TextButton';
import CompletedJoinMemberModal from '../../organisms/CompletedJoinMemberModal';
import MoveBackWithPageTitle from '../../organisms/MoveBackWithPageTitle';
import { SingleLineInput } from '../../smallest/SingleLineInput';
import { InputNicknameTemplateProps } from '../../../types/types';
import { inputNicknameTemplateStyles } from '../../../styles/styles';
import { joinMemberAPI, checkNicknameAPI, fcmDeviceTokenAPI } from '../../../queries/api';
import { joinMemberAtom, userInfoAtom, userAuthAtom } from '../../../store/atoms';

const InputNicknameTemplate = ({ navigationHandler }: InputNicknameTemplateProps) => {
    const [joinData, setJoinData] = useRecoilState(joinMemberAtom);
    const setUserAuthState = useSetRecoilState(userAuthAtom);
    const setUserInfoState = useSetRecoilState(userInfoAtom);

    const [resultText, setResultText] = useState<string>('');
    const [isModalOn, setIsModalOn] = useState<boolean>(false);
    const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
    const [inputNickname, setInputNickname] = useState<string>('');

    // Check nickname duplicate API
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

    // Join member API
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

    // Send device token to FCM server
    const { mutate: fcmTokenMutate } = useMutation(fcmDeviceTokenAPI, {
        onSuccess: () => {
            setIsModalOn(true);
        },
        onError: error => {
            // For Debug
            console.log('(ERROR) Send device token to FCM server. ', error);
        },
    });

    // Success join member by API response
    const successJoinMemberHandler = async (data: {
        accessToken: string;
        refreshToken: string;
        memberId: number;
        nickName: string;
        email: string;
    }) => {
        try {
            await AsyncStorage.setItem('access_token', data.accessToken);
            await AsyncStorage.setItem('refresh_token', data.refreshToken);
            setUserAuthState({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                isLogIn: true,
            });
            setUserInfoState({
                memberId: data.memberId,
                nickname: data.nickName,
                email: data.email,
                isAllowLocation: false,
            });
            setJoinData({ email: '', password: '', nickName: '' });
            getTokenFCM(data.accessToken);
        } catch (err) {
            // For Debug
            console.log('(ERROR) User authorization token set storage. err: ', err);
        }
    };
    const getTokenFCM = async (accessToken: string) => {
        const deviceToken = await messaging().getToken();
        fcmTokenMutate({
            accessToken,
            fireBaseToken: deviceToken,
        });
    };

    // Call check duplicate refetch
    const checkDuplicate = useCallback(
        debounce((text: string) => {
            if (text.length > 1) {
                refetch();
            }
        }, 600),
        [],
    );

    // Nickname Text Handling
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

    // Finish button for join member API
    const onPressJoinMember = debounce(() => {
        if (isDuplicate) {
            mutate(joinData);
        }
    }, 300);

    return (
        <>
            <MoveBackWithPageTitle
                onPress={() => navigationHandler('BACK')}
                oneTitle="사용하실 닉네임을"
                twoTitle="입력해주세요"
                explainText="다른 사용자들이 볼 수 있고, 내 프로필에서 수정할 수 있어요"
                explainSize={13}
            />
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
            </View>

            <Modal visible={isModalOn}>
                <CompletedJoinMemberModal navigationHandler={navigationHandler} inputNickname={inputNickname} />
            </Modal>

            {(isFetching || isLoading) && <ActivityIndicator size="large" />}
        </>
    );
};

export default InputNicknameTemplate;
