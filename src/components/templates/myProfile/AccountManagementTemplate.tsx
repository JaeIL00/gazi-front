import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from 'react-query';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import NormalText from '../../smallest/NormalText';
import TouchButton from '../../smallest/TouchButton';
import { logoutAPI } from '../../../queries/api';
import { userTokenAtom } from '../../../store/atoms';
import { AccountManagementTemplateProps } from '../../../types/types';
import { AccountManagementTemplateStyles } from '../../../styles/styles';

const AccountManagementTemplate = ({ moveToScreenHandler }: AccountManagementTemplateProps) => {
    // logout API
    const userToken = useRecoilValue(userTokenAtom);
    const { mutate, isLoading } = useMutation(logoutAPI, {
        onSuccess: () => {
            logoutHandler();
        },
        onError: error => {
            // For Debug
            console.log('(ERROR) logout API.', error);
        },
    });
    const logoutHandler = async () => {
        try {
            await AsyncStorage.multiRemove(['GAZI_ac_tk', 'GAZI_re_tk']);
            moveToScreenHandler('INIT_HOME');
        } catch (error) {
            // For Debug
            console.log('(ERROR), Logout delete token in storage.', error);
        }
    };

    return (
        <View>
            <View style={AccountManagementTemplateStyles.headerBox}>
                <TouchButton onPress={() => moveToScreenHandler('BACK')} hitSlop={20}>
                    <Image
                        source={require('../../../assets/icons/to-left-black.png')}
                        style={AccountManagementTemplateStyles.headerIcon}
                    />
                </TouchButton>
                <Spacer width={21} />
                <MediumText text="계정관리" size={18} color={Colors.BLACK} />
            </View>

            <View style={AccountManagementTemplateStyles.tabBox}>
                <TouchButton onPress={() => moveToScreenHandler('PASSWORD')}>
                    <View style={AccountManagementTemplateStyles.buttonBox}>
                        <NormalText text="비밀번호 변경" size={16} color={Colors.BLACK} />
                    </View>
                </TouchButton>
            </View>
            <View style={AccountManagementTemplateStyles.tabBox}>
                <TouchButton onPress={() => mutate(userToken)}>
                    <View style={AccountManagementTemplateStyles.buttonBox}>
                        <NormalText text="로그아웃" size={16} color={Colors.BLACK} />
                    </View>
                </TouchButton>
            </View>
            <View style={AccountManagementTemplateStyles.tabBox}>
                <TouchButton onPress={() => moveToScreenHandler('DELETE')}>
                    <View style={AccountManagementTemplateStyles.buttonBox}>
                        <NormalText text="회원 탈퇴" size={16} color={Colors.BLACK} />
                    </View>
                </TouchButton>
            </View>
            {isLoading && <ActivityIndicator size="large" />}
        </View>
    );
};
export default AccountManagementTemplate;
