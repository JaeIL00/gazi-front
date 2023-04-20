import React from 'react';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import JoinMemberScreen from '../screens/JoinMemberScreen';
import NotLoginHomeScreen from '../screens/NotLoginHomeScreen';
import { RootStackParamList } from '../types/types';
import { useNavigation } from '@react-navigation/native';
import InitPermissionScreen from '../screens/InitPermissionScreen';

export const RootStackNavigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                presentation: 'containedModal',
            }}>
            <Stack.Screen name="InitPermission" component={InitPermissionScreen} />
            <Stack.Screen name="NotLoginHome" component={NotLoginHomeScreen} />
            <Stack.Screen name="JoinMember" component={JoinMemberScreen} />
        </Stack.Navigator>
    );
};

export const useRootNavigation = <RouteName extends keyof RootStackParamList>() => {
    return useNavigation<NativeStackNavigationProp<RootStackParamList, RouteName>>();
};
