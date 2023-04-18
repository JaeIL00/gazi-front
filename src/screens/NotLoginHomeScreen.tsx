import React from 'react';
import { View } from 'react-native';
import TouchButton from '../components/smallest/TouchButton';
import { useRootNavigation } from '../navigations/RootStackNavigation';
import { NotLoginRouteName } from '../types/types';

const NotLoginHomeScreen = () => {
    const rootNavigation = useRootNavigation();

    const onPressNavigate = (route: NotLoginRouteName) => {
        rootNavigation.navigate(route);
    };
    return (
        <View>
            <TouchButton
                title="이메일로 가입하기"
                onPress={() => onPressNavigate('JoinMember')}
            />
        </View>
    );
};

export default NotLoginHomeScreen;
