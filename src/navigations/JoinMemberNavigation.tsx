import React from 'react';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';

import InputEmailScreen from '../screens/joinMember/InputEmailScreen';
import InputPasswordScreen from '../screens/joinMember/InputPasswordScreen';
import InputNicknameScreen from '../screens/joinMember/InputNicknameScreen';
import { JoinMemberParamList } from '../types/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import RequestPermissionScreen from '../screens/joinMember/RequestPermissionScreen';
import InitLikeKeywordScreen from '../screens/joinMember/InitLikeKeywordScreen';

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
