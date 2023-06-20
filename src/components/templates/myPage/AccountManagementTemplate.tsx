import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from 'react-query';
import FastImage from 'react-native-fast-image';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import NormalText from '../../smallest/NormalText';
import TouchButton from '../../smallest/TouchButton';
import { logoutAPI } from '../../../queries/api';
import { userAuthAtom } from '../../../store/atoms';
import { AccountManagementTemplateProps } from '../../../types/types';
import { AccountManagementTemplateStyles } from '../../../styles/styles';

const AccountManagementTemplate = ({ moveToScreenHandler }: AccountManagementTemplateProps) => {
    const [userAuth, setUserAuth] = useRecoilState(userAuthAtom);

    // logout API
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
            setUserAuth({
                ...userAuth,
                isLogIn: false,
            });
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
                    <FastImage
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
                <TouchButton
                    onPress={() =>
                        mutate({
                            accessToken: userAuth.accessToken,
                            refreshToken: userAuth.refreshToken,
                        })
                    }>
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
