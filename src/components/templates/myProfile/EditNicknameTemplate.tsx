import React, { useCallback, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { debounce } from 'lodash';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';

import Icons from '../../smallest/Icons';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import TouchButton from '../../smallest/TouchButton';
import HeaderMolecule from '../../molecules/HeaderMolecule';
import useTextInputValidation from '../../../utils/hooks/useTextInputValidation';
import { userTokenAtom } from '../../../store/atoms';
import { editNicknameAPI } from '../../../queries/api';
import { SingleLineInput } from '../../smallest/SingleLineInput';
import { EditNicknameTemplateProps } from '../../../types/types';
import { editNicknameTemplateStyles } from '../../../styles/styles';

const EditNicknameTemplate = ({ moveToMyProfileScreen }: EditNicknameTemplateProps) => {
    // Validator custom hook input text
    const { text: nickname, onChangeText, validationResult, changValidationResult } = useTextInputValidation();
    useLayoutEffect(() => {
        onChangeText('유저 현재 닉네임');
    }, []);
    const onChangeNicknameText = (text: string) => {
        onChangeText(text);
        setIsFocusText(false);
        if (text.length < 2) {
            changValidationResult('2글자 이상 입력해주세요');
        } else {
            changValidationResult('');
            editNicknameHandler(text);
        }
    };

    // Input focus
    const [isFocusText, setIsFocusText] = useState(true);
    const resetText = () => {
        onChangeText('');
        setIsFocusText(true);
    };

    // Edit nickname API
    const { accessToken } = useRecoilValue(userTokenAtom);
    const { mutate, isLoading } = useMutation(editNicknameAPI, {
        onSuccess: ({ data }) => {
            console.log(data);
            moveToMyProfileScreen('CLOSE');
        },
        onError: error => {
            // For Debug
            console.log('(ERROR) Edit nickname API.', error);
        },
    });
    const editNicknameHandler = useCallback(
        debounce((text: string) => {
            mutate({
                accessToken,
                data: text,
            });
        }, 1000),
        [],
    );

    return (
        <>
            <View style={editNicknameTemplateStyles.headerBox}>
                <HeaderMolecule
                    isPaddingHorizontal={false}
                    backHandler={moveToMyProfileScreen}
                    headerFinish={true}
                    title="닉네임 수정"
                    finishText="완료"
                    isNextStep={false}
                />
            </View>
            <View style={editNicknameTemplateStyles.inputBox}>
                <SingleLineInput
                    value={nickname}
                    onChangeText={text => onChangeNicknameText(text)}
                    isFocus={isFocusText}
                    width={260}
                    maxLength={7}
                />
                <TouchButton onPress={resetText}>
                    <Icons type="ionicons" name="close-circle" size={19.5} color="#00000075" />
                </TouchButton>
            </View>
            <MediumText text={validationResult} size={12} color={Colors.STATUS_RED} />
            {isLoading && <ActivityIndicator size="large" />}
        </>
    );
};
export default EditNicknameTemplate;
