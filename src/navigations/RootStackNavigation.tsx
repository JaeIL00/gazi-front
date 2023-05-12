import React, { useLayoutEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '../screens/EmailLoginScreen';
import BottomTabNavigation from './BottomTabNavigation';
import WritePostScreen from '../screens/WritePostScreen';
import JoinMemberScreen from '../screens/JoinMemberScreen';
import NotLoginHomeScreen from '../screens/NotLoginHomeScreen';
import InitLikeKeywordScreen from '../screens/InitLikeKeywordScreen';
import ThreadItemScreen from '../screens/cummunity/ThreadItemScreen';
import RequestPermissionScreen from '../screens/RequestPermissionScreen';
import EditNicknameScreen from '../screens/myProfile/EditNicknameScreen';
import { autoLoginAPI } from '../queries/api';
import { RootStackParamList } from '../types/types';
import { userInfoAtom, userTokenAtom } from '../store/atoms';

export const RootStackNavigation = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const rootNavigation = useRootNavigation();

    // Check storage and token valication for auto login
    const [userToken, setUserToken] = useRecoilState(userTokenAtom);
    const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
    const { mutate, isLoading } = useMutation(autoLoginAPI, {
        onSuccess: ({ data }) => {
            successTokenHandler(data.data);
        },
        onError: ({ response }) => {
            errorLoginHandler(response.status);
            // For Debug
            console.log('(ERROR) auto login API.', response);
        },
    });
    const errorLoginHandler = async (status: number) => {
        if (status === 400 || status === 404) {
            await AsyncStorage.multiRemove(['GAZI_ac_tk', 'GAZI_re_tk']);
            rootNavigation.navigate('NotLoginHome');
        }
    };
    const successTokenHandler = async (data: {
        accessToken: string;
        refreshToken: string;
        memberId: number;
        nickName: string;
    }) => {
        try {
            await AsyncStorage.setItem('GAZI_ac_tk', data.accessToken);
            await AsyncStorage.setItem('GAZI_re_tk', data.refreshToken);
            setUserToken({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            });
            setUserInfo({
                memberId: data.memberId,
                nickname: data.nickName,
            });
            rootNavigation.navigate('BottomTab');
        } catch (error) {
            // For Debug
            console.log('(ERROR) User authorization token set storage.', error);
        }
    };
    const checkAsyncStorage = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('GAZI_ac_tk');
            const refreshToken = await AsyncStorage.getItem('GAZI_re_tk');
            if (accessToken && refreshToken) {
                mutate({
                    accessToken,
                    refreshToken,
                });
            }
        } catch (error) {
            // For Debug
            console.log('(ERROR) Check async storage for auto login ', error);
        }
    };
    useLayoutEffect(() => {
        checkAsyncStorage();
    }, []);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                presentation: 'containedModal',
            }}
            // initialRouteName="NotLoginHome"
        >
            <Stack.Screen name="NotLoginHome" component={NotLoginHomeScreen} />
            <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
            <Stack.Screen name="WritePost" component={WritePostScreen} />
            <Stack.Screen name="ThreadItem" component={ThreadItemScreen} />
            <Stack.Screen name="EditNickname" component={EditNicknameScreen} />
            <Stack.Screen name="RequestPermission" component={RequestPermissionScreen} />
            <Stack.Screen name="InitKeyword" component={InitLikeKeywordScreen} />
            <Stack.Screen name="JoinMember" component={JoinMemberScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
};

export const useRootNavigation = <RouteName extends keyof RootStackParamList>() => {
    return useNavigation<NativeStackNavigationProp<RootStackParamList, RouteName>>();
};

export const useRootRoute = <RouteName extends keyof RootStackParamList>() => {
    return useRoute<RouteProp<RootStackParamList, RouteName>>();
};
