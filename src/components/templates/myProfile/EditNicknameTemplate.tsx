import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';

import HeaderMolecule from '../../molecules/HeaderMolecule';
import { EditNicknameTemplateProps } from '../../../types/types';
import { SingleLineInput } from '../../smallest/SingleLineInput';
import useTextInputValidation from '../../../utils/hooks/useTextInputValidation';
import MediumText from '../../smallest/MediumText';
import Colors from '../../../styles/Colors';
import { screenFont, screenHeight, screenWidth } from '../../../utils/changeStyleSize';
import Icons from '../../smallest/Icons';
import TouchButton from '../../smallest/TouchButton';
import { editNicknameTemplateStyles } from '../../../styles/styles';

const EditNicknameTemplate = ({ moveToMyProfileScreen }: EditNicknameTemplateProps) => {
    // const [nickname, setNickname] = useState('유저현닉네임');
    //
    const { text: nickname, onChangeText, validationResult, changValidationResult } = useTextInputValidation();
    useLayoutEffect(() => {
        onChangeText('유저 현재 닉네임');
    }, []);

    const onChangeNicknameText = (text: string) => {
        onChangeText(text);
        setIsFocusText(false);
    };
    useLayoutEffect(() => {
        if (nickname.length < 2) {
            changValidationResult('2글자 이상 입력해주세요');
        } else {
            changValidationResult('');
        }
    }, [nickname]);

    const [isFocusText, setIsFocusText] = useState(true);
    const resetText = () => {
        onChangeText('');
        setIsFocusText(true);
    };
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
                />
                <TouchButton onPress={resetText}>
                    <Icons type="ionicons" name="close-circle" size={19.5} color="#00000075" />
                </TouchButton>
            </View>
            <MediumText text={validationResult} size={12} color={Colors.STATUS_RED} />
        </>
    );
};
export default EditNicknameTemplate;
