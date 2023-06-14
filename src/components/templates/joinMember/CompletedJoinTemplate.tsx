import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { useRecoilState } from 'recoil';

import Colors from '../../../styles/Colors';
import BoldText from '../../smallest/BoldText';
import TextButton from '../../molecules/TextButton';
import { joinMemberAtom } from '../../../store/atoms';
import { CompletedJoinTemplateProps } from '../../../types/types';
import { completedJoinTemplateStyles } from '../../../styles/styles';

const CompletedJoinTemplate = ({ navigationHandler, inputNickname }: CompletedJoinTemplateProps) => {
    const [joinMemberInfo, setJoinMemberInfo] = useRecoilState(joinMemberAtom);
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
                <BoldText text={`${inputNickname}님의`} size={24} color={Colors.BLACK} />
                <BoldText text="회원가입을 축하드립니다!" size={24} color={Colors.BLACK} />
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
                    backgroundColor={Colors.BLACK}
                    textColor={Colors.WHITE}
                    fontSize={17}
                />
            </View>
        </View>
    );
};
export default CompletedJoinTemplate;
