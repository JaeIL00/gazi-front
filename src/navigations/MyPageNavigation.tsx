import React from 'react';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import MyPageScreen from '../screens/myPage/MyPageScreen';
import PoliciesScreen from '../screens/myPage/PoliciesScreen';
import EditNicknameScreen from '../screens/myPage/EditNicknameScreen';
import DeleteMemberScreen from '../screens/myPage/DeleteMemberScreen';
import MyPostCommentScreen from '../screens/myPage/MyPostCommentScreen';
import AccountManagementScreen from '../screens/myPage/AccountManagementScreen';
import LikeKeywordSettingScreen from '../screens/myPage/LikeKeywordSettingScreen';
import { MyPageParamList } from '../types/types';

const MyPageNavigation = () => {
    const Stack = createNativeStackNavigator<MyPageParamList>();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="MyPageInitial">
            <Stack.Screen name="MyPageInitial" component={MyPageScreen} />
            <Stack.Screen name="Policies" component={PoliciesScreen} />
            <Stack.Screen name="LikeKeywordSetting" component={LikeKeywordSettingScreen} />
            <Stack.Screen name="AccountManagement" component={AccountManagementScreen} />
            <Stack.Screen name="MyPostComment" component={MyPostCommentScreen} />
            <Stack.Screen name="DeleteMember" component={DeleteMemberScreen} />
            <Stack.Screen name="EditNickname" component={EditNicknameScreen} />
        </Stack.Navigator>
    );
};

export default MyPageNavigation;

export const useMyPageNavigation = <RouteName extends keyof MyPageParamList>() => {
    return useNavigation<NativeStackNavigationProp<MyPageParamList, RouteName>>();
};

export const useMyPageRoute = <RouteName extends keyof MyPageParamList>() => {
    return useRoute<RouteProp<MyPageParamList, RouteName>>();
};
