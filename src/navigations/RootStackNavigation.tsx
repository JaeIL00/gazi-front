import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/EmailLoginScreen';
import JoinMemberScreen from '../screens/JoinMemberScreen';
import SeviceHomeScreen from '../screens/SeviceHomeScreen';
import NotLoginHomeScreen from '../screens/NotLoginHomeScreen';
import InitLikeKeywordScreen from '../screens/InitLikeKeywordScreen';
import RequestPermissionScreen from '../screens/RequestPermissionScreen';
import { RootStackParamList } from '../types/types';

export const RootStackNavigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                presentation: 'containedModal',
            }}>
            <Stack.Screen name="NotLoginHome" component={NotLoginHomeScreen} />
            <Stack.Screen name="JoinMember" component={JoinMemberScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="RequestPermission" component={RequestPermissionScreen} />
            <Stack.Screen name="InitKeyword" component={InitLikeKeywordScreen} />
            <Stack.Screen name="ServiceHome" component={SeviceHomeScreen} />
        </Stack.Navigator>
    );
};

export const useRootNavigation = <RouteName extends keyof RootStackParamList>() => {
    return useNavigation<NativeStackNavigationProp<RootStackParamList, RouteName>>();
};
