import React, { useCallback, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { debounce } from 'lodash';
import { useMutation } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import TouchButton from '../../smallest/TouchButton';
import HeaderMolecule from '../../molecules/HeaderMolecule';
import useTextInputValidation from '../../../utils/hooks/useTextInputValidation';
import { SingleLineInput } from '../../smallest/SingleLineInput';
import { EditNicknameTemplateProps } from '../../../types/types';
import { userInfoAtom, userTokenAtom } from '../../../store/atoms';
import { editNicknameTemplateStyles } from '../../../styles/styles';
import { checkNicknameAPI, editNicknameAPI } from '../../../queries/api';
import { screenHeight, screenWidth } from '../../../utils/changeStyleSize';

const EditNicknameTemplate = ({ moveToMyProfileScreen }: EditNicknameTemplateProps) => {
    // Validator custom hook input text
    const { text: nickname, onChangeText, validationResult, changValidationResult } = useTextInputValidation();
    const { nickname: nicknameAtom } = useRecoilValue(userInfoAtom);
    useLayoutEffect(() => {
        onChangeText(nicknameAtom);
    }, []);
    const onChangeNicknameText = (text: string) => {
        onChangeText(text);
        setIsGoodResponse(false);
        // setIsFocusText(false);
        if (text.length < 2) {
            changValidationResult('2글자 이상 입력해주세요');
        } else {
            changValidationResult('');
            checkNicknameHandler(text);
        }
    };
    const checkNicknameHandler = useCallback(
        debounce((text: string) => {
            checkMutatie(text);
        }, 1000),
        [],
    );

    // Input focus
    const [isFocusText, setIsFocusText] = useState(true);
    const resetText = () => {
        onChangeText('');
        changValidationResult('2글자 이상 입력해주세요');
        // setIsFocusText(true);
    };

    // Check nickname API
    const { mutate: checkMutatie, isLoading: isCheckLoading } = useMutation(checkNicknameAPI, {
        onSuccess: ({ data }) => {
            setIsGoodResponse(true);
            changValidationResult('사용 가능한 닉네임입니다');
        },
        onError: ({ response }) => {
            if (response.data.state === 409) {
                setIsGoodResponse(false);
                changValidationResult('중복된 닉네임입니다');
            }
            // For Debug
            console.log('(ERROR) Check nickname API.', response);
        },
    });

    // Edit nickname API
    const { accessToken } = useRecoilValue(userTokenAtom);
    const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
    const [isGoodResponse, setIsGoodResponse] = useState(false);
    const { mutate: editMutate, isLoading: isEditLoading } = useMutation(editNicknameAPI, {
        onSuccess: ({ data }) => {
            moveToMyProfileScreen('CLOSE');
            setUserInfo({
                ...userInfo,
                nickname,
            });
        },
        onError: ({ response }) => {
            // For Debug
            console.log('(ERROR) Edit nickname API.', response);
        },
    });
    const editNicknameHandler = () => {
        editMutate({
            accessToken,
            data: nickname,
        });
    };

    return (
        <>
            <HeaderMolecule
                isPaddingHorizontal={true}
                backHandler={moveToMyProfileScreen}
                headerFinish={true}
                title="닉네임 수정"
                finishText="완료"
                isNextStep={false}
                isWorkDone={isGoodResponse}
                background={Colors.WHITE}
                finishFunction={editNicknameHandler}
            />

            <View style={editNicknameTemplateStyles.templateContent}>
                <View style={editNicknameTemplateStyles.inputBox}>
                    <SingleLineInput
                        value={nickname}
                        onChangeText={text => onChangeNicknameText(text)}
                        isFocus={true}
                        width={260}
                        maxLength={7}
                    />
                    <TouchButton onPress={resetText}>
                        <Icons type="ionicons" name="close-circle" size={19.5} color="#00000075" />
                    </TouchButton>
                </View>
                {validationResult && (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 9 * screenWidth,
                            paddingTop: 8 * screenHeight,
                        }}>
                        <Icons
                            type={isGoodResponse ? 'octicons' : 'fontisto'}
                            name={isGoodResponse ? 'check' : 'close'}
                            size={14}
                            color={isGoodResponse ? Colors.STATUS_GREEN : Colors.STATUS_RED}
                        />
                        <Spacer width={4} />
                        <MediumText
                            text={validationResult}
                            size={12}
                            color={isGoodResponse ? Colors.STATUS_GREEN : Colors.STATUS_RED}
                        />
                    </View>
                )}
                {(isCheckLoading || isEditLoading) && <ActivityIndicator size="large" />}
            </View>
        </>
    );
};
export default EditNicknameTemplate;
