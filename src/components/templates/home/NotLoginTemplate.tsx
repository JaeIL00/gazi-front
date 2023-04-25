import React, { useEffect, useState } from 'react';
import { ToastAndroid, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import BoldText from '../../smallest/BoldText';
import TextButton from '../../molecules/TextButton';
import { useRootNavigation } from '../../../navigations/RootStackNavigation';
import { notLoginTemplateStyles } from '../../../styles/styles';
import { useMutation } from 'react-query';
import { deleteMemberAPI } from '../../../queries/api';

const NotLoginTemplate = () => {
    // Move screens
    const rootNavigation = useRootNavigation();
    const onPressNavigate = (route: string) => {
        if (route === 'JoinMember') {
            rootNavigation.navigate('JoinMember');
        } else {
            rootNavigation.navigate('Login');
        }
    };

    // For Debug
    // Delete member API (temporary)
    const [st, setst] = useState('');
    const getStorage = async () => {
        try {
            const is = await AsyncStorage.getItem('GAZI_ac_tk');
            is !== null ? setst(is) : null;
        } catch {
            // For Debug
            ToastAndroid.show('토큰 불러오기 실패', 4000);
        }
    };
    useEffect(() => {
        getStorage();
    }, []);
    const { mutate } = useMutation(deleteMemberAPI, {
        onSuccess: () => {
            ToastAndroid.show('회원 탈퇴 성공', 4000);
        },
        onError: () => {
            ToastAndroid.show('회원 탈퇴 실패', 4000);
        },
    });

    return (
        <View style={notLoginTemplateStyles.container}>
            <BoldText text="가는길에 지금 어떤 일이" size={24} color={Colors.BLACK} />
            <BoldText text="일어나고 있는지 알아볼까요?" size={24} color={Colors.BLACK} />

            <Spacer height={46} />
            {/* 임시 */}
            <View style={{ backgroundColor: '#333', height: 300 }} />

            <View style={notLoginTemplateStyles.buttonBox}>
                <TextButton
                    text="이메일로 가입"
                    onPress={() => onPressNavigate('JoinMember')}
                    textColor={Colors.WHITE}
                    backgroundColor={Colors.BLACK}
                    fontSize={17}
                    height={48}
                />
                <Spacer height={12} />
                <TextButton
                    text="이메일로 로그인"
                    onPress={() => onPressNavigate('Login')}
                    textColor={Colors.BLACK}
                    backgroundColor={Colors.WHITE}
                    fontSize={17}
                    height={48}
                    borderColor={Colors.BLACK}
                    borderWidth={1}
                />
                <Spacer height={12} />
                {/* For Debug */}
                <TextButton
                    text="(임시)회원 탈퇴"
                    onPress={() => mutate(st)}
                    textColor={Colors.BLACK}
                    backgroundColor={Colors.WHITE}
                    fontSize={17}
                    height={48}
                    borderColor={Colors.BLACK}
                    borderWidth={1}
                />
            </View>
        </View>
    );
};
export default NotLoginTemplate;
