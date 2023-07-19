import React from 'react';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import InputEmailScreen from '../components/pages/joinMember/InputEmailScreen';
import InputPasswordScreen from '../components/pages/joinMember/InputPasswordScreen';
import InputNicknameScreen from '../components/pages/joinMember/InputNicknameScreen';
import InitLikeKeywordScreen from '../components/pages/joinMember/InitLikeKeywordScreen';
import RequestPermissionScreen from '../components/pages/joinMember/RequestPermissionScreen';
import { JoinMemberParamList } from '../types/common/types';

const JoinMemberNavigation = () => {
    const Stack = createNativeStackNavigator<JoinMemberParamList>();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="JoinInputEmail">
            <Stack.Screen name="JoinInputEmail" component={InputEmailScreen} />
            <Stack.Screen name="JoinInputPassword" component={InputPasswordScreen} />
            <Stack.Screen name="JoinInputNickname" component={InputNicknameScreen} />
            <Stack.Screen name="JoinRequestPermission" component={RequestPermissionScreen} />
            <Stack.Screen name="JoinSettingKeyword" component={InitLikeKeywordScreen} />
        </Stack.Navigator>
    );
};

export default JoinMemberNavigation;

export const useJoinNavigation = <RouteName extends keyof JoinMemberParamList>() => {
    return useNavigation<NativeStackNavigationProp<JoinMemberParamList, RouteName>>();
};

export const useJoinRoute = <RouteName extends keyof JoinMemberParamList>() => {
    return useRoute<RouteProp<JoinMemberParamList, RouteName>>();
};
