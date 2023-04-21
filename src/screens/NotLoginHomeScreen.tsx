import React from 'react';
import { View } from 'react-native';

import { useRootNavigation } from '../navigations/RootStackNavigation';
import { notLoginHomeScreenStyles } from '../styles/styles';
import BoldText from '../components/smallest/BoldText';
import Colors from '../styles/Colors';
import TextButton from '../components/molecules/TextButton';
import Spacer from '../components/smallest/Spacer';

const NotLoginHomeScreen = () => {
    const rootNavigation = useRootNavigation();

    const onPressNavigate = (route: string) => {
        if (route === 'JoinMember') {
            rootNavigation.navigate('JoinMember');
        } else {
            rootNavigation.navigate('Login');
        }
    };

    return (
        <View style={notLoginHomeScreenStyles.container}>
            <BoldText text="가는길에 지금 어떤 일이" size={24} color={Colors.BLACK} />
            <BoldText text="일어나고 있는지 알아볼까요?" size={24} color={Colors.BLACK} />

            <Spacer height={46} />
            {/* 임시 */}
            <View style={{ backgroundColor: '#333', height: 300 }} />
            <Spacer height={69} />

            <TextButton
                text="이메일로 가입"
                onPress={() => onPressNavigate('JoinMember')}
                textColor={Colors.WHITE}
                backgroundColor={Colors.BLACK}
                fontSize={17}
                height={48}
            />
            <Spacer height={12} />
            <TextButton
                text="이메일로 로그인"
                onPress={() => onPressNavigate('Login')}
                textColor={Colors.BLACK}
                backgroundColor={Colors.WHITE}
                fontSize={17}
                height={48}
                borderColor={Colors.BLACK}
                borderWidth={1}
            />
        </View>
    );
};

export default NotLoginHomeScreen;
