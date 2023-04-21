import React from 'react';
import { Text, View } from 'react-native';

import TouchButton from '../components/smallest/TouchButton';
import { useRootNavigation } from '../navigations/RootStackNavigation';
import { NotLoginRouteName } from '../types/types';
import { notLoginHomeScreenStyles } from '../styles/styles';

const NotLoginHomeScreen = () => {
    const rootNavigation = useRootNavigation();

    const onPressNavigate = (route: NotLoginRouteName) => {
        rootNavigation.navigate(route);
    };

    return (
        <View style={notLoginHomeScreenStyles.container}>
            <TouchButton onPress={() => onPressNavigate('JoinMember')}>
                <Text>회원가입</Text>
            </TouchButton>
        </View>
    );
};

export default NotLoginHomeScreen;
