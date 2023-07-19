import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { useSetRecoilState } from 'recoil';

import colors from '../../common/constants/colors';
import BoldText from '../atoms/BoldText';
import TextButton from '../molecules/TextButton';
import { joinMemberAtom } from '../../recoil';
import { CompletedJoinMemberModalProps } from '../../types/types';
import { completedJoinTemplateStyles } from '../../styles/templates/styles';

const CompletedJoinMemberModal = ({ navigationHandler, inputNickname }: CompletedJoinMemberModalProps) => {
    const setJoinMemberInfo = useSetRecoilState(joinMemberAtom);
    useEffect(() => {
        setJoinMemberInfo({
            email: '',
            password: '',
            nickName: '',
        });
    }, []);

    return (
        <View style={completedJoinTemplateStyles.container}>
            <View style={completedJoinTemplateStyles.titleBox}>
                <BoldText text={`${inputNickname}님의`} size={24} color={colors.BLACK} />
                <BoldText text="회원가입을 축하드립니다!" size={24} color={colors.BLACK} />
            </View>

            <View style={completedJoinTemplateStyles.imageBox}>
                <Image
                    source={require('../../assets/join-member-complete-image.png')}
                    style={completedJoinTemplateStyles.imageSize}
                />
            </View>

            <View style={completedJoinTemplateStyles.button}>
                <TextButton
                    onPress={() => navigationHandler('GO')}
                    text="확인"
                    height={48}
                    backgroundColor={colors.BLACK}
                    textColor={colors.WHITE}
                    fontSize={17}
                />
            </View>
        </View>
    );
};
export default CompletedJoinMemberModal;
