import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { useSetRecoilState } from 'recoil';

import colors from '../../../constants/colors';
import BoldText from '../../atoms/BoldText';
import TextButton from '../../molecules/TextButton';
import { joinMemberAtom } from '../../../recoil';
import { completedJoinTemplateStyles } from '../../../styles/templates/styles';
import { CompletedJoinMemberModalProps } from '../../../types/templates/types';

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
                    source={require('../../../assets/join-member-complete-image.png')}
                    style={completedJoinTemplateStyles.imageSize}
                />
            </View>

            <View style={completedJoinTemplateStyles.button}>
                <TextButton
                    onPress={() => navigationHandler('GO')}
                    text="확인"
                    height={48}
                    backgroundColor={colors.BLACK}
                    fontColor={colors.WHITE}
                    fontWeight="semiBold"
                    fontSize={17}
                    borderRadius={5}
                />
            </View>
        </View>
    );
};
export default CompletedJoinMemberModal;
