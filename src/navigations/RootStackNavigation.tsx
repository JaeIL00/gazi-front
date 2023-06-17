import React, { useLayoutEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

import LoginScreen from '../screens/login/EmailLoginScreen';
import BottomTabNavigation from './BottomTabNavigation';
import WritePostScreen from '../screens/WritePostScreen';
import JoinMemberNavigation from './JoinMemberNavigation';
import WriteCommentScreen from '../screens/WriteCommentScreen';
import NotLoginHomeScreen from '../screens/home/NotLoginHomeScreen';
import PoliciesScreen from '../screens/myProfile/PoliciesScreen';
import ImageViewScreen from '../screens/community/ImageViewScreen';
import ThreadItemScreen from '../screens/community/ThreadItemScreen';
import DeleteMemberScreen from '../screens/myProfile/DeleteMemberScreen';
import EditNicknameScreen from '../screens/myProfile/EditNicknameScreen';
import MyPostCommentScreen from '../screens/myProfile/MyPostCommentScreen';
import ChangePasswordScreen from '../screens/myProfile/ChangePasswordScreen';
import AccountManagementScreen from '../screens/myProfile/AccountManagementScreen';
import LikeKeywordSettingScreen from '../screens/myProfile/LikeKeywordSettingScreen';
import { autoLoginAPI } from '../queries/api';
import { RootStackParamList } from '../types/types';
import { userInfoAtom, userAuthAtom } from '../store/atoms';
import initEssentialFunc from '../utils/initEssentialFunc';

export const RootStackNavigation = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const { isLogIn } = useRecoilValue(userAuthAtom);
    const { checkAsyncStorage, isAllowLocationPermission } = initEssentialFunc();

    useLayoutEffect(() => {
        checkAsyncStorage();
        isAllowLocationPermission();
        // SplashScreen.hide();
    }, []);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLogIn ? (
                <>
                    <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
                    <Stack.Screen name="WritePost" component={WritePostScreen} />
                    <Stack.Screen name="WriteComment" component={WriteCommentScreen} />
                    <Stack.Screen name="Policies" component={PoliciesScreen} />
                    <Stack.Screen name="LikeKeywordSetting" component={LikeKeywordSettingScreen} />
                    <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
                    <Stack.Screen name="AccountManagement" component={AccountManagementScreen} />
                    <Stack.Screen name="DeleteMember" component={DeleteMemberScreen} />
                    <Stack.Screen name="MyPostComment" component={MyPostCommentScreen} />
                    <Stack.Screen name="ThreadItem" component={ThreadItemScreen} />
                    <Stack.Screen name="EditNickname" component={EditNicknameScreen} />
                    <Stack.Screen name="ImageView" component={ImageViewScreen} />
                </>
            ) : (
                <>
                    <Stack.Group>
                        <Stack.Screen name="NotLoginHome" component={NotLoginHomeScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="JoinMember" component={JoinMemberNavigation} />
                    </Stack.Group>
                </>
            )}
        </Stack.Navigator>
    );
};

export const useRootNavigation = <RouteName extends keyof RootStackParamList>() => {
    return useNavigation<NativeStackNavigationProp<RootStackParamList, RouteName>>();
};

export const useRootRoute = <RouteName extends keyof RootStackParamList>() => {
    return useRoute<RouteProp<RootStackParamList, RouteName>>();
};
