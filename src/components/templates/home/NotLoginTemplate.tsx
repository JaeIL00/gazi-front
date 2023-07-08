import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { KakaoOAuthToken, KakaoProfile, getProfile, login } from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NaverLogin from '@react-native-seoul/naver-login';
import Config from 'react-native-config';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import BoldText from '../../smallest/BoldText';
import TextButton from '../../molecules/TextButton';
import { notLoginTemplateStyles } from '../../../styles/styles';
import { useRootNavigation } from '../../../navigations/RootStackNavigation';

const NotLoginTemplate = () => {
    const NAVER_CLIENT_ID = Config.NAVER_CLIENT_ID as string;
    const NAVER_CLIENT_SECRET = Config.NAVER_CLIENT_SECRET as string;

    // Move screens handling
    const rootNavigation = useRootNavigation();
    const onPressNavigate = (route: string) => {
        if (route === 'JoinMember') {
            rootNavigation.navigate('JoinMember');
        } else {
            rootNavigation.navigate('Login');
        }
    };

    const kakaologinHandler = async () => {
        try {
            const token: KakaoOAuthToken = await login();
            console.log(JSON.stringify(token));
            // await loginSetStorage(token.accessToken, token.refreshToken, 'kakao');
            await getKakaoProfile();
        } catch (error) {
            // For Debug
            console.log('(ERROR) Kakao login.', error);
        }
    };
    const getKakaoProfile = async () => {
        try {
            const profile: KakaoProfile = await getProfile();
            console.log(JSON.stringify(profile));
            // 로그인 API
        } catch (error) {
            // For Debug
            console.log('(ERROR) Get kakao profile.', error);
        }
    };

    const naverLoginHandler = async () => {
        await NaverLogin.login({
            appName: 'gazinow',
            consumerKey: NAVER_CLIENT_ID,
            consumerSecret: NAVER_CLIENT_SECRET,
            serviceUrlScheme: 'gazinow',
        })
            .then(response => {
                console.log('login', response);
                getNaverProfile(response.successResponse?.accessToken!);
            })
            .catch(error => {
                console.log('error', error);
            });
    };
    const getNaverProfile = async (accessToken: string) => {
        await NaverLogin.getProfile(accessToken).then(response => {
            console.log('profile', response);
        });
    };

    // const loginSetStorage = async (accessToken: string, refreshToken: string, provider: string) => {
    //     try {
    //         await AsyncStorage.setItem('access_token', accessToken);
    //         await AsyncStorage.setItem('refresh_token', refreshToken);
    //         await AsyncStorage.setItem('provider', provider);
    //     } catch (error) {
    //         // For Debug
    //         console.log('(ERROR) Save token in storage by login.', error);
    //     }
    // };

    return (
        <View style={notLoginTemplateStyles.container}>
            <View>
                <BoldText text="가는길에 지금 어떤 일이" size={24} color={Colors.BLACK} />
                <BoldText text="일어나고 있는지 알아볼까요?" size={24} color={Colors.BLACK} />
            </View>

            <View style={notLoginTemplateStyles.imageBox}>
                <FastImage
                    source={require('../../../assets/not-login-image.png')}
                    style={notLoginTemplateStyles.imageSize}
                />
            </View>

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
                <TextButton
                    text="카카오 로그인"
                    onPress={kakaologinHandler}
                    textColor={Colors.BLACK}
                    backgroundColor={Colors.WHITE}
                    fontSize={17}
                    height={48}
                    borderColor={Colors.BLACK}
                    borderWidth={1}
                />
                <Spacer height={12} />
                <TextButton
                    text="네이버 로그인"
                    onPress={naverLoginHandler}
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
