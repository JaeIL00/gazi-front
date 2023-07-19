import React, { useCallback, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { debounce } from 'lodash';
import { useMutation } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

import Icons from '../../atoms/Icons';
import Spacer from '../../atoms/Spacer';
import colors from '../../../common/constants/colors';
import MediumText from '../../atoms/MediumText';
import TouchButton from '../../atoms/TouchButton';
import HeaderMolecule from '../../molecules/HeaderMolecule';
import useTextInputValidation from '../../../common/hooks/useTextInputValidation';
import { SingleLineInput } from '../../atoms/SingleLineInput';
import { userInfoAtom, userAuthAtom } from '../../../recoil';
import { editNicknameTemplateStyles } from '../../../styles/templates/styles';
import { checkNicknameAPI, editNicknameAPI } from '../../../apis/api';
import { EditNicknameTemplateProps } from '../../../types/templates/types';

const EditNicknameTemplate = ({ moveToMyPageScreen }: EditNicknameTemplateProps) => {
    const { accessToken } = useRecoilValue(userAuthAtom);
    const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
    const { nickname: nicknameAtom } = useRecoilValue(userInfoAtom);

    const { text: nickname, onChangeText, validationResult, changeValidationResult } = useTextInputValidation();

    const [isGoodResponse, setIsGoodResponse] = useState<boolean>(false);

    // Check nickname API
    const { mutate: checkMutatie, isLoading: isCheckLoading } = useMutation(checkNicknameAPI, {
        onSuccess: () => {
            setIsGoodResponse(true);
            changeValidationResult('사용 가능한 닉네임입니다');
        },
        onError: ({ response }) => {
            if (response.data.state === 409) {
                setIsGoodResponse(false);
                changeValidationResult('중복된 닉네임입니다');
            }
            // For Debug
            console.log('(ERROR) Check nickname API.', response);
        },
    });

    // Edit nickname API
    const { mutate: editMutate, isLoading: isEditLoading } = useMutation(editNicknameAPI, {
        onSuccess: () => {
            moveToMyPageScreen();
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

    // Validator custom hook input text
    const onChangeNicknameText = (text: string) => {
        onChangeText(text);
        setIsGoodResponse(false);
        if (text.length < 2) {
            changeValidationResult('2글자 이상 입력해주세요');
        } else {
            changeValidationResult('');
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
    const resetText = () => {
        onChangeText('');
        changeValidationResult('2글자 이상 입력해주세요');
        // setIsFocusText(true);
    };

    // Edit nickname call API
    const editNicknameHandler = () => {
        editMutate({
            accessToken,
            data: nickname,
        });
    };

    // Validator custom hook input text
    useLayoutEffect(() => {
        onChangeText(nicknameAtom);
    }, []);

    return (
        <>
            <HeaderMolecule
                isPaddingHorizontal={true}
                backHandler={moveToMyPageScreen}
                headerFinish={true}
                title="닉네임 수정"
                finishText="완료"
                isNextStep={false}
                isWorkDone={isGoodResponse}
                background={colors.WHITE}
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
                    <View style={editNicknameTemplateStyles.validationText}>
                        <Icons
                            type={isGoodResponse ? 'octicons' : 'fontisto'}
                            name={isGoodResponse ? 'check' : 'close'}
                            size={14}
                            color={isGoodResponse ? colors.STATUS_GREEN : colors.STATUS_RED}
                        />
                        <Spacer width={4} />
                        <MediumText
                            text={validationResult}
                            size={12}
                            color={isGoodResponse ? colors.STATUS_GREEN : colors.STATUS_RED}
                        />
                    </View>
                )}
                {(isCheckLoading || isEditLoading) && <ActivityIndicator size="large" />}
            </View>
        </>
    );
};
export default EditNicknameTemplate;
