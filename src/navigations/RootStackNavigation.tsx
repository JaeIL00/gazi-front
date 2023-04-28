import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRecoilValue } from 'recoil';

import LoginScreen from '../screens/EmailLoginScreen';
import BottomTabNavigation from './BottomTabNavigation';
import JoinMemberScreen from '../screens/JoinMemberScreen';
import NotLoginHomeScreen from '../screens/NotLoginHomeScreen';
import InitLikeKeywordScreen from '../screens/InitLikeKeywordScreen';
import RequestPermissionScreen from '../screens/RequestPermissionScreen';
import { RootStackParamList } from '../types/types';
// temporary
import { userToken } from '../store/atoms';

export const RootStackNavigation = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    // temporary
    const isUser = useRecoilValue(userToken);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                presentation: 'containedModal',
            }}>
            {isUser.accessToken ? (
                <>
                    <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
                </>
            ) : (
                <>
                    <Stack.Screen name="NotLoginHome" component={NotLoginHomeScreen} />
                    <Stack.Screen name="JoinMember" component={JoinMemberScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="RequestPermission" component={RequestPermissionScreen} />
                    <Stack.Screen name="InitKeyword" component={InitLikeKeywordScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

export const useRootNavigation = <RouteName extends keyof RootStackParamList>() => {
    return useNavigation<NativeStackNavigationProp<RootStackParamList, RouteName>>();
};
