import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from 'react-query';
import FastImage from 'react-native-fast-image';

import Spacer from '../../atoms/Spacer';
import colors from '../../../constants/colors';
import MediumText from '../../atoms/MediumText';
import NormalText from '../../atoms/NormalText';
import TouchButton from '../../atoms/TouchButton';
import { logoutAPI } from '../../../apis/api';
import { userAuthAtom } from '../../../recoil';
import { AccountManagementTemplateStyles } from '../../../styles/templates/styles';
import { AccountManagementTemplateProps } from '../../../types/templates/types';
import TextButton from '../../molecules/TextButton';
import ImageButton from '../../molecules/ImageButton';

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
            await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
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
                <ImageButton
                    onPress={() => moveToScreenHandler('BACK')}
                    hitSlop={20}
                    imageSource={require('../../../assets/icons/to-left-black.png')}
                    imageWidth={9}
                    imageHeight={16}
                    isCaching={true}
                />
                <Spacer width={21} />
                <MediumText text="계정관리" size={18} color={colors.BLACK} />
            </View>

            <View style={AccountManagementTemplateStyles.tabBox}>
                <TextButton
                    onPress={() => moveToScreenHandler('PASSWORD')}
                    width="100%"
                    height="100%"
                    alignItems="flex-start"
                    text="비밀번호 변경"
                    fontSize={16}
                    fontColor={colors.BLACK}
                    fontWeight="normal"
                />
            </View>
            <View style={AccountManagementTemplateStyles.tabBox}>
                <TextButton
                    onPress={() =>
                        mutate({
                            accessToken: userAuth.accessToken,
                            refreshToken: userAuth.refreshToken,
                        })
                    }
                    width="100%"
                    height="100%"
                    alignItems="flex-start"
                    text="로그아웃"
                    fontSize={16}
                    fontColor={colors.BLACK}
                    fontWeight="normal"
                />
            </View>
            <View style={AccountManagementTemplateStyles.tabBox}>
                <TextButton
                    onPress={() => moveToScreenHandler('DELETE')}
                    width="100%"
                    height="100%"
                    alignItems="flex-start"
                    text="회원 탈퇴"
                    fontSize={16}
                    fontColor={colors.BLACK}
                    fontWeight="normal"
                />
            </View>
            {isLoading && <ActivityIndicator size="large" />}
        </View>
    );
};
export default AccountManagementTemplate;
