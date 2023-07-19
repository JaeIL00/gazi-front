import React from 'react';
import { RouteProp, createNavigationContainerRef, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRecoilValue } from 'recoil';
import SplashScreen from 'react-native-splash-screen';

import WritePostScreen from '../components/pages/WritePostScreen';
import JoinMemberNavigation from './JoinMemberNavigation';
import LoginScreen from '../components/pages/login/EmailLoginScreen';
import PoliciesScreen from '../components/pages/myPage/PoliciesScreen';
import WriteCommentScreen from '../components/pages/WriteCommentScreen';
import ServiceMainTabNavigation from './ServiceMainTabNavigation';
import ImageViewScreen from '../components/pages/community/ImageViewScreen';
import NotLoginHomeScreen from '../components/pages/home/NotLoginHomeScreen';
import ThreadItemScreen from '../components/pages/community/ThreadItemScreen';
import EditNicknameScreen from '../components/pages/myPage/EditNicknameScreen';
import DeleteMemberScreen from '../components/pages/myPage/DeleteMemberScreen';
import MyPostCommentScreen from '../components/pages/myPage/MyPostCommentScreen';
import ChangePasswordScreen from '../components/pages/myPage/ChangePasswordScreen';
import AccountManagementScreen from '../components/pages/myPage/AccountManagementScreen';
import LikeKeywordSettingScreen from '../components/pages/myPage/LikeKeywordSettingScreen';
import { userAuthAtom } from '../recoil';
import { RootStackParamList } from '../types/common/types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const RootStackNavigation = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const { isLogIn } = useRecoilValue(userAuthAtom);

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
