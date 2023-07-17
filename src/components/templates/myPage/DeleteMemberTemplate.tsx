import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoAtom, userAuthAtom } from '../../../store/atoms';
import { useMutation } from 'react-query';
import FastImage from 'react-native-fast-image';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import BoldText from '../../smallest/BoldText';
import NormalText from '../../smallest/NormalText';
import TextButton from '../../molecules/TextButton';
import TouchButton from '../../smallest/TouchButton';
import { deleteMemberAPI } from '../../../queries/api';
import { DeleteMemberTemplateProps } from '../../../types/types';
import { DeleteMemberTemplateStyles } from '../../../styles/styles';

const DeleteMemberTemplate = ({ moveToScreenHandler }: DeleteMemberTemplateProps) => {
    const { nickname } = useRecoilValue(userInfoAtom);
    const [userAuth, setUserAuth] = useRecoilState(userAuthAtom);

    // Delete member API Handling
    const { mutate, isLoading } = useMutation(deleteMemberAPI, {
        onSuccess: () => {
            setUserAuth({ ...userAuth, isLogIn: false });
            moveToScreenHandler('HOME');
        },
        onError: error => {
            // For Debug
            console.log('(ERROR) Delete member API Handling.', error);
        },
    });
    const onPressDeleteMember = () => {
        mutate(userAuth.accessToken);
    };

    return (
        <View style={DeleteMemberTemplateStyles.container}>
            <View style={DeleteMemberTemplateStyles.headerBox}>
                <TouchButton onPress={() => moveToScreenHandler('BACK')} alignSelf="flex-start" hitSlop={10}>
                    <FastImage
                        source={require('../../../assets/icons/to-left-black.png')}
                        style={DeleteMemberTemplateStyles.headerIcon}
                    />
                </TouchButton>
            </View>

            <View>
                <BoldText text={`${nickname}님`} size={24} color={Colors.BLACK} />
                <BoldText text="정말 탈퇴하시겠어요?" size={24} color={Colors.BLACK} />
            </View>

            <View style={DeleteMemberTemplateStyles.explainBox}>
                <NormalText text="탈퇴 시 계정의 모든 정보는 삭제되고" size={16} color="#49454F" />
                <NormalText text="재가입 시에도 복구하기 어려워요." size={16} color="#49454F" />
            </View>

            <View style={DeleteMemberTemplateStyles.bottomBox}>
                <TouchButton onPress={onPressDeleteMember} paddingHorizontal={17}>
                    <View style={DeleteMemberTemplateStyles.borderLine}>
                        <BoldText text="탈퇴할래요" size={13} color={Colors.TXT_GRAY} />
                    </View>
                </TouchButton>
                <TextButton
                    onPress={() => moveToScreenHandler('BACK')}
                    text="취소"
                    fontSize={17}
                    textColor={Colors.WHITE}
                    backgroundColor={Colors.BLACK}
                    paddingHorizontal={98}
                    paddingVertical={11}
                    alignSelf="stretch"
                />
            </View>
            {isLoading && <ActivityIndicator size="large" />}
        </View>
    );
};
export default DeleteMemberTemplate;
