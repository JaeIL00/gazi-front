import React from 'react';
import { Text, View } from 'react-native';
import { useRecoilState } from 'recoil';

import { SingleLineInput } from '../../smallest/SingleLineInput';
import { joinMemberData } from '../../../store/atoms';
import { NicknameTemplateProps } from '../../../types/types';
import TouchButton from '../../smallest/TouchButton';

const NicknameTemplate = ({ onPressNextStep }: NicknameTemplateProps) => {
    const [joinData, setJoinData] = useRecoilState(joinMemberData);

    const onChangeNickname = (text: string) => {
        setJoinData({
            ...joinData,
            nickname: text,
        });
    };

    const canMoveNextStepHandler = () => {
        // duplicate check
        onPressNextStep();
    };

    return (
        <View>
            <SingleLineInput
                value={joinData.nickname}
                onChangeText={onChangeNickname}
                maxLength={12}
                placeholder="닉네임을 입력해주세요."
            />
            <Text>{joinData.nickname.length}/12자</Text>
            <TouchButton title="다음" onPress={canMoveNextStepHandler} />
        </View>
    );
};

export default NicknameTemplate;
