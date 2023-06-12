import React, { useCallback } from 'react';

import Colors from '../styles/Colors';
import InputEmailScreen from '../screens/joinMember/InputEmailScreen';
import MoveBackWithPageTitle from '../components/organisms/MoveBackWithPageTitle';
import { JoinMemberParamList } from '../types/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const JoinMemberNavigation = () => {
    const Stack = createNativeStackNavigator<JoinMemberParamList>();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="JoinInputEmail">
            <Stack.Screen name="JoinInputEmail" component={InputEmailScreen} />
        </Stack.Navigator>
    );
};

export default JoinMemberNavigation;
