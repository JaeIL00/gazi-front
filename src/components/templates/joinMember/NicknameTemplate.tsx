import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRecoilState } from 'recoil';

import { SingleLineInput } from '../../smallest/SingleLineInput';
import { joinMemberData } from '../../../store/atoms';
import { NicknameTemplateProps } from '../../../types/types';
import TextButton from '../../molecules/TextButton';
import Colors from '../../../styles/Colors';
import { NicknameTemplateStyles } from '../../../styles/styles';
import Space from '../../smallest/Space';

const NicknameTemplate = ({ onPressNextStep }: NicknameTemplateProps) => {
    const [joinData, setJoinData] = useRecoilState(joinMemberData);

    const onChangeNickname = (text: string) => {
        setJoinData({ ...joinData, nickname: text });
    };

    // Button Style Handling
    const [buttonColor, setButtonColor] = useState(Colors.BTN_GRAY);
    const buttonStyleHandler = () => {
        setButtonColor(Colors.BLACK);
    };
    useEffect(() => {
        buttonStyleHandler();
    }, []);

    // check duplicate Handling
    const onPressCheckDuplicate = () => {};

    // Move Next Step
    const canMoveNextStepHandler = () => {
        onPressNextStep();
    };

    return (
        <View style={NicknameTemplateStyles.container}>
            <Space height={40} />
            <View style={NicknameTemplateStyles.inputBox}>
                <SingleLineInput
                    value={joinData.nickname}
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
            <View style={NicknameTemplateStyles.buttonBox}>
                <TextButton
                    text="확인"
                    textColor={Colors.WHITE}
                    backgroundColor={buttonColor}
                    onPress={canMoveNextStepHandler}
                    height={48}
                    fontSize={17}
                />
            </View>
        </View>
    );
};

export default NicknameTemplate;
