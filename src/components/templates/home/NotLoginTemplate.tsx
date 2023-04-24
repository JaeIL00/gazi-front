import React from 'react';
import { View } from 'react-native';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import BoldText from '../../smallest/BoldText';
import TextButton from '../../molecules/TextButton';
import { useRootNavigation } from '../../../navigations/RootStackNavigation';
import { notLoginTemplateStyles } from '../../../styles/styles';

const NotLoginTemplate = () => {
    // Move screens
    const rootNavigation = useRootNavigation();
    const onPressNavigate = (route: string) => {
        if (route === 'JoinMember') {
            rootNavigation.navigate('JoinMember');
        } else {
            rootNavigation.navigate('Login');
        }
    };

    return (
        <View style={notLoginTemplateStyles.container}>
            <BoldText text="가는길에 지금 어떤 일이" size={24} color={Colors.BLACK} />
            <BoldText text="일어나고 있는지 알아볼까요?" size={24} color={Colors.BLACK} />

            <Spacer height={46} />
            {/* 임시 */}
            <View style={{ backgroundColor: '#333', height: 300 }} />

            <View style={notLoginTemplateStyles.buttonBox}>
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
        </View>
    );
};
export default NotLoginTemplate;
