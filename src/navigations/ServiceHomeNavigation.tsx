import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';

import MapHomeScreen from '../screens/MapHomeScreen';
import WritePostOrCommentScreen from '../screens/cummunity/WritePostOrCommentScreen';
import { ServiceHomeParamList } from '../types/types';

const ServiceHomeNavigation = () => {
    const Stack = createNativeStackNavigator<ServiceHomeParamList>();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MapHome">
            <Stack.Screen name="MapHome" component={MapHomeScreen} />
            <Stack.Screen name="WritePostOrComment" component={WritePostOrCommentScreen} />
        </Stack.Navigator>
    );
};

export default ServiceHomeNavigation;

export const useHomeNavigation = <RouteName extends keyof ServiceHomeParamList>() => {
    return useNavigation<NativeStackNavigationProp<ServiceHomeParamList, RouteName>>();
};

export const useHomeRoute = <RouteName extends keyof ServiceHomeParamList>() => {
    return useRoute<RouteProp<ServiceHomeParamList, RouteName>>();
};
