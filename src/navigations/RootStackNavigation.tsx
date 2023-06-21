import React, { useLayoutEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRecoilValue } from 'recoil';
import SplashScreen from 'react-native-splash-screen';

import WritePostScreen from '../screens/WritePostScreen';
import JoinMemberNavigation from './JoinMemberNavigation';
import initEssentialFunc from '../utils/initEssentialFunc';
import LoginScreen from '../screens/login/EmailLoginScreen';
import PoliciesScreen from '../screens/myPage/PoliciesScreen';
import WriteCommentScreen from '../screens/WriteCommentScreen';
import ServiceMainTabNavigation from './ServiceMainTabNavigation';
import ImageViewScreen from '../screens/community/ImageViewScreen';
import NotLoginHomeScreen from '../screens/home/NotLoginHomeScreen';
import ThreadItemScreen from '../screens/community/ThreadItemScreen';
import EditNicknameScreen from '../screens/myPage/EditNicknameScreen';
import DeleteMemberScreen from '../screens/myPage/DeleteMemberScreen';
import MyPostCommentScreen from '../screens/myPage/MyPostCommentScreen';
import ChangePasswordScreen from '../screens/myPage/ChangePasswordScreen';
import AccountManagementScreen from '../screens/myPage/AccountManagementScreen';
import LikeKeywordSettingScreen from '../screens/myPage/LikeKeywordSettingScreen';
import { userAuthAtom } from '../store/atoms';
import { RootStackParamList } from '../types/types';

export const RootStackNavigation = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const { isLogIn } = useRecoilValue(userAuthAtom);
    const { checkAsyncStorage, isAllowLocationPermission } = initEssentialFunc();

    useLayoutEffect(() => {
        // checkAsyncStorage();
        isAllowLocationPermission();
        SplashScreen.hide();
    }, []);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLogIn ? (
                <>
                    <Stack.Screen name="ServiceMainTab" component={ServiceMainTabNavigation} />
                    <Stack.Screen name="WritePost" component={WritePostScreen} />
                    <Stack.Screen name="WriteComment" component={WriteCommentScreen} />
                    <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
                    <Stack.Screen name="ThreadItem" component={ThreadItemScreen} />
                    <Stack.Screen name="ImageView" component={ImageViewScreen} />
                    <Stack.Group>
                        <Stack.Screen name="Policies" component={PoliciesScreen} />
                        <Stack.Screen name="LikeKeywordSetting" component={LikeKeywordSettingScreen} />
                        <Stack.Screen name="AccountManagement" component={AccountManagementScreen} />
                        <Stack.Screen name="MyPostComment" component={MyPostCommentScreen} />
                        <Stack.Screen name="DeleteMember" component={DeleteMemberScreen} />
                        <Stack.Screen name="EditNickname" component={EditNicknameScreen} />
                    </Stack.Group>
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
